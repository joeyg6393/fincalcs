import React, { useState, useCallback } from 'react';
import { Briefcase } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateRetirement } from '../utils/calculators';
import { RetirementInputs, RetirementResults } from '../types/calculator';

export const RetirementCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RetirementInputs>({
    salary: 75000,
    contribution: 6,
    employerMatch: 50,
    matchLimit: 6,
    currentAge: 30,
    retirementAge: 65,
    currentBalance: 50000,
    annualReturn: 7,
  });

  const [results, setResults] = useState<RetirementResults>({
    projectedBalance: 0,
    totalContributions: 0,
    employerContributions: 0,
    monthlyContribution: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateRetirement(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          401(k) Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan your retirement savings with employer matching
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Retirement Details
          </h2>
          <InputField
            label="Annual Salary"
            value={inputs.salary}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, salary: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Your Contribution"
            value={inputs.contribution}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, contribution: value }))
            }
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Employer Match"
            value={inputs.employerMatch}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, employerMatch: value }))
            }
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
          <InputField
            label="Match Limit"
            value={inputs.matchLimit}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, matchLimit: value }))
            }
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Current Age"
            value={inputs.currentAge}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentAge: value }))
            }
            min={18}
            max={100}
            step={1}
            suffix="years"
          />
          <InputField
            label="Retirement Age"
            value={inputs.retirementAge}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, retirementAge: value }))
            }
            min={inputs.currentAge + 1}
            max={100}
            step={1}
            suffix="years"
          />
          <InputField
            label="Current Balance"
            value={inputs.currentBalance}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, currentBalance: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Expected Return"
            value={inputs.annualReturn}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualReturn: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Retirement</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Projected Balance"
            amount={results.projectedBalance}
            description="Estimated 401(k) balance at retirement"
          />
          <ResultCard
            title="Monthly Contribution"
            amount={results.monthlyContribution}
            description="Your monthly contribution"
          />
          <ResultCard
            title="Your Total Contributions"
            amount={results.totalContributions}
            description="Total amount you will contribute"
          />
          <ResultCard
            title="Employer Contributions"
            amount={results.employerContributions}
            description="Total employer match contributions"
          />
        </div>
      </div>
    </div>
  );
};