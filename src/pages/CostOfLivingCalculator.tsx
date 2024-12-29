import React, { useState, useCallback } from 'react';
import { Building2 } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCostOfLiving } from '../utils/spendingCalculators';
import { CostOfLivingInputs, CostOfLivingResults } from '../types/calculator';

const cities = [
  'New York',
  'San Francisco',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'Dallas',
  'Austin',
  'Denver',
];

export const CostOfLivingCalculator: React.FC = (): JSX.Element => {
  const [inputs, setInputs] = useState<CostOfLivingInputs>({
    currentCity: 'Houston',
    newCity: 'San Francisco',
    currentIncome: 75000,
    currentRent: 1500,
    currentUtilities: 200,
    currentGroceries: 500,
    currentTransportation: 400,
  });

  const [results, setResults] = useState<CostOfLivingResults>({
    requiredIncome: 0,
    rentDifference: 0,
    utilitiesDifference: 0,
    groceriesDifference: 0,
    transportationDifference: 0,
    totalDifference: 0,
    percentageDifference: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCostOfLiving(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Cost of Living Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Compare living costs between cities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Location Details
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current City
            </label>
            <select
              value={inputs.currentCity}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, currentCity: e.target.value }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New City
            </label>
            <select
              value={inputs.newCity}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, newCity: e.target.value }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="Current Annual Income"
            value={inputs.currentIncome}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentIncome: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Current Monthly Rent"
            value={inputs.currentRent}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentRent: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Current Monthly Utilities"
            value={inputs.currentUtilities}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentUtilities: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Current Monthly Groceries"
            value={inputs.currentGroceries}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentGroceries: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Current Monthly Transportation"
            value={inputs.currentTransportation}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentTransportation: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Cost of Living</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Required Income"
              amount={results.requiredIncome}
              description="Equivalent income needed"
            />
            <ResultCard
              title="Cost Difference"
              amount={Math.abs(results.totalDifference)}
              description={`${results.percentageDifference >= 0 ? 'Increase' : 'Decrease'} of ${Math.abs(results.percentageDifference)}%`}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Monthly Differences
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Rent', value: results.rentDifference },
                { label: 'Utilities', value: results.utilitiesDifference },
                { label: 'Groceries', value: results.groceriesDifference },
                { label: 'Transportation', value: results.transportationDifference },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-600">{label}</span>
                  <span className={`font-medium ${value >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {value >= 0 ? '+' : ''}{value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}