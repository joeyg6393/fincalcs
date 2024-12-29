import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { calculators, categories } from '../routes/calculators';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentCalculator = calculators.find(calc => calc.path === location.pathname);
  const categoryMatch = location.pathname.match(/\/category\/([^/]+)/);
  
  if (location.pathname === '/') return null;

  let category = '';
  if (currentCalculator) {
    category = Object.entries(categories).find(
      ([_, value]) => value === currentCalculator.category
    )?.[1] || '';
  } else if (categoryMatch) {
    category = Object.entries(categories).find(
      ([id, _]) => id.toLowerCase() === categoryMatch[1]
    )?.[1] || '';
  }

  return (
    <nav className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          {category && (
            <>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              {currentCalculator ? (
                <>
                  <Link
                    to={`/category/${Object.entries(categories).find(
                      ([_, value]) => value === category
                    )?.[0].toLowerCase()}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {category}
                  </Link>
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                  <span className="text-gray-900 font-medium">
                    {currentCalculator.title}
                  </span>
                </>
              ) : (
                <span className="text-gray-900 font-medium">{category}</span>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};