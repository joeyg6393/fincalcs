import React, { useState, useCallback } from 'react';
import { Percent } from 'lucide-react';
import { InputField } from '../components/InputField';
import { ResultCard } from '../components/ResultCard';
import { Button } from '../components/Button';
import { calculatePropertyAppreciation } from '../utils/realEstateCalculators';
import { PropertyAppreciationInputs, PropertyAppreciationResults } from '../types/realEstateCalculator';

export const PropertyAppreciationCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<PropertyAppreciationInputs>({
    purchasePrice: 500000,
    annualAppreciation: 3,
    yearsToHold: 10,
    improvements: [
      { year: 1, cost: 15000, valueAdd: 20000 },
      { year: 3, cost: 25000, valueAdd: 35000 },
    ],
  });

  const [results, setResults] = useState<PropertyAppreciationResults>({
    futureValue: 0,
    totalAppreciation: 0,
    annualizedReturn: 0,
    yearByYear: [],
  });

  const handleCalculate = useCallback(() => {
    setResults(calculatePropertyAppreciation(inputs));
  }, [inputs]);

  const addImprovement = () => {
    setInputs(prev => ({
      ...prev,
      improvements: [
        ...prev.improvements,
        { year: 1, cost: 0, valueAdd: 0 },
      ],
    }));
  };

  const removeImprovement = (index: number) => {
    setInputs(prev => ({
      ...prev,
      improvements: prev.improvements.filter((_, i) => i !== index),
    }));
  };

  const updateImprovement = (index: number, field: keyof typeof inputs.improvements[0], value: number) => {
    setInputs(prev => ({
      ...prev,
      improvements: prev.improvements.map((imp, i) =>
        i === index ? { ...imp, [field]: value } : imp
      ),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Percent className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Property Appreciation Calculator
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Project future property value with improvements
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Property Details
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
              label="Annual Appreciation"
              value={inputs.annualAppreciation}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, annualAppreciation: value }))
              }
              min={-10}
              max={20}
              step={0.1}
              suffix="%"
            />
            <InputField
              label="Years to Hold"
              value={inputs.yearsToHold}
              onChange={(value) =>
                setInputs((prev) => ({ ...prev, yearsToHold: value }))
              }
              min={1}
              max={30}
              step={1}
              suffix="years"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Property Improvements
              </h2>
              <button
                onClick={addImprovement}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Improvement
              </button>
            </div>
            
            {inputs.improvements.map((improvement, index) => (
              <div key={index} className="mb-6 pb-6 border-b last:border-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Improvement #{index + 1}
                  </h3>
                  <button
                    onClick={() => removeImprovement(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <InputField
                  label="Year"
                  value={improvement.year}
                  onChange={(value) => updateImprovement(index, 'year', value)}
                  min={1}
                  max={inputs.yearsToHold}
                  step={1}
                />
                <InputField
                  label="Cost"
                  value={improvement.cost}
                  onChange={(value) => updateImprovement(index, 'cost', value)}
                  min={0}
                  step={1000}
                  prefix="$"
                />
                <InputField
                  label="Value Added"
                  value={improvement.valueAdd}
                  onChange={(value) => updateImprovement(index, 'valueAdd', value)}
                  min={0}
                  step={1000}
                  prefix="$"
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate}>Calculate Appreciation</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
            <ResultCard
              title="Future Value"
              amount={results.futureValue}
              description="Projected property value"
            />
            <ResultCard
              title="Total Appreciation"
              amount={results.totalAppreciation}
              description="Total value increase"
            />
            <ResultCard
              title="Annualized Return"
              amount={results.annualizedReturn}
              isCurrency={false}
              suffix="%"
              description="Average yearly return"
            />
            <ResultCard
              title="Total Improvements"
              amount={inputs.improvements.reduce((sum, imp) => sum + imp.cost, 0)}
              description="Total improvement costs"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Year by Year Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Year
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Property Value
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Appreciation
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      Improvements
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
                        ${year.value.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${year.appreciation.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${year.improvements.toLocaleString()}
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
              {results.annualizedReturn < inputs.annualAppreciation && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-yellow-500">!</span>
                  <p className="text-gray-600">
                    Improvements are reducing your overall return - consider their necessity and timing
                  </p>
                </div>
              )}
              {inputs.improvements.some(imp => imp.valueAdd < imp.cost) && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-red-500">⚠</span>
                  <p className="text-gray-600">
                    Some improvements add less value than their cost - review your improvement strategy
                  </p>
                </div>
              )}
              {results.annualizedReturn > 8 && (
                <div className="flex items-start">
                  <span className="h-4 w-4 mr-2 text-green-500">✓</span>
                  <p className="text-gray-600">
                    Strong projected returns above typical market appreciation
                  </p>
                </div>
              )}
              <div className="flex items-start">
                <span className="h-4 w-4 mr-2 text-blue-500">i</span>
                <p className="text-gray-600">
                  {results.annualizedReturn > inputs.annualAppreciation
                    ? 'Improvements are enhancing your property value beyond market appreciation'
                    : 'Consider focusing on improvements with higher value-add potential'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};