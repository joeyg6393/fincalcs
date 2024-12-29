import React, { useState, useCallback } from 'react';
import { Percent } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateDebtToIncome } from '../utils/calculators';
import { DebtToIncomeInputs, DebtToIncomeResults } from '../types/calculator';

export const DebtToIncomeCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [debts, setDebts] = useState([
    { name: 'Mortgage/Rent', monthlyPayment: 1500 },
    { name: 'Car Payment', monthlyPayment: 400 },
    { name: 'Credit Cards', monthlyPayment: 200 },
  ]);

  const [results, setResults] = useState<DebtToIncomeResults>({
    ratio: 0,
    totalMonthlyDebt: 0,
    status: 'Good',
    recommendations: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateDebtToIncome({ monthlyIncome, debts }));
  }, [monthlyIncome, debts]);

  const updateDebt = (index: number, field: string, value: number) => {
    setDebts(prev => prev.map((debt, i) => 
      i === index ? { ...debt, [field]: value } : debt
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Percent className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Debt-to-Income Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your debt-to-income ratio
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Income Details
            </h2>
            <InputField
              label="Monthly Income"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              min={0}
              step={100}
              prefix="$"
            />
          </div>

          {debts.map((debt, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Debt #{index + 1}
              </h3>
              <InputField
                label="Name"
                value={debt.name}
                onChange={(value) => updateDebt(index, 'name', value)}
                min={0}
              />
              <InputField
                label="Monthly Payment"
                value={debt.monthlyPayment}
                onChange={(value) => updateDebt(index, 'monthlyPayment', value)}
                min={0}
                step={10}
                prefix="$"
              />
            </div>
          ))}
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Ratio</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Debt-to-Income Ratio"
              amount={results.ratio}
              isCurrency={false}
              description="Your DTI percentage"
            />
            <ResultCard
              title="Total Monthly Debt"
              amount={results.totalMonthlyDebt}
              description="Total monthly debt payments"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Status: {results.status}
            </h3>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <p key={index} className="text-gray-600">
                  • {recommendation}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};