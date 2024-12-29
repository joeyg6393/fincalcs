import React, { useState, useCallback } from 'react';
import { Activity } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateSharpeRatio } from '../utils/portfolioCalculators';
import { SharpeRatioInputs, SharpeRatioResults } from '../types/calculator';

export const SharpeRatioCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SharpeRatioInputs>({
    returns: [12.5, -5.2, 8.7, -2.1, 15.3],
    riskFreeRate: 2.5,
    period: 'monthly',
  });

  const [results, setResults] = useState<SharpeRatioResults>({
    sharpeRatio: 0,
    excessReturn: 0,
    standardDeviation: 0,
    annualizedSharpe: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateSharpeRatio(inputs));
  }, [inputs]);

  const handleReturnChange = (index: number, value: number) => {
    const newReturns = [...inputs.returns];
    newReturns[index] = value;
    setInputs(prev => ({ ...prev, returns: newReturns }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Sharpe Ratio Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate risk-adjusted returns
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
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Period
            </label>
            <select
              value={inputs.period}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  period: e.target.value as 'daily' | 'monthly' | 'annual',
                }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">
            Return History (%)
          </h3>
          {inputs.returns.map((return_, index) => (
            <InputField
              key={index}
              label={`Period ${index + 1}`}
              value={return_}
              onChange={(value) => handleReturnChange(index, value)}
              step={0.1}
              suffix="%"
            />
          ))}
          
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Ratio</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Sharpe Ratio"
            amount={results.sharpeRatio}
            isCurrency={false}
            description="Risk-adjusted return measure"
          />
          <ResultCard
            title="Annualized Sharpe"
            amount={results.annualizedSharpe}
            isCurrency={false}
            description="Annualized risk-adjusted return"
          />
          <ResultCard
            title="Excess Return"
            amount={results.excessReturn}
            isCurrency={false}
            suffix="%"
            description="Return above risk-free rate"
          />
          <ResultCard
            title="Standard Deviation"
            amount={results.standardDeviation}
            isCurrency={false}
            suffix="%"
            description="Portfolio volatility"
          />
        </div>
      </div>
    </div>
  );
};