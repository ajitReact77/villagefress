// components/SimpleToast.tsx
import React from 'react';

interface Props {
  message: string;
  visible: boolean;
}

export function SimpleToast({ message, visible }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50 text-sm">
      {message}
    </div>
  );
}
