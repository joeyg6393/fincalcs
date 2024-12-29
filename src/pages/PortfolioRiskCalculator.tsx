import React, { useState, useCallback } from 'react';
import { AlertTriangle } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculatePortfolioRisk } from '../utils/portfolioCalculators';
import { PortfolioRiskInputs, PortfolioRiskResults } from '../types/calculator';

export const PortfolioRiskCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<PortfolioRiskInputs>({
    assets: [
      { name: 'Stock A', weight: 40, returns: [12, -5, 8, -2, 15] },
      { name: 'Stock B', weight: 30, returns: [8, -3, 10, 4, 7] },
      { name: 'Bond Fund', weight: 30, returns: [4, 3, 5, 4, 3] },
    ],
    riskFreeRate: 2.5,
  });

  const [results, setResults] = useState<PortfolioRiskResults>({
    portfolioReturn: 0,
    portfolioRisk: 0,
    sharpeRatio: 0,
    varFivePercent: 0,
    maxDrawdown: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculatePortfolioRisk(inputs));
  }, [inputs]);

  const handleAssetChange = (index: number, field: string, value: number | number[]) => {
    const newAssets = [...inputs.assets];
    if (field === 'weight') {
      newAssets[index] = { ...newAssets[index], weight: value as number };
    } else if (field === 'returns') {
      newAssets[index] = { ...newAssets[index], returns: value as number[] };
    }
    setInputs(prev => ({ ...prev, assets: newAssets }));
  };

  const handleReturnChange = (assetIndex: number, returnIndex: number, value: number) => {
    const newAssets = [...inputs.assets];
    const newReturns = [...newAssets[assetIndex].returns];
    newReturns[returnIndex] = value;
    newAssets[assetIndex] = { ...newAssets[assetIndex], returns: newReturns };
    setInputs(prev => ({ ...prev, assets: newAssets }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <AlertTriangle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Portfolio Risk Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Analyze portfolio risk metrics and performance measures
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Portfolio Settings
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
          </div>

          {inputs.assets.map((asset, assetIndex) => (
            <div key={assetIndex} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {asset.name}
              </h3>
              <InputField
                label="Portfolio Weight"
                value={asset.weight}
                onChange={(value) => handleAssetChange(assetIndex, 'weight', value)}
                min={0}
                max={100}
                step={1}
                suffix="%"
              />
              <h4 className="text-md font-medium text-gray-700 mt-4 mb-2">
                Historical Returns (%)
              </h4>
              {asset.returns.map((return_, returnIndex) => (
                <InputField
                  key={returnIndex}
                  label={`Period ${returnIndex + 1}`}
                  value={return_}
                  onChange={(value) => handleReturnChange(assetIndex, returnIndex, value)}
                  step={0.1}
                  suffix="%"
                />
              ))}
            </div>
          ))}

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Risk Metrics</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Portfolio Return"
              amount={results.portfolioReturn}
              isCurrency={false}
              suffix="%"
              description="Expected annual return"
            />
            <ResultCard
              title="Portfolio Risk"
              amount={results.portfolioRisk}
              isCurrency={false}
              suffix="%"
              description="Annual volatility"
            />
            <ResultCard
              title="Sharpe Ratio"
              amount={results.sharpeRatio}
              isCurrency={false}
              description="Risk-adjusted return measure"
            />
            <ResultCard
              title="Value at Risk (95%)"
              amount={results.varFivePercent}
              isCurrency={false}
              suffix="%"
              description="Potential loss threshold"
            />
            <ResultCard
              title="Maximum Drawdown"
              amount={results.maxDrawdown}
              isCurrency={false}
              suffix="%"
              description="Largest peak-to-trough decline"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Risk Interpretation
            </h3>
            <div className="space-y-4">
              {results.portfolioRisk > 20 && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
                  <p className="ml-2 text-gray-600">
                    High volatility detected. Consider diversifying into less correlated assets.
                  </p>
                </div>
              )}
              {results.sharpeRatio < 0.5 && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
                  <p className="ml-2 text-gray-600">
                    Low risk-adjusted returns. Review asset allocation for better risk/reward balance.
                  </p>
                </div>
              )}
              {results.maxDrawdown > 30 && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
                  <p className="ml-2 text-gray-600">
                    Large maximum drawdown indicates significant downside risk.
                  </p>
                </div>
              )}
              {results.varFivePercent > 15 && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-red-500">•</span>
                  <p className="ml-2 text-gray-600">
                    High Value at Risk suggests potential for significant losses.
                  </p>
                </div>
              )}
              {results.portfolioRisk <= 20 && results.sharpeRatio >= 0.5 && 
               results.maxDrawdown <= 30 && results.varFivePercent <= 15 && (
                <div className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                  <p className="ml-2 text-gray-600">
                    Portfolio risk metrics are within reasonable ranges.
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