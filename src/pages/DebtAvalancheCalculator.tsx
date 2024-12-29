import React, { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateDebtAvalanche } from '../utils/calculators';
import { DebtAvalancheInputs, DebtAvalancheResults } from '../types/calculator';

export const DebtAvalancheCalculator: React.FC = () => {
  const [debts, setDebts] = useState([
    { name: 'Credit Card', balance: 5000, interestRate: 18.9, minimumPayment: 150 },
    { name: 'Car Loan', balance: 15000, interestRate: 5.5, minimumPayment: 300 },
    { name: 'Personal Loan', balance: 8000, interestRate: 12, minimumPayment: 200 },
  ]);

  const [additionalPayment, setAdditionalPayment] = useState(200);
  const [results, setResults] = useState<DebtAvalancheResults>({
    totalMonths: 0,
    totalInterest: 0,
    totalPayment: 0,
    payoffSchedule: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateDebtAvalanche({ debts, additionalPayment }));
  }, [debts, additionalPayment]);

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
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Debt Avalanche Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Optimize debt payoff with the avalanche method
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
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
                label="Balance"
                value={debt.balance}
                onChange={(value) => updateDebt(index, 'balance', value)}
                min={0}
                step={100}
                prefix="$"
              />
              <InputField
                label="Interest Rate"
                value={debt.interestRate}
                onChange={(value) => updateDebt(index, 'interestRate', value)}
                min={0}
                max={100}
                step={0.1}
                suffix="%"
              />
              <InputField
                label="Minimum Payment"
                value={debt.minimumPayment}
                onChange={(value) => updateDebt(index, 'minimumPayment', value)}
                min={0}
                step={10}
                prefix="$"
              />
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-md p-6">
            <InputField
              label="Additional Monthly Payment"
              value={additionalPayment}
              onChange={setAdditionalPayment}
              min={0}
              step={50}
              prefix="$"
            />
            <div className="mt-6">
              <Button onClick={handleCalculate}>Calculate Avalanche</Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Months"
              amount={results.totalMonths}
              isCurrency={false}
              description="Time to pay off all debts"
            />
            <ResultCard
              title="Total Interest"
              amount={results.totalInterest}
              description="Total interest paid"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Payoff Schedule
            </h3>
            <div className="space-y-4">
              {results.payoffSchedule.map((schedule, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{schedule.debtName}</span>
                    <span>{schedule.payoffMonth} months</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Interest paid: ${schedule.interestPaid.toLocaleString()}
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