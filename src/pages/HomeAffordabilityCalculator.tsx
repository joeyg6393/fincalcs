import React, { useState, useCallback } from 'react';
import { Building } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateHomeAffordability } from '../utils/realEstateCalculators';
import { HomeAffordabilityInputs, HomeAffordabilityResults } from '../types/realEstateCalculator';

export const HomeAffordabilityCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<HomeAffordabilityInputs>({
    annualIncome: 100000,
    monthlyDebts: 500,
    downPayment: 60000,
    interestRate: 4.5,
    propertyTax: 3600,
    insurance: 1200,
    monthlyHOA: 250,
  });

  const [results, setResults] = useState<HomeAffordabilityResults>({
    maxPurchasePrice: 0,
    maxLoanAmount: 0,
    monthlyPayment: 0,
    requiredIncome: 0,
    debtToIncomeRatio: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateHomeAffordability(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Building className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Home Affordability Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Determine how much house you can afford
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Income & Debts
            </h2>
            <InputField
              label="Annual Income"
              value={inputs.annualIncome}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, annualIncome: value }))
              }
              min={0}
              step={1000}
              prefix="$"
            />
            <InputField
              label="Monthly Debts"
              value={inputs.monthlyDebts}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, monthlyDebts: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Down Payment"
              value={inputs.downPayment}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, downPayment: value }))
              }
              min={0}
              step={1000}
              prefix="$"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Property Expenses
            </h2>
            <InputField
              label="Interest Rate"
              value={inputs.interestRate}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, interestRate: value }))
              }
              min={0}
              max={20}
              step={0.125}
              suffix="%"
            />
            <InputField
              label="Annual Property Tax"
              value={inputs.propertyTax}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, propertyTax: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Annual Insurance"
              value={inputs.insurance}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, insurance: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Monthly HOA"
              value={inputs.monthlyHOA}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, monthlyHOA: value }))
              }
              min={0}
              step={10}
              prefix="$"
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Affordability</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Maximum Purchase Price"
              amount={results.maxPurchasePrice}
              description="Maximum home price you can afford"
            />
            <ResultCard
              title="Maximum Loan Amount"
              amount={results.maxLoanAmount}
              description="Maximum mortgage amount"
            />
            <ResultCard
              title="Monthly Payment"
              amount={results.monthlyPayment}
              description="Estimated monthly payment"
            />
            <ResultCard
              title="Required Income"
              amount={results.requiredIncome}
              description="Annual income needed"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Affordability Analysis
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Debt-to-Income Ratio
                </h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                        ${results.debtToIncomeRatio <= 36 ? 'text-green-600 bg-green-200' : 
                          results.debtToIncomeRatio <= 43 ? 'text-yellow-600 bg-yellow-200' : 
                          'text-red-600 bg-red-200'}`}>
                        {results.debtToIncomeRatio}% DTI Ratio
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${Math.min(results.debtToIncomeRatio, 50)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center
                        ${results.debtToIncomeRatio <= 36 ? 'bg-green-500' : 
                          results.debtToIncomeRatio <= 43 ? 'bg-yellow-500' : 
                          'bg-red-500'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {results.debtToIncomeRatio <= 36 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                      Your debt-to-income ratio is within a healthy range
                    </li>
                  )}
                  {results.debtToIncomeRatio > 36 && results.debtToIncomeRatio <= 43 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      Consider reducing monthly debts to improve affordability
                    </li>
                  )}
                  {results.debtToIncomeRatio > 43 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                      DTI ratio is high - focus on debt reduction before home purchase
                    </li>
                  )}
                  {inputs.downPayment < results.maxPurchasePrice * 0.2 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      Consider a larger down payment to avoid PMI
                    </li>
                  )}
                  {inputs.monthlyHOA > 250 && (
                    <li className="flex items-center">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      High HOA fees significantly impact your buying power
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