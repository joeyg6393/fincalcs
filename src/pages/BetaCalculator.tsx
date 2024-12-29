import React, { useState, useCallback } from 'react';
import { LineChart } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateBeta } from '../utils/stockMarketCalculators';
import { BetaInputs, BetaResults } from '../types/calculator';

export const BetaCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BetaInputs>({
    stockReturns: [2.5, -1.8, 3.2, -0.5, 1.7],
    marketReturns: [1.8, -1.2, 2.5, 0.3, 1.1],
    riskFreeRate: 2.5,
  });

  const [results, setResults] = useState<BetaResults>({
    beta: 0,
    correlation: 0,
    rSquared: 0,
    standardDeviation: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateBeta(inputs));
  }, [inputs]);

  const handleStockReturnChange = (index: number, value: number) => {
    const newReturns = [...inputs.stockReturns];
    newReturns[index] = value;
    setInputs(prev => ({ ...prev, stockReturns: newReturns }));
  };

  const handleMarketReturnChange = (index: number, value: number) => {
    const newReturns = [...inputs.marketReturns];
    newReturns[index] = value;
    setInputs(prev => ({ ...prev, marketReturns: newReturns }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <LineChart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Beta Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate stock beta and volatility metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Return Data
          </h2>
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
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-4">
                Stock Returns (%)
              </h3>
              {inputs.stockReturns.map((return_, index) => (
                <InputField
                  key={index}
                  label={`Period ${index + 1}`}
                  value={return_}
                  onChange={(value) => handleStockReturnChange(index, value)}
                  step={0.1}
                  suffix="%"
                />
              ))}
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-4">
                Market Returns (%)
              </h3>
              {inputs.marketReturns.map((return_, index) => (
                <InputField
                  key={index}
                  label={`Period ${index + 1}`}
                  value={return_}
                  onChange={(value) => handleMarketReturnChange(index, value)}
                  step={0.1}
                  suffix="%"
                />
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Beta</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Beta"
            amount={results.beta}
            isCurrency={false}
            description="Stock's volatility relative to market"
          />
          <ResultCard
            title="Correlation"
            amount={results.correlation}
            isCurrency={false}
            description="Correlation with market"
          />
          <ResultCard
            title="R-Squared"
            amount={results.rSquared}
            isCurrency={false}
            suffix="%"
            description="Percentage of variance explained"
          />
          <ResultCard
            title="Standard Deviation"
            amount={results.standardDeviation}
            isCurrency={false}
            suffix="%"
            description="Stock's volatility"
          />
        </div>
      </div>
    </div>
  );
};