import React, { useState, useCallback } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateSubscriptions } from '../utils/spendingCalculators';
import { SubscriptionInputs, SubscriptionResults } from '../types/calculator';

const categories = [
  'Streaming',
  'Gaming',
  'Music',
  'Fitness',
  'News',
  'Software',
  'Other',
];

const defaultSubscription = {
  name: '',
  cost: 0,
  billingCycle: 'monthly' as const,
  category: 'Other',
};

export const SubscriptionManagementCalculator: React.FC = (): JSX.Element => {
  const [subscriptions, setSubscriptions] = useState([
    { ...defaultSubscription, name: 'Netflix', cost: 15.99, category: 'Streaming' },
    { ...defaultSubscription, name: 'Spotify', cost: 9.99, category: 'Music' },
  ]);

  const [results, setResults] = useState<SubscriptionResults>({
    monthlyTotal: 0,
    yearlyTotal: 0,
    categoryBreakdown: [],
  });

  const handleAddSubscription = () => {
    setSubscriptions([...subscriptions, { ...defaultSubscription }]);
  };

  const handleRemoveSubscription = (index: number) => {
    setSubscriptions(subscriptions.filter((_, i) => i !== index));
  };

  const handleUpdateSubscription = (
    index: number,
    field: keyof typeof defaultSubscription,
    value: string | number
  ) => {
    setSubscriptions(
      subscriptions.map((sub, i) =>
        i === index ? { ...sub, [field]: value } : sub
      )
    );
  };

  const handleCalculate = useCallback(() => {
    setResults(calculateSubscriptions({ subscriptions }));
  }, [subscriptions]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Subscription Management Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Track and optimize your subscription costs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          {subscriptions.map((subscription, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Subscription #{index + 1}
                </h3>
                <button
                  onClick={() => handleRemoveSubscription(index)}
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
                    value={subscription.name}
                    onChange={(e) =>
                      handleUpdateSubscription(index, 'name', e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <InputField
                  label="Cost"
                  value={subscription.cost}
                  onChange={(value) =>
                    handleUpdateSubscription(index, 'cost', value)
                  }
                  min={0}
                  step={0.01}
                  prefix="$"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={subscription.billingCycle}
                    onChange={(e) =>
                      handleUpdateSubscription(index, 'billingCycle', e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={subscription.category}
                    onChange={(e) =>
                      handleUpdateSubscription(index, 'category', e.target.value)
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
              </div>
            </div>
          ))}
          <button
            onClick={handleAddSubscription}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Subscription
          </button>
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Total Cost</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Monthly Total"
              amount={results.monthlyTotal}
              description="Total monthly subscription cost"
            />
            <ResultCard
              title="Yearly Total"
              amount={results.yearlyTotal}
              description="Total yearly subscription cost"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Category Breakdown
            </h3>
            <div className="space-y-4">
              {results.categoryBreakdown.map(({ category, monthlyAmount, yearlyAmount, percentage }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{category}</span>
                    <span>${monthlyAmount}/mo (${yearlyAmount}/yr)</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      />
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {percentage}% of total
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
}