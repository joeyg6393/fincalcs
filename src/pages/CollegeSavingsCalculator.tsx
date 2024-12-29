import React, { useState, useCallback } from 'react';
import { GraduationCap } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCollegeSavings } from '../utils/calculators';
import { CollegeSavingsInputs, CollegeSavingsResults } from '../types/calculator';

export const CollegeSavingsCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CollegeSavingsInputs>({
    childAge: 5,
    collegeStartAge: 18,
    yearsInCollege: 4,
    annualCost: 25000,
    currentSavings: 5000,
    expectedReturn: 6,
  });

  const [results, setResults] = useState<CollegeSavingsResults>({
    totalCost: 0,
    monthlyContribution: 0,
    projectedSavings: 0,
    shortfall: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCollegeSavings(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          College Savings Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan for your child's education expenses
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            College Planning Details
          </h2>
          <InputField
            label="Child's Current Age"
            value={inputs.childAge}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, childAge: value }))
            }
            min={0}
            max={17}
            step={1}
            suffix="years"
          />
          <InputField
            label="College Start Age"
            value={inputs.collegeStartAge}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, collegeStartAge: value }))
            }
            min={inputs.childAge + 1}
            max={25}
            step={1}
            suffix="years"
          />
          <InputField
            label="Years in College"
            value={inputs.yearsInCollege}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, yearsInCollege: value }))
            }
            min={1}
            max={6}
            step={1}
            suffix="years"
          />
          <InputField
            label="Annual College Cost"
            value={inputs.annualCost}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualCost: value }))
            }
            min={0}
            step={1000}
            prefix="$"
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
          <InputField
            label="Expected Return"
            value={inputs.expectedReturn}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, expectedReturn: value }))
            }
            min={0}
            max={15}
            step={0.1}
            suffix="%"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Savings</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Total College Cost"
            amount={results.totalCost}
            description="Estimated total cost of college"
          />
          <ResultCard
            title="Monthly Contribution"
            amount={results.monthlyContribution}
            description="Required monthly savings"
          />
          <ResultCard
            title="Projected Savings"
            amount={results.projectedSavings}
            description="Expected savings at college start"
          />
          <ResultCard
            title="Potential Shortfall"
            amount={results.shortfall}
            description="Additional funding needed"
          />
        </div>
      </div>
    </div>
  );
};