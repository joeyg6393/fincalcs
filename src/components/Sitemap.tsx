import React from 'react';
import { Link } from 'react-router-dom';
import { calculators, categories } from '../routes/calculators';

export const Sitemap: React.FC = () => {
  const categorizedCalculators = Object.entries(categories).map(([id, name]) => ({
    id,
    name,
    items: calculators.filter(calc => calc.category === name)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sitemap</h1>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Link to="/" className="text-xl font-semibold text-blue-600 hover:text-blue-700">
            Home
          </Link>
        </div>

        {categorizedCalculators.map(({ id, name, items }) => (
          <div key={id} className="bg-white rounded-lg shadow-sm p-6">
            <Link 
              to={`/category/${id.toLowerCase()}`}
              className="text-xl font-semibold text-blue-600 hover:text-blue-700"
            >
              {name}
            </Link>
            
            <ul className="mt-4 ml-6 space-y-2">
              {items.map(calc => (
                <li key={calc.id}>
                  <Link 
                    to={calc.path}
                    className="text-gray-600 hover:text-blue-600 flex items-center"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};