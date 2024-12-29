import React, { useState, useCallback } from 'react';
import { CloudSun } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateRainyDay } from '../utils/calculators';
import { RainyDayInputs, RainyDayResults } from '../types/calculator';

export const RainyDayCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RainyDayInputs>({
    monthlyIncome: 5000,
    targetPercentage: 20,
    currentSavings: 2000,
    timeframe: 1,
  });

  const [results, setResults] = useState<RainyDayResults>({
    targetAmount: 0,
    monthlyContribution: 0,
    timeToReach: 0,
    progressPercentage: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateRainyDay(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <CloudSun className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Rainy Day Fund Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan for unexpected expenses
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Rainy Day Fund Details
          </h2>
          <InputField
            label="Monthly Income"
            value={inputs.monthlyIncome}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyIncome: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Target Percentage"
            value={inputs.targetPercentage}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, targetPercentage: value }))
            }
            min={1}
            max={100}
            step={1}
            suffix="%"
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
          <InputField
            label="Target Timeframe"
            value={inputs.timeframe}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, timeframe: value }))
            }
            min={0.5}
            max={5}
            step={0.5}
            suffix="years"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Fund</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Target Amount"
            amount={results.targetAmount}
            description="Your recommended fund size"
          />
          <ResultCard
            title="Monthly Contribution"
            amount={results.monthlyContribution}
            description="Required monthly savings"
          />
          <ResultCard
            title="Time to Reach Goal"
            amount={results.timeToReach}
            isCurrency={false}
            description="Years to reach target"
          />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
            <div className="relative pt-1">
              <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${Math.min(100, results.progressPercentage)}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap 
                    text-white justify-center bg-blue-600 transition-all duration-500"
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {results.progressPercentage.toFixed(1)}% of target
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};