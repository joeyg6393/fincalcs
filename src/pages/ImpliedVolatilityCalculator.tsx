import React, { useState, useCallback } from 'react';
import { Activity } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateImpliedVolatility } from '../utils/optionsCalculators';
import { ImpliedVolatilityInputs, ImpliedVolatilityResults } from '../types/calculator';

export const ImpliedVolatilityCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ImpliedVolatilityInputs>({
    optionPrice: 5,
    stockPrice: 100,
    strikePrice: 100,
    timeToExpiry: 1,
    riskFreeRate: 2.5,
    optionType: 'call',
  });

  const [results, setResults] = useState<ImpliedVolatilityResults>({
    impliedVolatility: 0,
    annualizedVolatility: 0,
    confidenceInterval: {
      lower: 0,
      upper: 0,
    },
    historicalComparison: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateImpliedVolatility(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Implied Volatility Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate implied volatility from option prices
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Option Details
          </h2>
          <InputField
            label="Option Price"
            value={inputs.optionPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, optionPrice: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Stock Price"
            value={inputs.stockPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, stockPrice: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Strike Price"
            value={inputs.strikePrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, strikePrice: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Time to Expiry"
            value={inputs.timeToExpiry}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, timeToExpiry: value }))
            }
            min={0.01}
            max={10}
            step={0.1}
            suffix="years"
          />
          <InputField
            label="Risk-Free Rate"
            value={inputs.riskFreeRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, riskFreeRate: value }))
            }
            min={0}
            max={20}
            step={0.1}
            suffix="%"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option Type
            </label>
            <select
              value={inputs.optionType}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  optionType: e.target.value as 'call' | 'put',
                }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="call">Call Option</option>
              <option value="put">Put Option</option>
            </select>
          </div>
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Volatility</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Implied Volatility"
              amount={results.impliedVolatility}
              isCurrency={false}
              suffix="%"
              description="Market's expectation of future volatility"
            />
            <ResultCard
              title="Annualized Volatility"
              amount={results.annualizedVolatility}
              isCurrency={false}
              suffix="%"
              description="Volatility on an annual basis"
            />
            <ResultCard
              title="Historical Volatility"
              amount={results.historicalComparison}
              isCurrency={false}
              suffix="%"
              description="Average historical volatility"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Volatility Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <div className="ml-2">
                  <p className="text-gray-900 font-medium mb-2">
                    Confidence Interval
                  </p>
                  <p className="text-gray-600">
                    With 95% confidence, future volatility is expected to be between{' '}
                    {results.confidenceInterval.lower}% and {results.confidenceInterval.upper}%
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <div className="ml-2">
                  <p className="text-gray-900 font-medium mb-2">
                    Historical Comparison
                  </p>
                  <p className="text-gray-600">
                    {results.impliedVolatility > results.historicalComparison
                      ? 'The market expects higher than historical volatility, suggesting increased uncertainty.'
                      : 'The market expects lower than historical volatility, suggesting reduced uncertainty.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Interpreting Implied Volatility
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Higher IV suggests greater expected price movement</li>
                  <li>• IV tends to increase before major events</li>
                  <li>• IV can indicate market sentiment and risk perception</li>
                  <li>• Compare IV across different strikes for skew analysis</li>
                </ul>
              </div>

              {results.impliedVolatility > 50 && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="text-sm font-medium text-yellow-900 mb-2">
                    High Volatility Alert
                  </h4>
                  <p className="text-sm text-yellow-700">
                    The current implied volatility is significantly high, suggesting substantial 
                    market uncertainty. Consider this when making trading decisions.
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