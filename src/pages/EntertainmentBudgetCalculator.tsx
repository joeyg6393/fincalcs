import React, { useState, useCallback } from 'react';
import { Music } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateEntertainmentBudget } from '../utils/spendingCalculators';
import { EntertainmentBudgetInputs, EntertainmentBudgetResults } from '../types/calculator';

export const EntertainmentBudgetCalculator: React.FC = (): JSX.Element => {
  const [inputs, setInputs] = useState<EntertainmentBudgetInputs>({
    monthlyIncome: 5000,
    categories: {
      dining: 400,
      movies: 50,
      concerts: 100,
      sports: 100,
      hobbies: 150,
      streaming: 50,
      other: 100,
    },
  });

  const [results, setResults] = useState<EntertainmentBudgetResults>({
    totalBudget: 0,
    percentageOfIncome: 0,
    categoryBreakdown: [],
    recommendations: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateEntertainmentBudget(inputs));
  }, [inputs]);

  const updateCategory = (category: keyof typeof inputs.categories, value: number) => {
    setInputs((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value,
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Music className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Entertainment Budget Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan and track your entertainment spending
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Income & Entertainment Expenses
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
            Monthly Entertainment Categories
          </h3>
          
          <InputField
            label="Dining Out"
            value={inputs.categories.dining}
            onChange={(value) => updateCategory('dining', value)}
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Movies & Theater"
            value={inputs.categories.movies}
            onChange={(value) => updateCategory('movies', value)}
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Concerts & Live Events"
            value={inputs.categories.concerts}
            onChange={(value) => updateCategory('concerts', value)}
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Sports & Recreation"
            value={inputs.categories.sports}
            onChange={(value) => updateCategory('sports', value)}
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Hobbies"
            value={inputs.categories.hobbies}
            onChange={(value) => updateCategory('hobbies', value)}
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Streaming Services"
            value={inputs.categories.streaming}
            onChange={(value) => updateCategory('streaming', value)}
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Other Entertainment"
            value={inputs.categories.other}
            onChange={(value) => updateCategory('other', value)}
            min={0}
            step={10}
            prefix="$"
          />
          
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Budget</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Entertainment Budget"
              amount={results.totalBudget}
              description="Monthly entertainment spending"
            />
            <ResultCard
              title="Percentage of Income"
              amount={results.percentageOfIncome}
              isCurrency={false}
              description="Of monthly income"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Category Breakdown
            </h3>
            <div className="space-y-4">
              {results.categoryBreakdown.map(({ category, amount, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="capitalize">{category}</span>
                    <span>${amount.toLocaleString()} ({percentage}%)</span>
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

          {results.recommendations.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Budget Recommendations
              </h3>
              <ul className="space-y-2 text-gray-600">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                    <span className="ml-2">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}