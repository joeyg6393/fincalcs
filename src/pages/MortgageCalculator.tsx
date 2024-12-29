import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateMortgage } from '../utils/mortgageCalculator';
import { MortgageInputs, MortgageResults } from '../types/calculator';

export const MortgageCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<MortgageInputs>({
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30,
    downPayment: 60000,
  });

  const [results, setResults] = useState<MortgageResults>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    principalAmount: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateMortgage(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Mortgage Loan Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your monthly mortgage payments and see detailed breakdown
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Loan Details
          </h2>
          <InputField
            label="Loan Amount"
            value={inputs.loanAmount}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, loanAmount: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Down Payment"
            value={inputs.downPayment}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, downPayment: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Interest Rate"
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
            label="Loan Term"
            value={inputs.loanTerm}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, loanTerm: value }))
            }
            min={1}
            max={50}
            step={1}
            suffix="years"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Payment</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Monthly Payment"
            amount={results.monthlyPayment}
            description="Your estimated monthly mortgage payment"
          />
          <ResultCard
            title="Principal Amount"
            amount={results.principalAmount}
            description="Loan amount after down payment"
          />
          <ResultCard
            title="Total Interest"
            amount={results.totalInterest}
            description="Total interest paid over loan term"
          />
          <ResultCard
            title="Total Payment"
            amount={results.totalPayment}
            description="Total amount paid over loan term"
          />
        </div>
      </div>
    </div>
  );
};