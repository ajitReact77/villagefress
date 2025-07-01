import React, { useEffect, useState } from 'react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      if (isAndroidOrWindows()) {
        setDeferredPrompt(e);
        setShowPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
    setShowPopup(false);
  };

  return showPopup ? (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white border rounded-xl p-4 shadow-lg flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between max-w-md mx-auto">
      <p className="text-sm font-medium text-gray-800">
        Install the app for a faster experience!
      </p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setShowPopup(false)}
          className="text-gray-500 text-sm hover:text-gray-700"
        >
          Not now
        </button>
        <button
          onClick={handleInstall}
          className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
        >
          Install
        </button>
      </div>
    </div>
  ) : null;
}

function isAndroidOrWindows(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('android') || ua.includes('windows');
}
