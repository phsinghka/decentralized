import React, { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import "./Wallet.css"

const Wallet = () => {
    const { currentWallet, balance, getBalance } = useContext(AppContext)
    console.log(currentWallet, balance, getBalance);
    useEffect(() => {
        getBalance(currentWallet)
    }, [])

    return (
        <div className='page-wrapper'>
            <h1>My Wallet</h1>
            <div className='wallet'>
                <p className='wallet-row'>
                    <strong>Address: </strong>
                    { currentWallet }
                </p>
                <p className='wallet-row'>
                    <strong>Balance: </strong>
                    { balance } ETH
                </p>
            </div>
        </div>
    );
};
    
export default Wallet;