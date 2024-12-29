import React, { useState, useCallback } from 'react';
import { LayoutList } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateBudgetPlanner } from '../utils/calculators';
import { BudgetPlannerInputs, BudgetPlannerResults } from '../types/calculator';

export const BudgetPlannerCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BudgetPlannerInputs>({
    monthlyIncome: 5000,
    expenses: {
      housing: 1500,
      utilities: 200,
      food: 600,
      transportation: 400,
      healthcare: 300,
      entertainment: 200,
      other: 300,
    },
  });

  const [results, setResults] = useState<BudgetPlannerResults>({
    totalExpenses: 0,
    remainingIncome: 0,
    expenseBreakdown: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateBudgetPlanner(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <LayoutList className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Budget Planner Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Create and manage your monthly budget
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Income & Expenses
          </h2>
          <InputField
            label="Monthly Income"
            value={inputs.monthlyIncome}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyIncome: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">
            Monthly Expenses
          </h3>
          {Object.entries(inputs.expenses).map(([category, amount]) => (
            <InputField
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={amount}
              onChange={(value) =>
                setInputs((prev) => ({
                  ...prev,
                  expenses: { ...prev.expenses, [category]: value },
                }))
              }
              min={0}
              step={50}
              prefix="$"
            />
          ))}
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Budget</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Expenses"
              amount={results.totalExpenses}
              description="Your total monthly expenses"
            />
            <ResultCard
              title="Remaining Income"
              amount={results.remainingIncome}
              description="Money left after expenses"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Expense Breakdown
            </h3>
            <div className="space-y-4">
              {results.expenseBreakdown.map(({ category, amount, percentage }) => (
                <div key={category} className="relative">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <span>${amount.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap 
                          text-white justify-center bg-blue-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};