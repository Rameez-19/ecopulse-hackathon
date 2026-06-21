/**
 * EcoPulse Carbon Calculation Engine
 * These calculations are based on generalized global averages (EPA/GHG Protocol) 
 * for demonstration and hackathon MVP purposes.
 */

export interface OnboardingData {
  transportMode: string;
  fuelType: string;
  dailyCommuteKm: number;
  travelDaysPerWeek: number;
  dietType: string;
  electricityKwh: number;
  householdSize: number;
  onlinePurchases: number;
}

export interface CarbonBreakdown {
  transport: number;
  energy: number;
  food: number;
  shopping: number;
  totalMonthly: number;
  score: number;
}

// Emission Factors (kg CO2 per unit)
const FACTORS = {
  transport: {
    car: 0.192,       // per km
    motorcycle: 0.103,// per km
    shared_cab: 0.096,// per km
    bus: 0.105,       // per km
    train: 0.041,     // per km
    bicycle: 0,
    walking: 0
  },
  energy: 0.4,        // per kWh average grid
  diet: {             // Fixed monthly kg CO2 based on diet type
    vegan: 170,
    vegetarian: 210,
    mixed: 260,
    meat_heavy: 330
  },
  shopping: 15        // avg kg CO2 per online purchase delivery
};

const FUEL_MULTIPLIERS: Record<string, number> = {
  petrol: 1.0,
  diesel: 1.15,
  hybrid: 0.6,
  ev: 0.3,
  none: 1.0
};

/**
 * Calculates the monthly carbon footprint based on user inputs.
 * Returns the breakdown in kg of CO2 and a normalized score.
 */
export function calculateMonthlyEmissions(data: OnboardingData): CarbonBreakdown {
  // 1. Transport
  const mode = data.transportMode.toLowerCase() as keyof typeof FACTORS.transport;
  const transportFactor = FACTORS.transport[mode] || FACTORS.transport.car;
  
  const fuel = data.fuelType?.toLowerCase() || 'none';
  const fuelMultiplier = FUEL_MULTIPLIERS[fuel] || 1.0;
  
  const daysPerMonth = (data.travelDaysPerWeek || 5) * 4.33; // Average weeks in a month
  const transportMonthly = data.dailyCommuteKm * transportFactor * fuelMultiplier * daysPerMonth;

  // 2. Home Energy (Per Capita)
  const householdSize = Math.max(1, data.householdSize || 1);
  const energyMonthly = (data.electricityKwh / householdSize) * FACTORS.energy;

  // 3. Food
  const diet = data.dietType.toLowerCase().replace('-', '_') as keyof typeof FACTORS.diet;
  const foodMonthly = FACTORS.diet[diet] || FACTORS.diet.mixed;

  // 4. Shopping
  const shoppingMonthly = data.onlinePurchases * FACTORS.shopping;

  // Total Monthly
  const totalMonthly = transportMonthly + energyMonthly + foodMonthly + shoppingMonthly;

  // Calculate normalized score (0-100)
  let score = 100 - (totalMonthly / 10);
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return {
    transport: Math.round(transportMonthly),
    energy: Math.round(energyMonthly),
    food: Math.round(foodMonthly),
    shopping: Math.round(shoppingMonthly),
    totalMonthly: Math.round(totalMonthly),
    score: Math.round(score)
  };
}

/**
 * Calculates trees planted equivalent for a given CO2 reduction (kg).
 * A mature tree absorbs ~22kg of CO2 per year.
 */
export function calculateTreesEquivalent(co2SavedKg: number): number {
  return parseFloat((co2SavedKg / 22).toFixed(1));
}
