import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateInterestOnly } from '../utils/realEstateCalculators';
import { InterestOnlyInputs, InterestOnlyResults } from '../types/realEstateCalculator';

export const InterestOnlyCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<InterestOnlyInputs>({
    loanAmount: 300000,
    interestRate: 4.5,
    interestOnlyPeriod: 10,
    loanTerm: 30,
    propertyValue: 375000,
    propertyAppreciation: 3,
  });

  const [results, setResults] = useState<InterestOnlyResults>({
    interestOnlyPayment: 0,
    principalAndInterestPayment: 0,
    totalInterest: 0,
    paymentIncrease: 0,
    equityAfterIO: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateInterestOnly(inputs));
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
          Interest-Only Loan Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Compare interest-only and traditional mortgage payments
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
            label="Interest-Only Period"
            value={inputs.interestOnlyPeriod}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, interestOnlyPeriod: value }))
            }
            min={1}
            max={10}
            step={1}
            suffix="years"
          />
          <InputField
            label="Total Loan Term"
            value={inputs.loanTerm}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, loanTerm: value }))
            }
            min={inputs.interestOnlyPeriod}
            max={50}
            step={1}
            suffix="years"
          />
          <InputField
            label="Property Value"
            value={inputs.propertyValue}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, propertyValue: value }))
            }
            min={inputs.loanAmount}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Annual Appreciation"
            value={inputs.propertyAppreciation}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, propertyAppreciation: value }))
            }
            min={-10}
            max={20}
            step={0.1}
            suffix="%"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Payments</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Interest-Only Payment"
              amount={results.interestOnlyPayment}
              description="Monthly payment during I/O period"
            />
            <ResultCard
              title="Full Payment"
              amount={results.principalAndInterestPayment}
              description="Payment after I/O period"
            />
            <ResultCard
              title="Payment Increase"
              amount={results.paymentIncrease}
              description="Monthly payment increase"
            />
            <ResultCard
              title="Total Interest"
              amount={results.totalInterest}
              description="Total interest over loan term"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Equity Analysis
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Equity After Interest-Only Period
                </h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${results.equityAfterIO.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    projected equity after {inputs.interestOnlyPeriod} years
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Important Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                    Payment will increase significantly after I/O period
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                    No equity built through principal payments during I/O period
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                    Equity growth relies solely on property appreciation
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                    Consider your long-term financial goals and ability to handle payment increases
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};