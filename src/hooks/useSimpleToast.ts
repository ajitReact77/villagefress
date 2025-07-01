// hooks/useSimpleToast.ts
import { useState } from 'react';

export function useSimpleToast(duration = 2500) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), duration);
  };

  return { message, visible, showToast };
}
