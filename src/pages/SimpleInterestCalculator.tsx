import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateSimpleInterest } from '../utils/growthCalculators';
import { SimpleInterestInputs, SimpleInterestResults } from '../types/calculator';

export const SimpleInterestCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SimpleInterestInputs>({
    principal: 10000,
    rate: 5,
    time: 3,
  });

  const [results, setResults] = useState<SimpleInterestResults>({
    interest: 0,
    finalAmount: 0,
    dailyInterest: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateSimpleInterest(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Simple Interest Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate simple interest returns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
          <InputField
            label="Principal Amount"
            value={inputs.principal}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, principal: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Interest Rate"
            value={inputs.rate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, rate: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Time Period"
            value={inputs.time}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, time: value }))
            }
            min={0.1}
            max={30}
            step={0.5}
            suffix="years"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Interest</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Total Interest"
            amount={results.interest}
            description="Interest earned over the period"
          />
          <ResultCard
            title="Final Amount"
            amount={results.finalAmount}
            description="Principal plus interest"
          />
          <ResultCard
            title="Daily Interest"
            amount={results.dailyInterest}
            description="Average interest earned per day"
          />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Simple vs. Compound Interest
            </h3>
            <p className="text-gray-600 text-sm">
              Simple interest is calculated only on the principal amount, while compound
              interest is calculated on both the principal and accumulated interest.
              For long-term investments, compound interest typically yields better returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};