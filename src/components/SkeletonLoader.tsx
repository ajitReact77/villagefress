// components/SkeletonLoader.tsx
import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-white p-4 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>

        {/* Sidebar and main content layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-1/4 h-dvh space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded" />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            <div className="h-80 w-full bg-gray-200 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-200 h-40 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
