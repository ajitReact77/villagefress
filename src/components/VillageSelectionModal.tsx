// src/components/VillageSelectionModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useVillageStore } from '../store/villageStore';

const villages = [
  { id: 1, name: 'Majhawalia' },
  { id: 2, name: 'Saghwalia' },
  { id: 3, name: 'Basudevpur' },
  { id: 4, name: 'Saraia' },
  { id: 5, name: 'Basdila' },
  { id: 6, name: 'Narouli Bhism' },
  { id: 7, name: 'Pipar Patti' },
  { id: 8, name: 'Belwa' },
  { id: 9, name: 'Radi' },
  { id: 10, name: 'Tadawa Tola' },
];

export const VillageSelectionModal: React.FC = () => {
  const { selectedVillage, setVillage } = useVillageStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isFirstOrder = !localStorage.getItem('village_selected');
    if (isFirstOrder) {
      setIsOpen(true);
    }
  }, []);
 const name = localStorage.getItem('village_selected')
 console.log(name)
 const handleSelect = (village: typeof villages[0]) => {
  setVillage(village);
  localStorage.setItem('village_selected', JSON.stringify(village)); // 🔁 stringify
  setIsOpen(false);
};

  if (!isOpen || selectedVillage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">📍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Select Your Village</h2>
          <p className="text-gray-600 text-sm">
            We deliver only to selected areas. Choose your location below.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {villages.map((village) => (
            <button
              key={village.id}
              onClick={() => handleSelect(village)}
              className="px-3 py-2 border border-emerald-500 rounded-lg text-sm text-emerald-700 hover:bg-emerald-100 transition"
            >
              {village.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
