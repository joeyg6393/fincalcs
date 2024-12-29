import React, { useState, useCallback } from 'react';
import { Building2 } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateLandlordExpenses } from '../utils/realEstateCalculators';
import { LandlordExpenseInputs, LandlordExpenseResults } from '../types/realEstateCalculator';

export const LandlordExpenseCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<LandlordExpenseInputs>({
    monthlyRent: 2000,
    propertyValue: 300000,
    mortgage: {
      payment: 1500,
      enabled: true,
    },
    expenses: {
      propertyTax: 3600,
      insurance: 1200,
      utilities: 1800,
      maintenance: 2400,
      propertyManagement: 2400,
      hoa: 0,
      marketing: 600,
      legal: 500,
      other: 1000,
    },
    vacancy: 5,
  });

  const [results, setResults] = useState<LandlordExpenseResults>({
    monthlyExpenses: 0,
    annualExpenses: 0,
    netOperatingIncome: 0,
    cashFlow: 0,
    expenseRatio: 0,
    expenseBreakdown: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateLandlordExpenses(inputs));
  }, [inputs]);

  const updateExpense = (category: keyof typeof inputs.expenses, value: number) => {
    setInputs(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: value,
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Landlord Expense Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Track and analyze your rental property expenses
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Property Details
            </h2>
            <InputField
              label="Monthly Rent"
              value={inputs.monthlyRent}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, monthlyRent: value }))
              }
              min={0}
              step={50}
              prefix="$"
            />
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
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Mortgage Payment
              </h2>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.mortgage.enabled}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      mortgage: {
                        ...prev.mortgage,
                        enabled: e.target.checked,
                      },
                    }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Include Mortgage</span>
              </label>
            </div>
            {inputs.mortgage.enabled && (
              <InputField
                label="Monthly Payment"
                value={inputs.mortgage.payment}
                onChange={(value) =>
                  setInputs((prev) => ({
                    ...prev,
                    mortgage: {
                      ...prev.mortgage,
                      payment: value,
                    },
                  }))
                }
                min={0}
                step={50}
                prefix="$"
              />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Annual Operating Expenses
            </h2>
            <div className="space-y-4">
              <InputField
                label="Property Tax"
                value={inputs.expenses.propertyTax}
                onChange={(value) => updateExpense('propertyTax', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Insurance"
                value={inputs.expenses.insurance}
                onChange={(value) => updateExpense('insurance', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Utilities"
                value={inputs.expenses.utilities}
                onChange={(value) => updateExpense('utilities', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Maintenance"
                value={inputs.expenses.maintenance}
                onChange={(value) => updateExpense('maintenance', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Property Management"
                value={inputs.expenses.propertyManagement}
                onChange={(value) => updateExpense('propertyManagement', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="HOA Fees"
                value={inputs.expenses.hoa}
                onChange={(value) => updateExpense('hoa', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Marketing"
                value={inputs.expenses.marketing}
                onChange={(value) => updateExpense('marketing', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Legal & Professional"
                value={inputs.expenses.legal}
                onChange={(value) => updateExpense('legal', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Other Expenses"
                value={inputs.expenses.other}
                onChange={(value) => updateExpense('other', value)}
                min={0}
                step={100}
                prefix="$"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Expenses</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Monthly Expenses"
              amount={results.monthlyExpenses}
              description="Total monthly operating costs"
            />
            <ResultCard
              title="Annual Expenses"
              amount={results.annualExpenses}
              description="Total yearly operating costs"
            />
            <ResultCard
              title="Net Operating Income"
              amount={results.netOperatingIncome}
              description="Annual NOI before debt service"
            />
            <ResultCard
              title="Cash Flow"
              amount={results.cashFlow}
              description="Annual cash flow after all expenses"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Expense Breakdown
              </h3>
              <span className="text-sm text-gray-500">
                Expense Ratio: {results.expenseRatio}%
              </span>
            </div>
            <div className="space-y-4">
              {results.expenseBreakdown.map(({ category, monthly, annual, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{category}</span>
                    <span>${monthly}/mo (${annual}/yr)</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      />
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {percentage}% of expenses
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Financial Health Indicators
            </h3>
            <div className="space-y-4">
              {results.expenseRatio > 80 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                  <p className="text-gray-600">
                    High expense ratio indicates potential cash flow issues
                  </p>
                </div>
              )}
              {results.cashFlow < 0 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                  <p className="text-gray-600">
                    Negative cash flow - consider ways to increase income or reduce expenses
                  </p>
                </div>
              )}
              {results.expenseRatio <= 50 && results.cashFlow > 0 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Healthy expense ratio and positive cash flow
                  </p>
                </div>
              )}
              {inputs.vacancy < 5 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p className="text-gray-600">
                    Consider increasing vacancy allowance for better risk management
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};