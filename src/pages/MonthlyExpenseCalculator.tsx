import React, { useState, useCallback } from 'react';
import { LayoutList, Plus, Trash2 } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateMonthlyExpenses } from '../utils/spendingCalculators';
import { MonthlyExpenseInputs, MonthlyExpenseResults } from '../types/calculator';

const categories = [
  'Housing',
  'Transportation',
  'Food',
  'Utilities',
  'Healthcare',
  'Insurance',
  'Entertainment',
  'Personal',
  'Debt',
  'Savings',
  'Other',
];

const defaultExpense = {
  category: 'Other',
  name: '',
  amount: 0,
  dueDate: 1,
  isRecurring: true,
};

export const MonthlyExpenseCalculator: React.FC = (): JSX.Element => {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState([
    { ...defaultExpense, name: 'Rent', category: 'Housing', amount: 1500, dueDate: 1 },
    { ...defaultExpense, name: 'Car Payment', category: 'Transportation', amount: 400, dueDate: 15 },
  ]);

  const [results, setResults] = useState<MonthlyExpenseResults>({
    totalExpenses: 0,
    remainingIncome: 0,
    expensesByCategory: [],
    upcomingExpenses: [],
  });

  const handleAddExpense = () => {
    setExpenses([...expenses, { ...defaultExpense }]);
  };

  const handleRemoveExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleUpdateExpense = (
    index: number,
    field: keyof typeof defaultExpense,
    value: string | number | boolean
  ) => {
    setExpenses(
      expenses.map((expense, i) =>
        i === index ? { ...expense, [field]: value } : expense
      )
    );
  };

  const handleCalculate = useCallback(() => {
    setResults(calculateMonthlyExpenses({ income, expenses }));
  }, [income, expenses]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <LayoutList className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Monthly Expense Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Track and categorize your monthly expenses
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Monthly Income
            </h2>
            <InputField
              label="Income"
              value={income}
              onChange={setIncome}
              min={0}
              step={100}
              prefix="$"
            />
          </div>

          {expenses.map((expense, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Expense #{index + 1}
                </h3>
                <button
                  onClick={() => handleRemoveExpense(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={expense.name}
                    onChange={(e) =>
                      handleUpdateExpense(index, 'name', e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={expense.category}
                    onChange={(e) =>
                      handleUpdateExpense(index, 'category', e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField
                  label="Amount"
                  value={expense.amount}
                  onChange={(value) =>
                    handleUpdateExpense(index, 'amount', value)
                  }
                  min={0}
                  step={1}
                  prefix="$"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="number"
                    value={expense.dueDate}
                    onChange={(e) =>
                      handleUpdateExpense(index, 'dueDate', parseInt(e.target.value))
                    }
                    min={1}
                    max={31}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={expense.isRecurring}
                    onChange={(e) =>
                      handleUpdateExpense(index, 'isRecurring', e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Recurring Monthly
                  </label>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddExpense}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </button>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Expenses</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Expenses"
              amount={results.totalExpenses}
              description="Monthly expenses total"
            />
            <ResultCard
              title="Remaining Income"
              amount={results.remainingIncome}
              description="After expenses"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Expenses by Category
            </h3>
            <div className="space-y-4">
              {results.expensesByCategory.map(({ category, total, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{category}</span>
                    <span>${total.toLocaleString()} ({percentage}%)</span>
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
              Upcoming Expenses
            </h3>
            <div className="space-y-4">
              {results.upcomingExpenses.map(({ name, amount, dueDate }) => (
                <div key={`${name}-${dueDate}`} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">{name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      Due on the {dueDate}th
                    </span>
                  </div>
                  <span className="font-medium">${amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}