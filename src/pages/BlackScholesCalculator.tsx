import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateBlackScholes } from '../utils/optionsCalculators';
import { BlackScholesInputs, BlackScholesResults } from '../types/calculator';

export const BlackScholesCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BlackScholesInputs>({
    stockPrice: 100,
    strikePrice: 100,
    timeToExpiry: 1,
    riskFreeRate: 2.5,
    volatility: 20,
    optionType: 'call',
  });

  const [results, setResults] = useState<BlackScholesResults>({
    optionPrice: 0,
    delta: 0,
    gamma: 0,
    theta: 0,
    vega: 0,
    rho: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateBlackScholes(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Black-Scholes Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate option prices and Greeks
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Option Details
          </h2>
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
          <InputField
            label="Volatility"
            value={inputs.volatility}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, volatility: value }))
            }
            min={1}
            max={200}
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
            <Button onClick={handleCalculate}>Calculate Option Price</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Option Price"
              amount={results.optionPrice}
              description="Theoretical option value"
            />
            <ResultCard
              title="Delta"
              amount={results.delta}
              isCurrency={false}
              description="Price change sensitivity"
            />
            <ResultCard
              title="Gamma"
              amount={results.gamma}
              isCurrency={false}
              description="Delta change rate"
            />
            <ResultCard
              title="Theta"
              amount={results.theta}
              isCurrency={false}
              description="Time decay per day"
            />
            <ResultCard
              title="Vega"
              amount={results.vega}
              isCurrency={false}
              description="Volatility sensitivity"
            />
            <ResultCard
              title="Rho"
              amount={results.rho}
              isCurrency={false}
              description="Interest rate sensitivity"
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Greeks Interpretation
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Delta ({results.delta}):</strong> The option price will change by ${Math.abs(results.delta)} 
                  for a $1 change in the underlying stock price.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Gamma ({results.gamma}):</strong> Delta will change by {results.gamma} 
                  for a $1 change in the stock price.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Theta ({results.theta}):</strong> The option loses ${Math.abs(results.theta)} 
                  in value each day due to time decay.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Vega ({results.vega}):</strong> A 1% change in volatility will change 
                  the option price by ${results.vega}.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Rho ({results.rho}):</strong> A 1% change in interest rates will change 
                  the option price by ${results.rho}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};