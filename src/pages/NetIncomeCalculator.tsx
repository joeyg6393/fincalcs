import React, { useState, useCallback } from 'react';
import { DollarSign } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateNetIncome } from '../utils/incomeCalculators';
import { NetIncomeInputs, NetIncomeResults } from '../types/calculator';

export const NetIncomeCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<NetIncomeInputs>({
    grossIncome: 75000,
    payFrequency: 'monthly',
    filingStatus: 'single',
    allowances: 2,
    state: 'CA',
    retirement401k: 5,
    healthInsurance: 200,
    otherDeductions: 0,
  });

  const [results, setResults] = useState<NetIncomeResults>({
    grossPay: 0,
    federalTax: 0,
    stateTax: 0,
    socialSecurity: 0,
    medicare: 0,
    retirement401k: 0,
    healthInsurance: 0,
    otherDeductions: 0,
    netPay: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateNetIncome(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Net Income Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your take-home pay after taxes and deductions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Income & Deductions
          </h2>
          <InputField
            label="Gross Annual Income"
            value={inputs.grossIncome}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, grossIncome: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="401(k) Contribution"
            value={inputs.retirement401k}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, retirement401k: value }))
            }
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Health Insurance"
            value={inputs.healthInsurance}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, healthInsurance: value }))
            }
            min={0}
            step={10}
            prefix="$"
          />
          <InputField
            label="Other Monthly Deductions"
            value={inputs.otherDeductions}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, otherDeductions: value }))
            }
            min={0}
            step={10}
            prefix="$"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Net Income</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Gross Monthly Pay"
              amount={results.grossPay}
              description="Before taxes and deductions"
            />
            <ResultCard
              title="Net Monthly Pay"
              amount={results.netPay}
              description="Your take-home pay"
            />
            <ResultCard
              title="Federal Tax"
              amount={results.federalTax}
              description="Monthly federal income tax"
            />
            <ResultCard
              title="State Tax"
              amount={results.stateTax}
              description="Monthly state income tax"
            />
            <ResultCard
              title="FICA Taxes"
              amount={results.socialSecurity + results.medicare}
              description="Social Security and Medicare"
            />
            <ResultCard
              title="401(k) Contribution"
              amount={results.retirement401k}
              description="Monthly retirement savings"
            />
          </div>
        </div>
      </div>
    </div>
  );
};