// components/UserProfile.tsx
import React from 'react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function UserProfile({ user, isOpen, onClose, onLogout }: UserProfileProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={user?.avatar || user?.photoURL || '/default-user.png'}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
          <h3 className="text-lg font-bold text-gray-900">{user.name || user.displayName}</h3>
          <p className="text-sm text-gray-600 mb-4">{user.email}</p>

          <button
            onClick={onLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
