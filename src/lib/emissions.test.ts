import { calculateMonthlyEmissions, calculateTreesEquivalent, OnboardingData } from './emissions';

describe('Carbon Calculation Engine', () => {
  const baseData: OnboardingData = {
    transportMode: 'car',
    fuelType: 'petrol',
    dailyCommuteKm: 15,
    travelDaysPerWeek: 5,
    dietType: 'mixed',
    electricityKwh: 300,
    householdSize: 2,
    onlinePurchases: 5,
  };

  test('calculates correct transport emissions for EV vs Petrol', () => {
    const petrolEmissions = calculateMonthlyEmissions(baseData);
    
    const evData = { ...baseData, fuelType: 'ev' };
    const evEmissions = calculateMonthlyEmissions(evData);
    
    // EV multiplier is 0.3, so it should be significantly less
    expect(evEmissions.transport).toBeLessThan(petrolEmissions.transport);
    // Allowing some rounding tolerance
    expect(evEmissions.transport).toBeCloseTo(petrolEmissions.transport * 0.3, -1); 
  });

  test('calculates per-capita home energy correctly', () => {
    const singlePersonData = { ...baseData, householdSize: 1, electricityKwh: 600 };
    const singleEmissions = calculateMonthlyEmissions(singlePersonData);

    const fourPersonData = { ...baseData, householdSize: 4, electricityKwh: 600 };
    const fourEmissions = calculateMonthlyEmissions(fourPersonData);

    // 4 people sharing 600kWh should be exactly 1/4 the personal footprint
    expect(fourEmissions.energy).toBeCloseTo(singleEmissions.energy / 4);
  });

  test('tree equivalent calculation is accurate', () => {
    // A mature tree absorbs ~22kg of CO2 per year.
    expect(calculateTreesEquivalent(44)).toBe(2.0);
    expect(calculateTreesEquivalent(11)).toBe(0.5);
  });
});
