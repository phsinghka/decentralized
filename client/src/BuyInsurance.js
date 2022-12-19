import React, { useContext } from 'react';
import { AppContext } from './components/AppContext';

export const BuyInsurance = () => {
  const { buyInsurance } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => buyInsurance()}>BUY INSURANCE</button>
    </div>
  );
};
