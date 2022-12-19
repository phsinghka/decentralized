import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createAccount } from './function';

import { ethers } from 'ethers';
import { contractAddress, contractAbi } from '../utils/constants';

const getContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'http://localhost:8545'
  );
  const signer = provider.getSigner();
  const insuranceContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return insuranceContract;
};

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const insuranceContract = getContract();
  console.log(insuranceContract);

  const [currentWallet, setCurrentWallet] = useState(null);
  const [planObject, setPlanObject] = useState([])
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [receipt, setReceipt] = useState(false);

  const updatePlanStatus = async (wallet) => {
    
    // Get Start Date
    const promise1 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuranceStartDate(wallet);
        const tx = await response
        //.wait();
        const data = await tx.toString();
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(data);
        resolve(d.toString())
      } catch (error) {
        reject(error)
      }
    });
    // Get Insured Amount
    const promise2 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuredAmount(wallet);
        const tx = await response
        const data = ethers.utils.formatEther(tx.toString());
        resolve(data)
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });

    // Get Insurance Next Installment
    const promise3 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuranceNextInstallment(wallet);
        const tx = await response
        const data = await tx.toString();
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(data);
        resolve(d.toString())
      } catch (error) {
        console.log(error)
        reject(error)
      }
    });

    // Get Insurance Next Status
    const promise4 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuranceStatus(wallet);
        const tx = await response;
        const data = await tx.toString();
        resolve(data)
      } catch (error) {
        console.log(error);
        reject(error)
      }
    });

    const result = Promise.all([promise1, promise2, promise3, promise4]).then((result) => {
      const [ startDate, insuredAmount, insuranceNextInstallment, insuredStatus] = result;

      const obj = {
        startDate,
        insuredAmount,
        insuranceNextInstallment,
        insuredStatus
      }
      const entries = Object.entries(obj);
      setPlanObject(entries)
    })
  }

  // const getBalance = async(wallet) => {
  //   console.log(`http://localhost:4000/account/balance/${wallet}`);
  //   const response = await axios.get(`http://localhost:4000/account/balance/${wallet}`);
  //   setBalance(response.data.account.balance)
  //   console.log(response.data.account.balance);
  // }

  // const fetchAccounts = async () => {
  //   const response = await axios.get("http://localhost:4000/account/addresses");
  //   setAddresses(response.data.addresses);
  //   setCurrentWallet(response.data.addresses[1]._id);
  //   getBalance(response.data.addresses[1]._id)
  // };

  const buyInsurance = async () => {
    try {
      const response = await insuranceContract.setNewClient({
        value: ethers.utils.parseEther(
          Number(
            ethers.utils.formatEther(await insuranceContract.monthlyPremium())
          ).toString()
        ),
      });
      const tx = await response.wait();
      console.log('Got The insurance', tx);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    const response = await axios.get(
      'http://localhost:4000/transaction/history'
    );
    setTransactions(response.data.transactions);
  };

  useEffect(() => { }, []);

  return (
    <AppContext.Provider
      value={{
        currentWallet,
        setCurrentWallet,
        invoices,
        setInvoices,
        createAccount,
        buyInsurance,
        updatePlanStatus, 
        planObject,
        setPlanObject
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
