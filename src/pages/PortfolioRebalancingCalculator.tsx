import React, { useState, useCallback } from 'react';
import { RefreshCcw } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculatePortfolioRebalancing } from '../utils/portfolioCalculators';
import { PortfolioRebalancingInputs, PortfolioRebalancingResults } from '../types/calculator';

export const PortfolioRebalancingCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<PortfolioRebalancingInputs>({
    targetAllocations: {
      stocks: 60,
      bonds: 30,
      cash: 10,
    },
    currentHoldings: {
      stocks: { value: 70000, price: 100 },
      bonds: { value: 30000, price: 1000 },
      cash: { value: 8000, price: 1 },
    },
  });

  const [results, setResults] = useState<PortfolioRebalancingResults>({
    trades: [],
    newAllocations: {},
    totalValue: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculatePortfolioRebalancing(inputs));
  }, [inputs]);

  const handleTargetChange = (asset: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      targetAllocations: {
        ...prev.targetAllocations,
        [asset]: value,
      },
    }));
  };

  const handleValueChange = (asset: string, value: number) => {
    setInputs(prev => ({
      ...prev,
      currentHoldings: {
        ...prev.currentHoldings,
        [asset]: {
          ...prev.currentHoldings[asset],
          value,
        },
      },
    }));
  };

  const handlePriceChange = (asset: string, price: number) => {
    setInputs(prev => ({
      ...prev,
      currentHoldings: {
        ...prev.currentHoldings,
        [asset]: {
          ...prev.currentHoldings[asset],
          price,
        },
      },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <RefreshCcw className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Portfolio Rebalancing Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate rebalancing adjustments for your portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Target Allocations
            </h2>
            {Object.entries(inputs.targetAllocations).map(([asset, target]) => (
              <InputField
                key={asset}
                label={`${asset.charAt(0).toUpperCase() + asset.slice(1)} Target`}
                value={target}
                onChange={(value) => handleTargetChange(asset, value)}
                min={0}
                max={100}
                step={1}
                suffix="%"
              />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Current Holdings
            </h2>
            {Object.entries(inputs.currentHoldings).map(([asset, holding]) => (
              <div key={asset} className="space-y-4 mb-6">
                <h3 className="text-md font-medium text-gray-700">
                  {asset.charAt(0).toUpperCase() + asset.slice(1)}
                </h3>
                <InputField
                  label="Current Value"
                  value={holding.value}
                  onChange={(value) => handleValueChange(asset, value)}
                  min={0}
                  step={100}
                  prefix="$"
                />
                <InputField
                  label="Price per Unit"
                  value={holding.price}
                  onChange={(value) => handlePriceChange(asset, value)}
                  min={0.01}
                  step={0.01}
                  prefix="$"
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Rebalancing</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Required Trades
            </h3>
            <div className="space-y-4">
              {results.trades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className={`font-medium ${
                      trade.action === 'buy' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trade.action.toUpperCase()}
                    </span>
                    <span className="ml-2 text-gray-600">
                      {trade.shares} shares of {trade.asset}
                    </span>
                  </div>
                  <span className="font-medium">
                    ${trade.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              New Allocations
            </h3>
            <div className="space-y-4">
              {Object.entries(results.newAllocations).map(([asset, allocation]) => (
                <div key={asset}>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="capitalize">{asset}</span>
                    <span>{allocation}%</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${allocation}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};