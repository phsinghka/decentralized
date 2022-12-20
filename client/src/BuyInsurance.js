import React, { useContext } from 'react';
import { AppContext } from './components/AppContext';

export const BuyInsurance = () => {
  const { buyLicence, connectWallet } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => buyLicence()}>BUY INSURANCE</button>
      <button onClick={() => connectWallet()}>CONNECT WALLET</button>
    </div>
  );
};
