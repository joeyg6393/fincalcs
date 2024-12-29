import React, { useState, useCallback } from 'react';
import { PiggyBank } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateSavings } from '../utils/calculators';
import { SavingsInputs, SavingsResults } from '../types/calculator';

export const SavingsCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SavingsInputs>({
    targetAmount: 50000,
    timeframe: 5,
    initialSavings: 5000,
    interestRate: 2,
  });

  const [results, setResults] = useState<SavingsResults>({
    monthlyRequired: 0,
    totalContributions: 0,
    totalInterest: 0,
    finalBalance: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateSavings(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <PiggyBank className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Savings Goal Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate how to reach your savings goals
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Savings Details
          </h2>
          <InputField
            label="Target Amount"
            value={inputs.targetAmount}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, targetAmount: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Time Frame"
            value={inputs.timeframe}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, timeframe: value }))
            }
            min={1}
            max={50}
            step={1}
            suffix="years"
          />
          <InputField
            label="Initial Savings"
            value={inputs.initialSavings}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, initialSavings: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, interestRate: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Savings</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Monthly Required"
            amount={results.monthlyRequired}
            description="Amount to save monthly"
          />
          <ResultCard
            title="Total Contributions"
            amount={results.totalContributions}
            description="Total amount you will save"
          />
          <ResultCard
            title="Interest Earned"
            amount={results.totalInterest}
            description="Total interest earned"
          />
          <ResultCard
            title="Final Balance"
            amount={results.finalBalance}
            description="Your target savings goal"
          />
        </div>
      </div>
    </div>
  );
};