import React, { useState, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateRule72 } from '../utils/growthCalculators';
import { Rule72Inputs, Rule72Results } from '../types/calculator';

export const Rule72Calculator: React.FC = () => {
  const [inputs, setInputs] = useState<Rule72Inputs>({
    interestRate: 7,
    initialAmount: 10000,
  });

  const [results, setResults] = useState<Rule72Results>({
    yearsToDouble: 0,
    doubledAmount: 0,
    effectiveRate: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateRule72(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Rule of 72 Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate how long it takes your investment to double
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
          <InputField
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, interestRate: value }))
            }
            min={0.1}
            max={50}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Initial Amount"
            value={inputs.initialAmount}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, initialAmount: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Doubling Time</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Years to Double"
              amount={results.yearsToDouble}
              isCurrency={false}
              suffix=" years"
              description="Time until your money doubles"
            />
            <ResultCard
              title="Doubled Amount"
              amount={results.doubledAmount}
              description="Your investment after doubling"
            />
            <ResultCard
              title="Effective Rate"
              amount={results.effectiveRate}
              isCurrency={false}
              suffix="%"
              description="Actual annual return rate"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Understanding the Rule of 72
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                The Rule of 72 is a simple way to determine how long an investment
                will take to double given a fixed annual rate of interest.
              </p>
              <p>
                By dividing 72 by the annual rate of return, you can get a rough
                estimate of how many years it will take for the initial investment
                to double.
              </p>
              <p>For example:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>At 6% interest, money takes 12 years to double (72 ÷ 6 = 12)</li>
                <li>At 8% interest, money takes 9 years to double (72 ÷ 8 = 9)</li>
                <li>At 12% interest, money takes 6 years to double (72 ÷ 12 = 6)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};