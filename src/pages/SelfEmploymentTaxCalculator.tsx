import React, { useState, useCallback } from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateSelfEmploymentTax } from '../utils/incomeCalculators';
import { SelfEmploymentInputs, SelfEmploymentResults } from '../types/calculator';

export const SelfEmploymentTaxCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SelfEmploymentInputs>({
    netEarnings: 75000,
    expenses: 15000,
    otherIncome: 0,
    businessMiles: 5000,
    homeOfficePercent: 15,
  });

  const [results, setResults] = useState<SelfEmploymentResults>({
    selfEmploymentTax: 0,
    socialSecurityTax: 0,
    medicareTax: 0,
    taxableIncome: 0,
    estimatedQuarterlyTax: 0,
    deductions: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateSelfEmploymentTax(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <BadgeDollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Self-Employment Tax Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your self-employment tax obligations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Income & Expenses
          </h2>
          <InputField
            label="Net Business Earnings"
            value={inputs.netEarnings}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, netEarnings: value }))
            }
            min={0}
            step={1000}
            prefix="$"
          />
          <InputField
            label="Business Expenses"
            value={inputs.expenses}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, expenses: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Other Income"
            value={inputs.otherIncome}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, otherIncome: value }))
            }
            min={0}
            step={100}
            prefix="$"
          />
          <InputField
            label="Business Miles"
            value={inputs.businessMiles}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, businessMiles: value }))
            }
            min={0}
            step={100}
          />
          <InputField
            label="Home Office Percentage"
            value={inputs.homeOfficePercent}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, homeOfficePercent: value }))
            }
            min={0}
            max={100}
            step={1}
            suffix="%"
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Tax</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ResultCard
              title="Self-Employment Tax"
              amount={results.selfEmploymentTax}
              description="Total SE tax (Social Security + Medicare)"
            />
            <ResultCard
              title="Quarterly Tax Payment"
              amount={results.estimatedQuarterlyTax}
              description="Estimated quarterly payment"
            />
            <ResultCard
              title="Social Security Tax"
              amount={results.socialSecurityTax}
              description="12.4% of net earnings"
            />
            <ResultCard
              title="Medicare Tax"
              amount={results.medicareTax}
              description="2.9% of net earnings"
            />
            <ResultCard
              title="Taxable Income"
              amount={results.taxableIncome}
              description="After deductions"
            />
            <ResultCard
              title="Total Deductions"
              amount={results.deductions}
              description="Business expenses and other deductions"
            />
          </div>
        </div>
      </div>
    </div>
  );
};