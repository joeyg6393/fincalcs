import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Calculator className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">Fin-Calcs.com</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Breadcrumbs />
      <main>{children}</main>
    </div>
  );
};