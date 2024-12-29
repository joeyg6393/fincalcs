import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateDividendReinvestment } from '../utils/stockMarketCalculators';
import { DividendReinvestmentInputs, DividendReinvestmentResults } from '../types/calculator';

export const DividendReinvestmentCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<DividendReinvestmentInputs>({
    initialInvestment: 10000,
    sharePrice: 50,
    annualDividend: 2,
    growthRate: 5,
    years: 10,
  });

  const [results, setResults] = useState<DividendReinvestmentResults>({
    finalValue: 0,
    totalDividends: 0,
    totalShares: 0,
    yearlyBreakdown: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateDividendReinvestment(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Dividend Reinvestment Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Project growth with reinvested dividends
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
          <InputField
            label="Initial Investment"
            value={inputs.initialInvestment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, initialInvestment: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Share Price"
            value={inputs.sharePrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, sharePrice: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Annual Dividend Per Share"
            value={inputs.annualDividend}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualDividend: value }))
            }
            min={0}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Annual Growth Rate"
            value={inputs.growthRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, growthRate: value }))
            }
            min={-20}
            max={50}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Investment Period"
            value={inputs.years}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, years: value }))
            }
            min={1}
            max={50}
            step={1}
            suffix="years"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Returns</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Final Value"
              amount={results.finalValue}
              description="Total investment value"
            />
            <ResultCard
              title="Total Dividends"
              amount={results.totalDividends}
              description="Total dividends earned"
            />
            <ResultCard
              title="Total Shares"
              amount={results.totalShares}
              isCurrency={false}
              description="Final number of shares"
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
                      Shares
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dividends
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
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
                        {year.shares.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.dividends.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${year.value.toLocaleString()}
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