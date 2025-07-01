import { BrowserRouter } from 'react-router-dom';
import AppRoutes  from './routes/Router';
import { SimpleToast } from './components/SimpleToast';
import { useSimpleToast } from './hooks/useSimpleToast';
import { useCartStore } from './store/cartStore';
import { useEffect } from 'react';
import { InstallPrompt } from './components/InstallPrompt';

function App() {
   const { message, visible, showToast } = useSimpleToast();
  const setToastHandler = useCartStore((state) => state.setToastHandler);
 useEffect(() => {
    setToastHandler(showToast);
  }, [setToastHandler, showToast]);

  return (
    <BrowserRouter>
      <AppRoutes />
       <SimpleToast message={message} visible={visible} />
       <InstallPrompt />
    </BrowserRouter>
  );
}

export default App;
