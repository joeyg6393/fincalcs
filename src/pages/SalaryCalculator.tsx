import React, { useState, useCallback } from 'react';
import { Wallet } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateSalary } from '../utils/incomeCalculators';
import { SalaryInputs, SalaryResults } from '../types/calculator';

export const SalaryCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SalaryInputs>({
    hourlyRate: 25,
    hoursPerWeek: 40,
    weeksPerYear: 52,
  });

  const [results, setResults] = useState<SalaryResults>({
    annualSalary: 0,
    monthlySalary: 0,
    biweeklySalary: 0,
    weeklyPay: 0,
    dailyPay: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateSalary(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Salary Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate your annual, monthly, and hourly pay
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Salary Details
          </h2>
          <InputField
            label="Hourly Rate"
            value={inputs.hourlyRate}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, hourlyRate: value }))
            }
            min={0}
            step={0.5}
            prefix="$"
          />
          <InputField
            label="Hours Per Week"
            value={inputs.hoursPerWeek}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, hoursPerWeek: value }))
            }
            min={0}
            max={168}
            step={1}
          />
          <InputField
            label="Weeks Per Year"
            value={inputs.weeksPerYear}
            onChange={(value) =>
              setInputs((prev) => ({ ...prev, weeksPerYear: value }))
            }
            min={1}
            max={52}
            step={1}
          />
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Salary</Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
          <ResultCard
            title="Annual Salary"
            amount={results.annualSalary}
            description="Yearly earnings before taxes"
          />
          <ResultCard
            title="Monthly Salary"
            amount={results.monthlySalary}
            description="Monthly earnings"
          />
          <ResultCard
            title="Bi-Weekly Pay"
            amount={results.biweeklySalary}
            description="Every two weeks"
          />
          <ResultCard
            title="Weekly Pay"
            amount={results.weeklyPay}
            description="Weekly earnings"
          />
        </div>
      </div>
    </div>
  );
};