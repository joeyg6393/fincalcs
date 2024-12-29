import React, { useState, useCallback } from 'react';
import { DollarSign } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateClosingCosts } from '../utils/realEstateCalculators';
import { ClosingCostInputs, ClosingCostResults } from '../types/realEstateCalculator';

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const ClosingCostCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ClosingCostInputs>({
    purchasePrice: 300000,
    downPayment: 60000,
    loanType: 'conventional',
    state: 'CA',
  });

  const [results, setResults] = useState<ClosingCostResults>({
    totalClosingCosts: 0,
    lenderFees: 0,
    thirdPartyFees: 0,
    governmentFees: 0,
    prepaidItems: 0,
    itemizedCosts: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateClosingCosts(inputs));
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
          Closing Cost Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Estimate your home purchase closing costs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Type
            </label>
            <select
              value={inputs.loanType}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  loanType: e.target.value as 'conventional' | 'fha' | 'va',
                }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="conventional">Conventional</option>
              <option value="fha">FHA</option>
              <option value="va">VA</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              value={inputs.state}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, state: e.target.value }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Costs</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Closing Costs"
              amount={results.totalClosingCosts}
              description="Total estimated closing costs"
            />
            <ResultCard
              title="Lender Fees"
              amount={results.lenderFees}
              description="Loan origination and processing"
            />
            <ResultCard
              title="Third Party Fees"
              amount={results.thirdPartyFees}
              description="Services required for closing"
            />
            <ResultCard
              title="Government Fees"
              amount={results.governmentFees}
              description="Recording and transfer taxes"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Itemized Closing Costs
            </h3>
            <div className="space-y-4">
              {results.itemizedCosts.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium">${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 font-medium">
                <span>Total Closing Costs</span>
                <span>${results.totalClosingCosts.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Important Notes
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="h-4 w-4 mr-2 text-blue-500">•</span>
                <p>
                  Actual closing costs may vary based on lender, location, and specific transaction details
                </p>
              </div>
              {inputs.loanType === 'fha' && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-blue-500">•</span>
                  <p>
                    FHA loans require upfront mortgage insurance premium (MIP) of 1.75% of the base loan amount
                  </p>
                </div>
              )}
              {inputs.loanType === 'va' && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-blue-500">•</span>
                  <p>
                    VA loans may include a funding fee between 1.4% and 3.6% based on down payment and service history
                  </p>
                </div>
              )}
              {inputs.downPayment < inputs.purchasePrice * 0.2 && inputs.loanType === 'conventional' && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p>
                    Down payment less than 20% will require private mortgage insurance (PMI)
                  </p>
                </div>
              )}
              <div className="flex items-start">
                <span className="h-4 w-4 mr-2 text-blue-500">•</span>
                <p>
                  Some fees may be negotiable - discuss with your lender and real estate agent
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};