import React, { useState, useCallback } from 'react';
import { TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateRentalROI } from '../utils/realEstateCalculators';
import { RentalROIInputs, RentalROIResults } from '../types/realEstateCalculator';

export const RentalROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RentalROIInputs>({
    purchasePrice: 300000,
    downPayment: 60000,
    closingCosts: 5000,
    repairCosts: 10000,
    monthlyRent: 2500,
    monthlyExpenses: {
      mortgage: 1200,
      tax: 250,
      insurance: 100,
      utilities: 150,
      maintenance: 200,
      management: 200,
      other: 100,
    },
    vacancy: 5,
  });

  const [results, setResults] = useState<RentalROIResults>({
    cashFlow: 0,
    netOperatingIncome: 0,
    capRate: 0,
    cashOnCashReturn: 0,
    totalROI: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateRentalROI(inputs));
  }, [inputs]);

  const updateExpense = (category: keyof typeof inputs.monthlyExpenses, value: number) => {
    setInputs(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [category]: value,
      },
    }));
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
          Rental Property ROI Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Calculate return on investment for rental properties
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Purchase Details
            </h2>
            <InputField
              label="Purchase Price"
              value={inputs.purchasePrice}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, purchasePrice: value }))
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
              label="Closing Costs"
              value={inputs.closingCosts}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, closingCosts: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Repair/Rehab Costs"
              value={inputs.repairCosts}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, repairCosts: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Rental Income
            </h2>
            <InputField
              label="Monthly Rent"
              value={inputs.monthlyRent}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, monthlyRent: value }))
              }
              min={0}
              step={50}
              prefix="$"
            />
            <InputField
              label="Vacancy Rate"
              value={inputs.vacancy}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, vacancy: value }))
              }
              min={0}
              max={100}
              step={0.5}
              suffix="%"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Monthly Expenses
            </h2>
            <InputField
              label="Mortgage Payment"
              value={inputs.monthlyExpenses.mortgage}
              onChange={(value) => updateExpense('mortgage', value)}
              min={0}
              step={50}
              prefix="$"
            />
            <InputField
              label="Property Tax"
              value={inputs.monthlyExpenses.tax}
              onChange={(value) => updateExpense('tax', value)}
              min={0}
              step={10}
              prefix="$"
            />
            <InputField
              label="Insurance"
              value={inputs.monthlyExpenses.insurance}
              onChange={(value) => updateExpense('insurance', value)}
              min={0}
              step={10}
              prefix="$"
            />
            <InputField
              label="Utilities"
              value={inputs.monthlyExpenses.utilities}
              onChange={(value) => updateExpense('utilities', value)}
              min={0}
              step={10}
              prefix="$"
            />
            <InputField
              label="Maintenance"
              value={inputs.monthlyExpenses.maintenance}
              onChange={(value) => updateExpense('maintenance', value)}
              min={0}
              step={10}
              prefix="$"
            />
            <InputField
              label="Property Management"
              value={inputs.monthlyExpenses.management}
              onChange={(value) => updateExpense('management', value)}
              min={0}
              step={10}
              prefix="$"
            />
            <InputField
              label="Other Expenses"
              value={inputs.monthlyExpenses.other}
              onChange={(value) => updateExpense('other', value)}
              min={0}
              step={10}
              prefix="$"
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate ROI</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Monthly Cash Flow"
              amount={results.cashFlow}
              description="Net monthly income"
            />
            <ResultCard
              title="Net Operating Income"
              amount={results.netOperatingIncome}
              description="Annual NOI"
            />
            <ResultCard
              title="Cap Rate"
              amount={results.capRate}
              isCurrency={false}
              suffix="%"
              description="Return based on purchase price"
            />
            <ResultCard
              title="Cash on Cash Return"
              amount={results.cashOnCashReturn}
              isCurrency={false}
              suffix="%"
              description="Return on invested capital"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Investment Analysis
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Total Investment Required
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Down Payment</span>
                    <span>${inputs.downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Closing Costs</span>
                    <span>${inputs.closingCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Repair Costs</span>
                    <span>${inputs.repairCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t">
                    <span>Total Required</span>
                    <span>${(inputs.downPayment + inputs.closingCosts + inputs.repairCosts).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Return Metrics Analysis
                </h4>
                <div className="space-y-4">
                  {results.cashFlow < 0 && (
                    <div className="flex items-start">
                      <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                      <p className="text-gray-600">
                        Negative cash flow indicates potential risk - review expenses or consider higher rent
                      </p>
                    </div>
                  )}
                  {results.capRate < 5 && (
                    <div className="flex items-start">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      <p className="text-gray-600">
                        Low cap rate suggests high price relative to income - typical for premium locations
                      </p>
                    </div>
                  )}
                  {results.cashOnCashReturn > 8 && (
                    <div className="flex items-start">
                      <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                      <p className="text-gray-600">
                        Strong cash on cash return indicates good use of leverage
                      </p>
                    </div>
                  )}
                  {inputs.vacancy < 5 && (
                    <div className="flex items-start">
                      <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                      <p className="text-gray-600">
                        Consider increasing vacancy allowance for more conservative projections
                      </p>
                    </div>
                  )}
                  <div className="flex items-start">
                    <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                    <p className="text-gray-600">
                      {results.totalROI > 15
                        ? 'Strong overall returns suggest a good investment opportunity'
                        : results.totalROI > 10
                        ? 'Moderate returns - consider ways to optimize income or reduce expenses'
                        : 'Returns may be too low - negotiate price or find ways to increase income'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};