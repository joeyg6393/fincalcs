import React, { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateStockReturn } from '../utils/stockMarketCalculators';
import { StockReturnInputs, StockReturnResults } from '../types/calculator';

export const StockReturnCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<StockReturnInputs>({
    initialPrice: 100,
    finalPrice: 150,
    dividends: [2, 2.1, 2.2, 2.3],
    holdingPeriod: 4,
  });

  const [results, setResults] = useState<StockReturnResults>({
    totalReturn: 0,
    annualizedReturn: 0,
    capitalGains: 0,
    dividendIncome: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateStockReturn(inputs));
  }, [inputs]);

  const handleDividendChange = (index: number, value: number) => {
    const newDividends = [...inputs.dividends];
    newDividends[index] = value;
    setInputs(prev => ({ ...prev, dividends: newDividends }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Stock Return Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate total returns including dividends and capital gains
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Stock Details
          </h2>
          <InputField
            label="Initial Stock Price"
            value={inputs.initialPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, initialPrice: value }))
            }
            min={0}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Final Stock Price"
            value={inputs.finalPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, finalPrice: value }))
            }
            min={0}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Holding Period"
            value={inputs.holdingPeriod}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, holdingPeriod: value }))
            }
            min={1}
            step={1}
            suffix="years"
          />
          
          <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">
            Annual Dividends
          </h3>
          {inputs.dividends.map((dividend, index) => (
            <InputField
              key={index}
              label={`Year ${index + 1} Dividend`}
              value={dividend}
              onChange={(value) => handleDividendChange(index, value)}
              min={0}
              step={0.01}
              prefix="$"
            />
          ))}
          
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Returns</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Total Return"
            amount={results.totalReturn}
            description="Total profit/loss including dividends"
          />
          <ResultCard
            title="Annualized Return"
            amount={results.annualizedReturn}
            isCurrency={false}
            description="Average yearly return (%)"
            suffix="%"
          />
          <ResultCard
            title="Capital Gains"
            amount={results.capitalGains}
            description="Profit/loss from price change"
          />
          <ResultCard
            title="Dividend Income"
            amount={results.dividendIncome}
            description="Total dividends received"
          />
        </div>
      </div>
    </div>
  );
};