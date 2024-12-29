import React, { useState, useCallback } from 'react';
import { Shield } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCoveredCall } from '../utils/optionsCalculators';
import { CoveredCallInputs, CoveredCallResults } from '../types/calculator';

export const CoveredCallCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CoveredCallInputs>({
    stockPrice: 100,
    strikePrice: 105,
    premium: 3,
    contracts: 1,
    daysToExpiry: 30,
  });

  const [results, setResults] = useState<CoveredCallResults>({
    maxProfit: 0,
    maxLoss: 0,
    breakeven: 0,
    returnIfUnchanged: 0,
    annualizedReturn: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCoveredCall(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Covered Call Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Analyze covered call strategies and potential returns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Position Details
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
            label="Option Premium"
            value={inputs.premium}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, premium: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Number of Contracts"
            value={inputs.contracts}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, contracts: value }))
            }
            min={1}
            step={1}
          />
          <InputField
            label="Days to Expiry"
            value={inputs.daysToExpiry}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, daysToExpiry: value }))
            }
            min={1}
            max={365}
            step={1}
            suffix="days"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Returns</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Maximum Profit"
              amount={results.maxProfit}
              description="Best case scenario profit"
            />
            <ResultCard
              title="Maximum Loss"
              amount={results.maxLoss}
              description="Worst case scenario loss"
            />
            <ResultCard
              title="Breakeven Price"
              amount={results.breakeven}
              description="Stock price needed to break even"
            />
            <ResultCard
              title="Static Return"
              amount={results.returnIfUnchanged}
              isCurrency={false}
              suffix="%"
              description="Return if stock price unchanged"
            />
            <ResultCard
              title="Annualized Return"
              amount={results.annualizedReturn}
              isCurrency={false}
              suffix="%"
              description="Return on an annual basis"
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Strategy Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Maximum Profit:</strong> Achieved if the stock price is at or above the 
                  strike price at expiration. Limited to the premium received plus any appreciation 
                  up to the strike price.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Maximum Loss:</strong> Occurs if the stock price falls to zero. The premium 
                  received provides some downside protection.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Breakeven Analysis:</strong> The stock price needs to stay above ${results.breakeven} 
                  to avoid a loss, which is the original purchase price minus the premium received.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
                <p className="ml-2 text-gray-600">
                  <strong>Return Potential:</strong> If the stock remains unchanged, you'll earn 
                  a {results.returnIfUnchanged.toFixed(2)}% return, or {results.annualizedReturn.toFixed(2)}% 
                  on an annualized basis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};