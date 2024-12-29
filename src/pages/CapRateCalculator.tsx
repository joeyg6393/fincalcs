import React, { useState, useCallback } from 'react';
import { Percent } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCapRate } from '../utils/realEstateCalculators';
import { CapRateInputs, CapRateResults } from '../types/realEstateCalculator';

export const CapRateCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CapRateInputs>({
    propertyValue: 500000,
    monthlyRent: 3500,
    operatingExpenses: {
      propertyTax: 6000,
      insurance: 2400,
      utilities: 1800,
      maintenance: 3600,
      propertyManagement: 4200,
      hoa: 0,
      other: 1200,
    },
    vacancy: 5,
  });

  const [results, setResults] = useState<CapRateResults>({
    capRate: 0,
    noi: 0,
    effectiveGrossIncome: 0,
    operatingExpenseRatio: 0,
    cashOnCashReturn: 0,
    expenseBreakdown: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCapRate(inputs));
  }, [inputs]);

  const updateExpense = (category: keyof typeof inputs.operatingExpenses, value: number) => {
    setInputs(prev => ({
      ...prev,
      operatingExpenses: {
        ...prev.operatingExpenses,
        [category]: value,
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Percent className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Cap Rate Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate property capitalization rate and return metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Property Details
          </h2>
          <InputField
            label="Property Value"
            value={inputs.propertyValue}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, propertyValue: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Monthly Rent"
            value={inputs.monthlyRent}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyRent: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Vacancy Rate"
            value={inputs.vacancy}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, vacancy: value }))
            }
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />

          <h3 className="text-md font-medium text-gray-700 mt-8 mb-4">
            Annual Operating Expenses
          </h3>
          <InputField
            label="Property Tax"
            value={inputs.operatingExpenses.propertyTax}
            onChange={(value) => updateExpense('propertyTax', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Insurance"
            value={inputs.operatingExpenses.insurance}
            onChange={(value) => updateExpense('insurance', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Utilities"
            value={inputs.operatingExpenses.utilities}
            onChange={(value) => updateExpense('utilities', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Maintenance"
            value={inputs.operatingExpenses.maintenance}
            onChange={(value) => updateExpense('maintenance', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Property Management"
            value={inputs.operatingExpenses.propertyManagement}
            onChange={(value) => updateExpense('propertyManagement', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="HOA Fees"
            value={inputs.operatingExpenses.hoa}
            onChange={(value) => updateExpense('hoa', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Other Expenses"
            value={inputs.operatingExpenses.other}
            onChange={(value) => updateExpense('other', value)}
            min={0}
            step={100}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Returns</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Cap Rate"
              amount={results.capRate}
              isCurrency={false}
              suffix="%"
              description="Property's capitalization rate"
            />
            <ResultCard
              title="Net Operating Income"
              amount={results.noi}
              description="Annual NOI"
            />
            <ResultCard
              title="Effective Gross Income"
              amount={results.effectiveGrossIncome}
              description="Income after vacancy loss"
            />
            <ResultCard
              title="Operating Expense Ratio"
              amount={results.operatingExpenseRatio}
              isCurrency={false}
              suffix="%"
              description="Expenses as % of income"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Expense Breakdown
            </h3>
            <div className="space-y-4">
              {results.expenseBreakdown.map(({ category, annual, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{category}</span>
                    <span>${annual.toLocaleString()}/yr ({percentage}%)</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Investment Analysis
            </h3>
            <div className="space-y-4">
              {results.capRate < 4 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                  <p className="text-gray-600">
                    Low cap rate indicates potential overvaluation or high-priced market
                  </p>
                </div>
              )}
              {results.capRate >= 8 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Strong cap rate suggests good income potential relative to value
                  </p>
                </div>
              )}
              {results.operatingExpenseRatio > 50 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p className="text-gray-600">
                    High operating expense ratio may indicate maintenance issues or inefficient operations
                  </p>
                </div>
              )}
              {results.cashOnCashReturn > 8 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Strong cash on cash return indicates good leverage benefit
                  </p>
                </div>
              )}
              <div className="flex items-start">
                <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                <p className="text-gray-600">
                  {results.capRate < 6
                    ? 'Consider negotiating price or finding ways to increase income'
                    : results.capRate < 8
                    ? 'Property shows moderate income potential'
                    : 'Property shows strong income characteristics'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};