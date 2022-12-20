import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createAccount, loginAccount } from './function';
import { ethers, BigNumber } from 'ethers';
import { contractAddress, contractAbi } from '../utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const { ethereum } = window;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
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
  const connectWallet = async () => {
    if (!ethereum) return toast.error('Please Install Metamask');
    const notification = toast.loading('Logging in !!');
    try {
      console.log('Here');
      const getAccount = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(getAccount[0]);
      toast.success('Logged In', {
        id: notification,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        id: notification,
      });
    }
  };

  const insuranceContract = getContract();
  console.log(insuranceContract);


  const [currentAccount, setCurrentAccount] = useState(null);

  const [currentWallet, setCurrentWallet] = useState(null);
  const [planObject, setPlanObject] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);
  const [loginToken, setLoginToken] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [receipt, setReceipt] = useState(false);

  const updatePlanStatus = async (wallet) => {
    // Get Start Date
    const promise1 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuranceStartDate(wallet);
        const tx = await response;
        //.wait();
        const data = await tx.toString();
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(data);
        resolve(d.toString());
      } catch (error) {
        reject(error);
      }
    });
    // Get Insured Amount
    const promise2 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuredAmount(wallet);
        const tx = await response;
        const data = ethers.utils.formatEther(tx.toString());
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    // Get Insurance Next Installment
    const promise3 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuranceNextInstallment(
          wallet
        );
        const tx = await response;
        const data = await tx.toString();
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(data);
        resolve(d.toString());
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    // Get Insurance Next Status
    const promise4 = new Promise(async (resolve, reject) => {
      try {
        const response = await insuranceContract.getInsuranceStatus(wallet);
        const tx = await response;
        const data = await tx.toString();
        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    const result = Promise.all([promise1, promise2, promise3, promise4]).then(
      (result) => {
        const [
          startDate,
          insuredAmount,
          insuranceNextInstallment,
          insuredStatus,
        ] = result;

        const obj = {
          startDate,
          insuredAmount,
          insuranceNextInstallment,
          insuredStatus,
        };
        const entries = Object.entries(obj);
        setPlanObject(entries);
      }
    );
  };

  const logout = () => {
    setCurrentAccount(null)
    setCurrentWallet(null);
    setPlanObject([]);
    setInvoices([]);
    setUser(null);
    setLoginToken(false);
    setAddresses([]);
    setBalance(0);
    setTransactions([]);
    setReceipt(false);
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

  const acceptClaim = async () => {
    try {
      const response = await insuranceContract.acceptClaim();
      const tx = await response.wait();
      console.log('Thanks for accepting the claim', tx);
    } catch (error) {
      console.log(error);
    }
  };

  const getClaim = async () => {
    try {
      const response = await insuranceContract.getActiveClaims("0xfc516cdf0902B6ff0AA41BfDBDE4022873857B56");
      console.log("Getting the claim");
      console.log('This is your claim', response);
    } catch (error) {
      console.log(error);
    }
  };

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

  const buyLicence = async () => {
    try {
      const response = await insuranceContract.setNewHospital({
        value: ethers.utils.parseEther(
          Number(
            ethers.utils.formatEther(await insuranceContract.hospitalDeposit())
          ).toString()
        ),
      });
      const tx = await response.wait();
      console.log('Got The Hospital Licence', tx);
    } catch (error) {
      console.log(error);
    }
  };

  const fileClaim = async (clientAddress, claimAmount) => {
    console.log(claimAmount);
    const toWei = claimAmount * (10 ** 18)

    const bigNum = await BigNumber.from(toWei.toString());
    console.log(bigNum);
    try {
      const response = await insuranceContract.fileClaim(clientAddress, bigNum);
      const tx = await response.wait();
      console.log('You successfully filed a claim', tx);
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
        setPlanObject,
        connectWallet,
        buyLicence,
        fileClaim,
        getClaim,
        acceptClaim,
        loginAccount,
        user,
        setUser,
        loginToken,
        setLoginToken,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
