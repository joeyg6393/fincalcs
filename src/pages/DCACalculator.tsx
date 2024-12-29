import React, { useState, useCallback } from 'react';
import { Repeat } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateDCA } from '../utils/stockMarketCalculators';
import { DCAInputs, DCAResults } from '../types/calculator';

export const DCACalculator: React.FC = () => {
  const [inputs, setInputs] = useState<DCAInputs>({
    monthlyInvestment: 500,
    initialPrice: 100,
    priceHistory: [100, 95, 105, 98, 110, 108, 115, 112, 120, 118, 125, 122],
    years: 1,
  });

  const [results, setResults] = useState<DCAResults>({
    totalInvested: 0,
    currentValue: 0,
    totalShares: 0,
    averageCost: 0,
    returnOnInvestment: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateDCA(inputs));
  }, [inputs]);

  const handlePriceChange = (index: number, value: number) => {
    const newPrices = [...inputs.priceHistory];
    newPrices[index] = value;
    setInputs(prev => ({ ...prev, priceHistory: newPrices }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Repeat className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Dollar-Cost Averaging Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate the benefits of regular investing
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Investment Details
          </h2>
          <InputField
            label="Monthly Investment"
            value={inputs.monthlyInvestment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyInvestment: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Initial Share Price"
            value={inputs.initialPrice}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, initialPrice: value }))
            }
            min={0.01}
            step={0.01}
            prefix="$"
          />
          <InputField
            label="Investment Period"
            value={inputs.years}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, years: value }))
            }
            min={1}
            max={5}
            step={1}
            suffix="years"
          />
          
          <h3 className="text-md font-medium text-gray-700 mt-6 mb-4">
            Monthly Share Prices
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {inputs.priceHistory.map((price, index) => (
              <InputField
                key={index}
                label={`Month ${index + 1}`}
                value={price}
                onChange={(value) => handlePriceChange(index, value)}
                min={0.01}
                step={0.01}
                prefix="$"
              />
            ))}
          </div>
          
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Returns</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Total Invested"
              amount={results.totalInvested}
              description="Total amount invested"
            />
            <ResultCard
              title="Current Value"
              amount={results.currentValue}
              description="Current portfolio value"
            />
            <ResultCard
              title="Total Shares"
              amount={results.totalShares}
              isCurrency={false}
              description="Number of shares owned"
            />
            <ResultCard
              title="Average Cost"
              amount={results.averageCost}
              description="Average cost per share"
            />
            <ResultCard
              title="Return on Investment"
              amount={results.returnOnInvestment}
              isCurrency={false}
              suffix="%"
              description="Total return percentage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};