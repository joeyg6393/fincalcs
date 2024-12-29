import React, { useState, useCallback } from 'react';
import { Receipt } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateTaxWithholding } from '../utils/incomeCalculators';
import { TaxWithholdingInputs, TaxWithholdingResults } from '../types/calculator';

export const TaxWithholdingCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<TaxWithholdingInputs>({
    annualSalary: 75000,
    filingStatus: 'single',
    allowances: 2,
    state: 'CA',
    additionalWithholding: 0,
  });

  const [results, setResults] = useState<TaxWithholdingResults>({
    federalWithholding: 0,
    stateWithholding: 0,
    socialSecurity: 0,
    medicare: 0,
    totalWithholding: 0,
    netPay: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateTaxWithholding(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Receipt className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Tax Withholding Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Estimate your paycheck tax withholdings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Income Details
          </h2>
          <InputField
            label="Annual Salary"
            value={inputs.annualSalary}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, annualSalary: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Allowances"
            value={inputs.allowances}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, allowances: value }))
            }
            min={0}
            max={10}
            step={1}
          />
          <InputField
            label="Additional Withholding"
            value={inputs.additionalWithholding}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, additionalWithholding: value }))
            }
            min={0}
            step={50}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Withholding</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Federal Withholding"
            amount={results.federalWithholding}
            description="Monthly federal tax withholding"
          />
          <ResultCard
            title="State Withholding"
            amount={results.stateWithholding}
            description="Monthly state tax withholding"
          />
          <ResultCard
            title="Social Security"
            amount={results.socialSecurity}
            description="Monthly Social Security tax"
          />
          <ResultCard
            title="Medicare"
            amount={results.medicare}
            description="Monthly Medicare tax"
          />
          <ResultCard
            title="Total Withholding"
            amount={results.totalWithholding}
            description="Total monthly tax withholding"
          />
          <ResultCard
            title="Net Pay"
            amount={results.netPay}
            description="Monthly take-home pay"
          />
        </div>
      </div>
    </div>
  );
};