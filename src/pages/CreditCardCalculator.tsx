import React, { useState, useCallback } from 'react';
import { CreditCard } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateCreditCard } from '../utils/calculators';
import { CreditCardInputs, CreditCardResults } from '../types/calculator';

export const CreditCardCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CreditCardInputs>({
    balance: 10000,
    interestRate: 18.9,
    monthlyPayment: 300,
    additionalPayment: 0,
  });

  const [results, setResults] = useState<CreditCardResults>({
    monthsToPayoff: 0,
    totalInterest: 0,
    totalPayment: 0,
    payoffDate: new Date(),
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateCreditCard(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Credit Card Payoff Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Plan your credit card debt payoff strategy
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Credit Card Details
          </h2>
          <InputField
            label="Current Balance"
            value={inputs.balance}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, balance: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Interest Rate (APR)"
            value={inputs.interestRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, interestRate: value }))
            }
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Monthly Payment"
            value={inputs.monthlyPayment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, monthlyPayment: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <InputField
            label="Additional Payment"
            value={inputs.additionalPayment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, additionalPayment: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Payoff</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Months to Payoff"
            amount={results.monthsToPayoff}
            isCurrency={false}
            description={`Payoff date: ${results.payoffDate.toLocaleDateString()}`}
          />
          <ResultCard
            title="Total Interest"
            amount={results.totalInterest}
            description="Total interest you will pay"
          />
          <ResultCard
            title="Monthly Payment"
            amount={inputs.monthlyPayment + inputs.additionalPayment}
            description="Your total monthly payment"
          />
          <ResultCard
            title="Total Payment"
            amount={results.totalPayment}
            description="Total amount you will pay"
          />
        </div>
      </div>
    </div>
  );
};