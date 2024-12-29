import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { calculators, categories } from '../routes/calculators';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const category = Object.entries(categories).find(([id, _]) => id.toLowerCase() === categoryId)?.[1];
  const categoryCalculators = calculators.filter(calc => calc.category === category);

  if (!category) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          {category}
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Financial calculators for {category.toLowerCase()}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryCalculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <div
              key={calc.id}
              className={`relative group bg-white rounded-lg shadow-md overflow-hidden
                ${calc.comingSoon ? 'opacity-75' : 'hover:shadow-lg transition-shadow'}`}
            >
              {calc.comingSoon ? (
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gray-100 rounded-full mr-3">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {calc.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 mb-4">{calc.description}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Coming Soon
                  </span>
                </div>
              ) : (
                <Link to={calc.path} className="block p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {calc.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 mb-4">{calc.description}</p>
                  <span className="text-blue-600 font-medium">
                    Try Calculator →
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};