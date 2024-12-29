import React, { useState, useCallback } from 'react';
import { Scale } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateRefinance } from '../utils/realEstateCalculators';
import { RefinanceInputs, RefinanceResults } from '../types/realEstateCalculator';

export const RefinanceCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RefinanceInputs>({
    currentLoanBalance: 250000,
    currentInterestRate: 5.5,
    currentLoanTerm: 30,
    newInterestRate: 4.5,
    newLoanTerm: 30,
    closingCosts: 4000,
  });

  const [results, setResults] = useState<RefinanceResults>({
    newMonthlyPayment: 0,
    oldMonthlyPayment: 0,
    monthlySavings: 0,
    breakEvenMonths: 0,
    lifetimeSavings: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateRefinance(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Refinance Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Compare your current mortgage with refinancing options
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Current Mortgage
            </h2>
            <InputField
              label="Current Loan Balance"
              value={inputs.currentLoanBalance}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, currentLoanBalance: value }))
              }
              min={0}
              step={1000}
              prefix="$"
            />
            <InputField
              label="Current Interest Rate"
              value={inputs.currentInterestRate}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, currentInterestRate: value }))
              }
              min={0}
              max={20}
              step={0.125}
              suffix="%"
            />
            <InputField
              label="Current Loan Term"
              value={inputs.currentLoanTerm}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, currentLoanTerm: value }))
              }
              min={1}
              max={50}
              step={1}
              suffix="years"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              New Loan Details
            </h2>
            <InputField
              label="New Interest Rate"
              value={inputs.newInterestRate}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, newInterestRate: value }))
              }
              min={0}
              max={20}
              step={0.125}
              suffix="%"
            />
            <InputField
              label="New Loan Term"
              value={inputs.newLoanTerm}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, newLoanTerm: value }))
              }
              min={1}
              max={50}
              step={1}
              suffix="years"
            />
            <InputField
              label="Closing Costs"
              value={inputs.closingCosts}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, closingCosts: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Savings</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Current Monthly Payment"
              amount={results.oldMonthlyPayment}
              description="Your current monthly payment"
            />
            <ResultCard
              title="New Monthly Payment"
              amount={results.newMonthlyPayment}
              description="Your new monthly payment"
            />
            <ResultCard
              title="Monthly Savings"
              amount={results.monthlySavings}
              description="Monthly payment reduction"
            />
            <ResultCard
              title="Break-Even Time"
              amount={results.breakEvenMonths}
              isCurrency={false}
              suffix=" months"
              description="Time to recover closing costs"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Refinance Analysis
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Lifetime Savings
                </h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${results.lifetimeSavings.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    total savings over loan term
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Break-Even Analysis
                </h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Break-Even Point: {results.breakEvenMonths} months
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${Math.min((results.breakEvenMonths / 60) * 100, 100)}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      5 Year Reference
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {results.breakEvenMonths < 24 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                      Refinancing looks favorable with a quick break-even period
                    </li>
                  )}
                  {results.monthlySavings > 100 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                      Significant monthly savings make this an attractive option
                    </li>
                  )}
                  {results.breakEvenMonths > 36 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      Consider your long-term plans before refinancing due to extended break-even period
                    </li>
                  )}
                  {inputs.newLoanTerm > inputs.currentLoanTerm && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      New loan term is longer - consider the total cost of the longer term
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};