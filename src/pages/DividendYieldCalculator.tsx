import React, { useState, useCallback } from 'react';
import { DollarSign } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateDividendYield } from '../utils/stockMarketCalculators';
import { DividendYieldInputs, DividendYieldResults } from '../types/calculator';

export const DividendYieldCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<DividendYieldInputs>({
    stockPrice: 50,
    annualDividend: 2,
    payoutFrequency: 'quarterly',
  });

  const [results, setResults] = useState<DividendYieldResults>({
    dividendYield: 0,
    monthlyIncome: 0,
    annualIncome: 0,
    payoutSchedule: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateDividendYield(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Dividend Yield Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate dividend yield and income potential
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Stock Details
          </h2>
          <InputField
            label="Stock Price"
            value={inputs.stockPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, stockPrice: value }))
            }
            min={0}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Annual Dividend"
            value={inputs.annualDividend}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualDividend: value }))
            }
            min={0}
            step={0.01}
            prefix="$"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payout Frequency
            </label>
            <select
              value={inputs.payoutFrequency}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  payoutFrequency: e.target.value as 'annual' | 'semi-annual' | 'quarterly' | 'monthly',
                }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="annual">Annual</option>
              <option value="semi-annual">Semi-Annual</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Yield</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Dividend Yield"
              amount={results.dividendYield}
              isCurrency={false}
              suffix="%"
              description="Annual yield percentage"
            />
            <ResultCard
              title="Annual Income"
              amount={results.annualIncome}
              description="Total yearly dividend income"
            />
            <ResultCard
              title="Monthly Income"
              amount={results.monthlyIncome}
              description="Average monthly income"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Projected Payout Schedule
            </h3>
            <div className="space-y-4">
              {results.payoutSchedule.map((date, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">
                    Payment {index + 1}
                  </span>
                  <span className="font-medium">
                    {date.toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};