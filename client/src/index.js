import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './components/AppContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <AppContextProvider>
      <App/>
      <Toaster/>
    </AppContextProvider>
  //</React.StrictMode>
);

