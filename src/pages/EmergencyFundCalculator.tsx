import React, { useState, useCallback } from 'react';
import { Umbrella } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateEmergencyFund } from '../utils/calculators';
import { EmergencyFundInputs, EmergencyFundResults } from '../types/calculator';

export const EmergencyFundCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<EmergencyFundInputs>({
    monthlyExpenses: 3000,
    desiredMonths: 6,
    currentSavings: 5000,
  });

  const [results, setResults] = useState<EmergencyFundResults>({
    targetAmount: 0,
    additionalNeeded: 0,
    monthlyContribution: 0,
    timeToReach: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateEmergencyFund(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Umbrella className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Emergency Fund Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your emergency fund needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Emergency Fund Details
          </h2>
          <InputField
            label="Monthly Expenses"
            value={inputs.monthlyExpenses}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyExpenses: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Desired Months of Coverage"
            value={inputs.desiredMonths}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, desiredMonths: value }))
            }
            min={3}
            max={24}
            step={1}
            suffix="months"
          />
          <InputField
            label="Current Savings"
            value={inputs.currentSavings}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentSavings: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Fund</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Target Amount"
            amount={results.targetAmount}
            description={`${inputs.desiredMonths} months of expenses`}
          />
          <ResultCard
            title="Additional Needed"
            amount={results.additionalNeeded}
            description="Amount still needed to save"
          />
          <ResultCard
            title="Monthly Contribution"
            amount={results.monthlyContribution}
            description="Suggested monthly savings"
          />
          <ResultCard
            title="Time to Reach Goal"
            amount={results.timeToReach}
            isCurrency={false}
            description="Months until goal is reached"
          />
        </div>
      </div>
    </div>
  );
};