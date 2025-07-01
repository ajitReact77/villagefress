import React from 'react';
import { categories } from '../data/categories';
import { Category } from '../types';

interface CategoryGridProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryGrid({ selectedCategory, onCategorySelect }: CategoryGridProps) {
  return (
    <div className="h-screen sticky top-0 bg-white flex items-start justify-center px-1 py-4 overflow-y-auto">
      <div className="flex flex-col gap-6 ">
        {/* All Items */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`flex items-center flex-col md:flex-row md:p-4 gap-2 transition-all text-left  ${
            selectedCategory === null
               ? 'bg-emerald-100 text-emerald-800 rounded-sm'
              : 'text-gray-700'
          }`}
        >
          <div className="text-xl">🛒</div>
          <span className="text-sm font-medium text-gray-900">All Items</span>
        </button>

        {/* Other Categories */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center md:flex-row flex-col md:p-4  p-1 transition-all text-left text-balance  ${
              selectedCategory === category.id
                  ? 'bg-emerald-100 text-emerald-800 rounded-sm'
              : 'text-gray-700'
            }`}
          >
            <div className="text-xl">{category.icon}</div>
            <span className="text-sm  font-medium text-gray-900">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
