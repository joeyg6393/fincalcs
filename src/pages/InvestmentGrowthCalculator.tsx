import React, { useState, useCallback } from 'react';
import { LineChart } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateInvestmentGrowth } from '../utils/growthCalculators';
import { InvestmentGrowthInputs, InvestmentGrowthResults } from '../types/calculator';

export const InvestmentGrowthCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InvestmentGrowthInputs>({
    initialAmount: 10000,
    monthlyContribution: 500,
    years: 20,
    expectedReturn: 7,
    inflationRate: 2,
    taxRate: 25,
  });

  const [results, setResults] = useState<InvestmentGrowthResults>({
    nominalValue: 0,
    realValue: 0,
    totalContributions: 0,
    totalTaxes: 0,
    yearlyBreakdown: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateInvestmentGrowth(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <LineChart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Investment Growth Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Model investment growth scenarios with inflation and taxes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
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
            label="Expected Return"
            value={inputs.expectedReturn}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, expectedReturn: value }))
            }
            min={0}
            max={30}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Inflation Rate"
            value={inputs.inflationRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, inflationRate: value }))
            }
            min={0}
            max={20}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Tax Rate"
            value={inputs.taxRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, taxRate: value }))
            }
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Growth</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Nominal Value"
              amount={results.nominalValue}
              description="Future value before inflation"
            />
            <ResultCard
              title="Real Value"
              amount={results.realValue}
              description="Future value after inflation"
            />
            <ResultCard
              title="Total Contributions"
              amount={results.totalContributions}
              description="Amount invested"
            />
            <ResultCard
              title="Total Taxes"
              amount={results.totalTaxes}
              description="Estimated tax impact"
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
                      Nominal Value
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Real Value
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contributions
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taxes
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
                        ${year.nominal.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.real.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.contributions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.taxes.toLocaleString()}
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