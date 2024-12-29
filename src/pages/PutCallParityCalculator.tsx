import React, { useState, useCallback } from 'react';
import { Scale } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculatePutCallParity } from '../utils/optionsCalculators';
import { PutCallParityInputs, PutCallParityResults } from '../types/calculator';

export const PutCallParityCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<PutCallParityInputs>({
    callPrice: 5,
    putPrice: 3,
    stockPrice: 100,
    strikePrice: 100,
    riskFreeRate: 2.5,
    timeToExpiry: 1,
  });

  const [results, setResults] = useState<PutCallParityResults>({
    parityValue: 0,
    deviation: 0,
    arbitrageOpportunity: false,
    recommendedAction: '',
  });

  const handleCalculate = useCallback(() => {
    setResults(calculatePutCallParity(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Put-Call Parity Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Verify put-call parity relationships and identify arbitrage opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Option Details
          </h2>
          <InputField
            label="Call Option Price"
            value={inputs.callPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, callPrice: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Put Option Price"
            value={inputs.putPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, putPrice: value }))
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
          <div className="mt-6">
            <Button onClick={handleCalculate}>Check Parity</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Parity Value"
              amount={results.parityValue}
              description="Deviation from theoretical value"
            />
            <ResultCard
              title="Absolute Deviation"
              amount={results.deviation}
              description="Magnitude of price discrepancy"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Arbitrage Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className={`flex-shrink-0 h-5 w-5 ${
                  results.arbitrageOpportunity ? 'text-green-500' : 'text-blue-500'
                }`}>•</span>
                <div className="ml-2">
                  <p className="text-gray-900 font-medium mb-2">
                    {results.arbitrageOpportunity
                      ? 'Arbitrage Opportunity Detected'
                      : 'No Significant Arbitrage Opportunity'}
                  </p>
                  <p className="text-gray-600">
                    {results.recommendedAction}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Put-Call Parity Formula
                </h4>
                <p className="text-sm text-gray-600">
                  Call Price - Put Price = Stock Price - Present Value of Strike Price
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  A significant deviation from zero indicates a potential arbitrage opportunity.
                </p>
              </div>

              {results.arbitrageOpportunity && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900 mb-2">
                    Trading Strategy
                  </h4>
                  <p className="text-sm text-green-700">
                    {results.parityValue > 0
                      ? 'Long arbitrage: Buy stock and put option, sell call option and bonds'
                      : 'Short arbitrage: Sell stock and put option, buy call option and bonds'}
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