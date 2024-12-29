import React, { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateInvestment } from '../utils/calculators';
import { InvestmentInputs, InvestmentResults } from '../types/calculator';

export const InvestmentCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InvestmentInputs>({
    initialInvestment: 10000,
    monthlyContribution: 500,
    annualReturn: 7,
    timeHorizon: 20,
  });

  const [results, setResults] = useState<InvestmentResults>({
    finalBalance: 0,
    totalContributions: 0,
    totalEarnings: 0,
    monthlyProjections: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateInvestment(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Investment Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Project your investment growth with compound interest
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
          <InputField
            label="Initial Investment"
            value={inputs.initialInvestment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, initialInvestment: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Monthly Contribution"
            value={inputs.monthlyContribution}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyContribution: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Annual Return"
            value={inputs.annualReturn}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualReturn: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Time Horizon"
            value={inputs.timeHorizon}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, timeHorizon: value }))
            }
            min={1}
            max={50}
            step={1}
            suffix="years"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Returns</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Final Balance"
            amount={results.finalBalance}
            description="Projected value of your investment"
          />
          <ResultCard
            title="Total Contributions"
            amount={results.totalContributions}
            description="Amount you will have invested"
          />
          <ResultCard
            title="Total Earnings"
            amount={results.totalEarnings}
            description="Earnings from compound interest"
          />
          <ResultCard
            title="Monthly Investment"
            amount={inputs.monthlyContribution}
            description="Your regular monthly investment"
          />
        </div>
      </div>
    </div>
  );
};