import React, { useState, useCallback } from 'react';
import { Home } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateMortgagePayment } from '../utils/realEstateCalculators';
import { MortgagePaymentInputs, MortgagePaymentResults } from '../types/realEstateCalculator';

export const MortgagePaymentCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<MortgagePaymentInputs>({
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTax: 3600,
    insurance: 1200,
  });

  const [results, setResults] = useState<MortgagePaymentResults>({
    monthlyPayment: 0,
    monthlyPrincipalInterest: 0,
    monthlyTaxes: 0,
    monthlyInsurance: 0,
    totalPayment: 0,
    totalInterest: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateMortgagePayment(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Mortgage Payment Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your monthly mortgage payments including taxes and insurance
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
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, interestRate: value }))
            }
            min={0}
            max={20}
            step={0.125}
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
          <InputField
            label="Annual Property Tax"
            value={inputs.propertyTax}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, propertyTax: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Annual Insurance"
            value={inputs.insurance}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, insurance: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Payment</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Monthly Payment"
              amount={results.monthlyPayment}
              description="Total monthly payment"
            />
            <ResultCard
              title="Principal & Interest"
              amount={results.monthlyPrincipalInterest}
              description="Monthly principal and interest"
            />
            <ResultCard
              title="Property Tax"
              amount={results.monthlyTaxes}
              description="Monthly property tax"
            />
            <ResultCard
              title="Insurance"
              amount={results.monthlyInsurance}
              description="Monthly insurance"
            />
            <ResultCard
              title="Total Interest"
              amount={results.totalInterest}
              description="Total interest over loan term"
            />
            <ResultCard
              title="Total Payment"
              amount={results.totalPayment}
              description="Total of all payments"
            />
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Payment Breakdown
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: 'Principal & Interest',
                  amount: results.monthlyPrincipalInterest,
                  percentage: (results.monthlyPrincipalInterest / results.monthlyPayment) * 100,
                },
                {
                  label: 'Property Tax',
                  amount: results.monthlyTaxes,
                  percentage: (results.monthlyTaxes / results.monthlyPayment) * 100,
                },
                {
                  label: 'Insurance',
                  amount: results.monthlyInsurance,
                  percentage: (results.monthlyInsurance / results.monthlyPayment) * 100,
                },
              ].map(({ label, amount, percentage }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{label}</span>
                    <span>${amount.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${percentage}%` }}
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