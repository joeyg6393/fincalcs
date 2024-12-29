import React, { useState, useCallback } from 'react';
import { GitBranch } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCorrelation } from '../utils/portfolioCalculators';
import { CorrelationInputs, CorrelationResults } from '../types/calculator';

export const CorrelationCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CorrelationInputs>({
    asset1Returns: [2.5, -1.8, 3.2, -0.5, 1.7],
    asset2Returns: [1.8, -1.2, 2.5, 0.3, 1.1],
    period: 'monthly',
  });

  const [results, setResults] = useState<CorrelationResults>({
    correlation: 0,
    rSquared: 0,
    covariance: 0,
    significance: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCorrelation(inputs));
  }, [inputs]);

  const handleAsset1ReturnChange = (index: number, value: number) => {
    const newReturns = [...inputs.asset1Returns];
    newReturns[index] = value;
    setInputs(prev => ({ ...prev, asset1Returns: newReturns }));
  };

  const handleAsset2ReturnChange = (index: number, value: number) => {
    const newReturns = [...inputs.asset2Returns];
    newReturns[index] = value;
    setInputs(prev => ({ ...prev, asset2Returns: newReturns }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <GitBranch className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Correlation Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate correlation between assets
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Return Data
          </h2>
          
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

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-4">
                Asset 1 Returns (%)
              </h3>
              {inputs.asset1Returns.map((return_, index) => (
                <InputField
                  key={index}
                  label={`Period ${index + 1}`}
                  value={return_}
                  onChange={(value) => handleAsset1ReturnChange(index, value)}
                  step={0.1}
                  suffix="%"
                />
              ))}
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-4">
                Asset 2 Returns (%)
              </h3>
              {inputs.asset2Returns.map((return_, index) => (
                <InputField
                  key={index}
                  label={`Period ${index + 1}`}
                  value={return_}
                  onChange={(value) => handleAsset2ReturnChange(index, value)}
                  step={0.1}
                  suffix="%"
                />
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Correlation</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Correlation"
              amount={results.correlation}
              isCurrency={false}
              description="Correlation coefficient (-1 to 1)"
            />
            <ResultCard
              title="R-Squared"
              amount={results.rSquared}
              isCurrency={false}
              suffix="%"
              description="Strength of relationship"
            />
            <ResultCard
              title="Covariance"
              amount={results.covariance}
              isCurrency={false}
              description="Measure of joint variability"
            />
            <ResultCard
              title="Statistical Significance"
              amount={results.significance}
              isCurrency={false}
              suffix="%"
              description="Confidence in correlation"
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Correlation Interpretation
            </h3>
            <div className="space-y-4">
              {results.correlation > 0.7 && (
                <p className="text-gray-600">
                  Strong positive correlation: The assets tend to move in the same direction
                </p>
              )}
              {results.correlation < -0.7 && (
                <p className="text-gray-600">
                  Strong negative correlation: The assets tend to move in opposite directions
                </p>
              )}
              {Math.abs(results.correlation) <= 0.7 && Math.abs(results.correlation) >= 0.3 && (
                <p className="text-gray-600">
                  Moderate correlation: Some relationship exists between the assets
                </p>
              )}
              {Math.abs(results.correlation) < 0.3 && (
                <p className="text-gray-600">
                  Weak correlation: Little to no relationship between the assets
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};