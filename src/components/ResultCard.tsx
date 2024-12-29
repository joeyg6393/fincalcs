import React from 'react';
import { DollarSign } from 'lucide-react';

interface ResultCardProps {
  title: string;
  amount: number;
  isCurrency?: boolean;
  description?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  amount,
  isCurrency = true,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-2">
        {isCurrency && <div className="p-2 bg-blue-100 rounded-full mr-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
        </div>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {isCurrency ? `$${amount.toLocaleString()}` : amount.toLocaleString()}
      </p>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};