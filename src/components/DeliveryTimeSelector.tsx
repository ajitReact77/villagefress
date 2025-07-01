import React, { useState } from 'react';

interface DeliveryTimeSelectorProps {
  onSelect: (option: 'instant' | 'schedule') => void;
}

export const DeliveryTimeSelector: React.FC<DeliveryTimeSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<'instant' | 'schedule'>('schedule');

  const handleSelect = (value: 'instant' | 'schedule') => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Choose Delivery Time</h3>

      <div className="space-y-2">
        <label
          className={`block p-4 rounded-xl border cursor-pointer ${
            selected === 'schedule' ? 'border-green-500 bg-green-50' : 'border-gray-200'
          }`}
          onClick={() => handleSelect('schedule')}
        >
          <strong>🕕 Scheduled (Free)</strong>
          <p className="text-sm text-gray-600">Today between 6 PM to 8 PM</p>
        </label>

        <label
          className={`block p-4 rounded-xl border cursor-pointer ${
            selected === 'instant' ? 'border-red-500 bg-red-50' : 'border-gray-200'
          }`}
          onClick={() => handleSelect('instant')}
        >
          <strong>⚡ Instant Delivery (+₹20)</strong>
          <p className="text-sm text-gray-600">Get your order within 30 minutes</p>
        </label>
      </div>
    </div>
  );
};
