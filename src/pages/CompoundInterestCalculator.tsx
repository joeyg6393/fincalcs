import React, { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCompoundInterest } from '../utils/growthCalculators';
import { CompoundInterestInputs, CompoundInterestResults } from '../types/calculator';

export const CompoundInterestCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CompoundInterestInputs>({
    principal: 10000,
    annualRate: 7,
    years: 10,
    compoundingFrequency: 'monthly',
    monthlyContribution: 500,
  });

  const [results, setResults] = useState<CompoundInterestResults>({
    finalAmount: 0,
    totalInterest: 0,
    totalContributions: 0,
    yearlyBreakdown: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCompoundInterest(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Compound Interest Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate compound interest growth over time
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
          <InputField
            label="Initial Principal"
            value={inputs.principal}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, principal: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Annual Interest Rate"
            value={inputs.annualRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualRate: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Time Period"
            value={inputs.years}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, years: value }))
            }
            min={1}
            max={50}
            step={1}
            suffix="years"
          />
          <InputField
            label="Monthly Contribution"
            value={inputs.monthlyContribution}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyContribution: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compounding Frequency
            </label>
            <select
              value={inputs.compoundingFrequency}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  compoundingFrequency: e.target.value as CompoundInterestInputs['compoundingFrequency'],
                }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="annually">Annually</option>
              <option value="semi-annually">Semi-Annually</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Growth</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Final Amount"
              amount={results.finalAmount}
              description="Total value after growth"
            />
            <ResultCard
              title="Total Interest"
              amount={results.totalInterest}
              description="Interest earned"
            />
            <ResultCard
              title="Total Contributions"
              amount={results.totalContributions}
              description="Amount invested"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Year by Year Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contributions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.yearlyBreakdown.map((year) => (
                    <tr key={year.year}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Year {year.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.balance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.interest.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.contributions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};