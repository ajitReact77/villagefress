import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading VillageFresh</h2>
        <p className="text-gray-600">Connecting to your fresh marketplace...</p>
      </div>
    </div>
  );
};