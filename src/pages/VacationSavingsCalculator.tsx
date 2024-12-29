import React, { useState, useCallback } from 'react';
import { Plane } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateVacationSavings } from '../utils/spendingCalculators';
import { VacationSavingsInputs, VacationSavingsResults } from '../types/calculator';

export const VacationSavingsCalculator: React.FC = (): JSX.Element => {
  const [inputs, setInputs] = useState<VacationSavingsInputs>({
    destination: 'Hawaii',
    travelCost: 1200,
    accommodationCost: 1500,
    activities: 800,
    food: 600,
    miscExpenses: 400,
    startDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months from now
    currentSavings: 1000,
  });

  const [results, setResults] = useState<VacationSavingsResults>({
    totalCost: 0,
    monthlyRequired: 0,
    weeksUntilTrip: 0,
    savingsProgress: 0,
    breakdown: {
      travel: 0,
      accommodation: 0,
      activities: 0,
      food: 0,
      misc: 0,
    },
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateVacationSavings(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Plane className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Vacation Savings Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan and save for your dream vacation
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Vacation Details
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              value={inputs.destination}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, destination: e.target.value }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travel Date
            </label>
            <input
              type="date"
              value={inputs.startDate.toISOString().split('T')[0]}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, startDate: new Date(e.target.value) }))
              }
              min={new Date().toISOString().split('T')[0]}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <InputField
            label="Travel Cost"
            value={inputs.travelCost}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, travelCost: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Accommodation Cost"
            value={inputs.accommodationCost}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, accommodationCost: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Activities Budget"
            value={inputs.activities}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, activities: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Food Budget"
            value={inputs.food}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, food: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Miscellaneous Expenses"
            value={inputs.miscExpenses}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, miscExpenses: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Current Savings"
            value={inputs.currentSavings}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentSavings: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Savings Plan</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Cost"
              amount={results.totalCost}
              description="Total vacation budget needed"
            />
            <ResultCard
              title="Monthly Savings Needed"
              amount={results.monthlyRequired}
              description="Required monthly contribution"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Savings Progress
            </h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {results.savingsProgress}% Saved
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {results.weeksUntilTrip} weeks until trip
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${results.savingsProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cost Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(results.breakdown).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="capitalize">{category}</span>
                    <span>${amount.toLocaleString()}</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${(amount / results.totalCost) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}