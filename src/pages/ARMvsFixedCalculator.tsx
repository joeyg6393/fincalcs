import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateARMvsFixed } from '../utils/realEstateCalculators';
import { ARMvsFixedInputs, ARMvsFixedResults } from '../types/realEstateCalculator';

export const ARMvsFixedCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ARMvsFixedInputs>({
    loanAmount: 300000,
    fixedRate: 4.5,
    initialARMRate: 3.5,
    adjustmentPeriod: 5,
    rateAdjustmentCap: 2,
    lifetimeCap: 5,
    loanTerm: 30,
    expectedRateIncrease: 1,
  });

  const [results, setResults] = useState<ARMvsFixedResults>({
    fixedMonthlyPayment: 0,
    initialARMPayment: 0,
    maxARMPayment: 0,
    fixedTotalCost: 0,
    armTotalCost: 0,
    breakEvenYear: 0,
    yearByYear: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateARMvsFixed(inputs));
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
          ARM vs. Fixed Rate Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Compare adjustable and fixed-rate mortgages
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
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
              label="Fixed Rate"
              value={inputs.fixedRate}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, fixedRate: value }))
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
              min={10}
              max={50}
              step={1}
              suffix="years"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              ARM Details
            </h2>
            <InputField
              label="Initial ARM Rate"
              value={inputs.initialARMRate}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, initialARMRate: value }))
              }
              min={0}
              max={20}
              step={0.125}
              suffix="%"
            />
            <InputField
              label="Adjustment Period"
              value={inputs.adjustmentPeriod}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, adjustmentPeriod: value }))
              }
              min={1}
              max={10}
              step={1}
              suffix="years"
            />
            <InputField
              label="Rate Adjustment Cap"
              value={inputs.rateAdjustmentCap}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, rateAdjustmentCap: value }))
              }
              min={0}
              max={10}
              step={0.125}
              suffix="%"
            />
            <InputField
              label="Lifetime Cap"
              value={inputs.lifetimeCap}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, lifetimeCap: value }))
              }
              min={0}
              max={15}
              step={0.125}
              suffix="%"
            />
            <InputField
              label="Expected Rate Increase"
              value={inputs.expectedRateIncrease}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, expectedRateIncrease: value }))
              }
              min={0}
              max={5}
              step={0.125}
              suffix="%"
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Compare Loans</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Fixed Monthly Payment"
              amount={results.fixedMonthlyPayment}
              description="Consistent monthly payment"
            />
            <ResultCard
              title="Initial ARM Payment"
              amount={results.initialARMPayment}
              description="Starting monthly payment"
            />
            <ResultCard
              title="Maximum ARM Payment"
              amount={results.maxARMPayment}
              description="Highest possible payment"
            />
            <ResultCard
              title="Break-Even Year"
              amount={results.breakEvenYear}
              isCurrency={false}
              description="When ARM total cost exceeds fixed"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Year by Year Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Year
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      ARM Rate
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      ARM Payment
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Fixed Payment
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.yearByYear.map((year) => (
                    <tr key={year.year}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        Year {year.year}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {year.armRate}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${year.armPayment.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${year.fixedPayment.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                        year.armPayment < year.fixedPayment ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${Math.abs(year.armPayment - year.fixedPayment).toLocaleString()}
                        {year.armPayment < year.fixedPayment ? ' saved' : ' extra'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Analysis & Recommendations
            </h3>
            <div className="space-y-4">
              {results.initialARMPayment < results.fixedMonthlyPayment && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Initial ARM payment is ${(results.fixedMonthlyPayment - results.initialARMPayment).toLocaleString()} 
                    lower than fixed-rate payment
                  </p>
                </div>
              )}
              {results.maxARMPayment > results.fixedMonthlyPayment && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p className="text-gray-600">
                    ARM payment could increase up to ${(results.maxARMPayment - results.fixedMonthlyPayment).toLocaleString()} 
                    above fixed-rate payment
                  </p>
                </div>
              )}
              {results.breakEvenYear < 7 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                  <p className="text-gray-600">
                    ARM becomes more expensive than fixed-rate after only {results.breakEvenYear} years
                  </p>
                </div>
              )}
              <div className="flex items-start">
                <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                <p className="text-gray-600">
                  {results.breakEvenYear <= 5
                    ? 'Fixed-rate mortgage recommended for long-term stability'
                    : results.breakEvenYear <= 10
                    ? 'ARM could be beneficial if you plan to move or refinance within 5-7 years'
                    : 'ARM offers significant savings if you can handle potential payment increases'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};