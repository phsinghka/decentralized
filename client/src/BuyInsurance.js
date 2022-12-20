import React, { useContext } from 'react';
import { AppContext } from './components/AppContext';

export const BuyInsurance = () => {
  const { buyInsurance, connectWallet } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => buyInsurance()}>BUY INSURANCE</button>
      <button onClick={() => connectWallet()}>CONNECT WALLET</button>
    </div>
  );
};
