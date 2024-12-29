import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../routes/calculators';

export const HomePage: React.FC = () => {
  const categoryEntries = Object.entries(categories);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Financial Calculators
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Free tools to help you make smarter financial decisions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryEntries.map(([id, name]) => (
          <Link
            key={id}
            to={`/category/${id.toLowerCase()}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{name}</h2>
            <span className="text-blue-600 font-medium">
              View Calculators →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};