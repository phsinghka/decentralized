import axios from "axios";
import React, { useEffect, useState } from "react";
export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [receipt, setReceipt] = useState(false);

  const getBalance = async(wallet) => {
    console.log(`http://localhost:4000/account/balance/${wallet}`);
    const response = await axios.get(`http://localhost:4000/account/balance/${wallet}`);
    setBalance(response.data.account.balance)
    console.log(response.data.account.balance);
  }

  const fetchAccounts = async () => {
    const response = await axios.get("http://localhost:4000/account/addresses");
    setAddresses(response.data.addresses);
    setCurrentWallet(response.data.addresses[1]._id);
    getBalance(response.data.addresses[1]._id)
  };

  const fetchTransactions = async () => {
    const response = await axios.get(
      "http://localhost:4000/transaction/history"
    );
    setTransactions(response.data.transactions)
  };

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        balance,
        setBalance,
        addresses,
        transactions,
        setTransactions,
        currentWallet,
        getBalance,
        receipt,
        setReceipt,
        fetchTransactions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

