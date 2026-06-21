"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Zap, Utensils, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { calculateMonthlyEmissions, OnboardingData } from "@/lib/emissions";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    transportMode: 'car',
    fuelType: 'petrol',
    dailyCommuteKm: 15,
    travelDaysPerWeek: 5,
    dietType: 'mixed',
    electricityKwh: 300,
    householdSize: 2,
    onlinePurchases: 5,
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const results = calculateMonthlyEmissions(data);
    localStorage.setItem('ecoData', JSON.stringify(data));
    localStorage.setItem('ecoResults', JSON.stringify(results));
    router.push('/home');
  };

  const needsFuelSelection = ['car', 'motorcycle', 'shared_cab'].includes(data.transportMode);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
          Calculate Your Footprint
        </h2>
        
        {/* Progress Bar */}
        <div className="mt-8 relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100 dark:bg-emerald-900/30">
            <div style={{ width: `${(step / 4) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500"></div>
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Transport</span>
            <span>Energy</span>
            <span>Food</span>
            <span>Shopping</span>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-slate-900 py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          
          {/* Step 1: Transport */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl" aria-hidden="true">
                  <Car className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold">Transport</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-slate-500 mb-4 font-medium">How do you primarily get around?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'car', label: 'Car' },
                      { id: 'motorcycle', label: 'Motorbike / Scooter' },
                      { id: 'shared_cab', label: 'Shared Cab / Uber' },
                      { id: 'bus', label: 'Bus' },
                      { id: 'train', label: 'Train' },
                      { id: 'bicycle', label: 'Bicycle / Walk' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setData({ ...data, transportMode: mode.id })}
                        className={`p-3 rounded-xl border-2 text-sm font-semibold text-center transition-all ${
                          data.transportMode === mode.id 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' 
                            : 'border-slate-200 hover:border-emerald-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {needsFuelSelection && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <p className="text-slate-500 mb-4 font-medium">What type of fuel does it use?</p>
                    <div className="grid grid-cols-4 gap-2">
                      {['petrol', 'diesel', 'hybrid', 'ev'].map((fuel) => (
                        <button
                          key={fuel}
                          onClick={() => setData({ ...data, fuelType: fuel })}
                          className={`p-2 rounded-lg border-2 text-xs font-bold text-center capitalize transition-all ${
                            data.fuelType === fuel 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' 
                              : 'border-slate-200 hover:border-emerald-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex justify-between font-medium">
                    <label className="text-sm">Daily Distance</label>
                    <span className="text-emerald-600 font-bold">{data.dailyCommuteKm} km</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={data.dailyCommuteKm}
                    onChange={(e) => setData({ ...data, dailyCommuteKm: parseInt(e.target.value) })}
                    className="w-full mt-2 accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium">
                    <label className="text-sm">Travel Days / Week</label>
                    <span className="text-emerald-600 font-bold">{data.travelDaysPerWeek} days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={data.travelDaysPerWeek}
                    onChange={(e) => setData({ ...data, travelDaysPerWeek: parseInt(e.target.value) })}
                    className="w-full mt-2 accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Energy */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl" aria-hidden="true">
                  <Zap className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold">Home Energy</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-slate-500 mb-4 font-medium">What best describes your living space?</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'small', label: 'Small Apartment', kwh: 300 },
                      { id: 'medium', label: 'Medium House', kwh: 600 },
                      { id: 'large', label: 'Large House', kwh: 1000 },
                    ].map((home) => (
                      <button
                        key={home.id}
                        onClick={() => setData({ ...data, electricityKwh: home.kwh })}
                        className={`p-4 rounded-xl border-2 text-left font-semibold transition-all ${
                          data.electricityKwh === home.kwh 
                            ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' 
                            : 'border-slate-200 hover:border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {home.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate-500 mb-4 font-medium">How many people share this home?</p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setData({...data, householdSize: Math.max(1, data.householdSize - 1)})}
                      aria-label="Decrease household size"
                      className="h-12 w-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-xl font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center text-3xl font-extrabold text-amber-600">
                      {data.householdSize}
                    </div>
                    <button 
                      onClick={() => setData({...data, householdSize: Math.min(15, data.householdSize + 1)})}
                      aria-label="Increase household size"
                      className="h-12 w-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-xl font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-center text-slate-400 mt-3">We divide the energy footprint by the household size to calculate your personal impact.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Food */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-xl" aria-hidden="true">
                  <Utensils className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold">Diet & Food</h2>
              </div>
              <p className="text-slate-500 mb-6">What type of diet do you typically follow?</p>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'vegan', label: 'Vegan', desc: 'No animal products' },
                  { id: 'vegetarian', label: 'Vegetarian', desc: 'No meat, but dairy/eggs okay' },
                  { id: 'mixed', label: 'Mixed / Flexitarian', desc: 'Average amount of meat & plants' },
                  { id: 'meat_heavy', label: 'Meat Heavy', desc: 'Meat with most meals' },
                ].map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => setData({ ...data, dietType: diet.id })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      data.dietType === diet.id 
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' 
                        : 'border-slate-200 hover:border-rose-200 dark:border-slate-700'
                    }`}
                  >
                    <div className={`font-bold ${data.dietType === diet.id ? 'text-rose-700 dark:text-rose-300' : 'text-slate-900 dark:text-white'}`}>
                      {diet.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{diet.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Shopping */}
          {step === 4 && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl" aria-hidden="true">
                  <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold">Shopping Habits</h2>
              </div>
              <p className="text-slate-500 mb-6">How many online deliveries do you receive per month?</p>
              
              <div className="space-y-6">
                <div className="flex justify-between font-medium">
                  <label className="text-sm">Monthly Deliveries</label>
                  <span className="text-indigo-600 font-bold">{data.onlinePurchases} packages</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data.onlinePurchases}
                  onChange={(e) => setData({ ...data, onlinePurchases: parseInt(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                step === 1 
                  ? 'text-slate-400 cursor-not-allowed opacity-50' 
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:scale-105 hover:bg-emerald-500 transition-all"
            >
              {step === 4 ? 'See My Footprint' : 'Continue'} 
              {step !== 4 && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
          
        </div>
      </div>
    </main>
  );
}
