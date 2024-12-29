import React, { useState, useCallback } from 'react';
import { Scale } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculateRentVsBuy } from '../utils/realEstateCalculators';
import { RentVsBuyInputs, RentVsBuyResults } from '../types/realEstateCalculator';

export const RentVsBuyCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RentVsBuyInputs>({
    homePrice: 500000,
    downPayment: 100000,
    interestRate: 4.5,
    propertyTax: 6000,
    insurance: 1800,
    maintenance: 3000,
    monthlyRent: 2500,
    rentIncrease: 3,
    homeAppreciation: 3,
    timeframe: 10,
  });

  const [results, setResults] = useState<RentVsBuyResults>({
    buyingCosts: 0,
    rentingCosts: 0,
    netDifference: 0,
    breakEvenYear: 0,
    buyingEquity: 0,
  });

  const handleCalculate = useCallback(() => {
    setResults(calculateRentVsBuy(inputs));
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Rent vs. Buy Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Compare the financial impact of renting versus buying a home
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Purchase Details
            </h2>
            <InputField
              label="Home Price"
              value={inputs.homePrice}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, homePrice: value }))
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
              max={20}
              step={0.125}
              suffix="%"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Annual Costs
            </h2>
            <InputField
              label="Property Tax"
              value={inputs.propertyTax}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, propertyTax: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Insurance"
              value={inputs.insurance}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, insurance: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Maintenance"
              value={inputs.maintenance}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, maintenance: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Rental Comparison
            </h2>
            <InputField
              label="Monthly Rent"
              value={inputs.monthlyRent}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, monthlyRent: value }))
              }
              min={0}
              step={100}
              prefix="$"
            />
            <InputField
              label="Annual Rent Increase"
              value={inputs.rentIncrease}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, rentIncrease: value }))
              }
              min={0}
              max={20}
              step={0.1}
              suffix="%"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Market Conditions
            </h2>
            <InputField
              label="Home Appreciation"
              value={inputs.homeAppreciation}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, homeAppreciation: value }))
              }
              min={-10}
              max={20}
              step={0.1}
              suffix="%"
            />
            <InputField
              label="Time Frame"
              value={inputs.timeframe}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, timeframe: value }))
              }
              min={1}
              max={30}
              step={1}
              suffix="years"
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Compare Options</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Total Cost of Buying"
              amount={results.buyingCosts}
              description="Total cost over time frame"
            />
            <ResultCard
              title="Total Cost of Renting"
              amount={results.rentingCosts}
              description="Total cost over time frame"
            />
            <ResultCard
              title="Break-Even Point"
              amount={results.breakEvenYear}
              isCurrency={false}
              suffix=" years"
              description="When buying becomes cheaper"
            />
            <ResultCard
              title="Home Equity"
              amount={results.buyingEquity}
              description="Equity built after time frame"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cost Comparison
            </h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Net Difference: ${Math.abs(results.netDifference).toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {results.netDifference > 0 ? 'Renting Costs Less' : 'Buying Costs Less'}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(results.buyingCosts / Math.max(results.buyingCosts, results.rentingCosts)) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Buying</span>
                <span>Renting</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Analysis & Recommendations
            </h3>
            <div className="space-y-4">
              {results.breakEvenYear < 5 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Quick break-even period suggests buying is a good financial decision
                  </p>
                </div>
              )}
              {results.breakEvenYear > 7 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p className="text-gray-600">
                    Long break-even period - consider your long-term plans carefully
                  </p>
                </div>
              )}
              {inputs.downPayment < inputs.homePrice * 0.2 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p className="text-gray-600">
                    Down payment less than 20% will require PMI, increasing monthly costs
                  </p>
                </div>
              )}
              {inputs.homeAppreciation > inputs.rentIncrease + 2 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Strong appreciation potential favors buying
                  </p>
                </div>
              )}
              <div className="flex items-start">
                <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                <p className="text-gray-600">
                  {results.netDifference > 0
                    ? 'Renting appears more financially advantageous over your time frame'
                    : 'Buying appears more financially advantageous over your time frame'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};