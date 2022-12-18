import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from './AppContext';
import { Transaction } from './Transactions';
import "./Transfer.css"

const Transfer = () => {
    const { id } = useParams();
    const context = useContext(AppContext);
    const { currentWallet, setTransactions, balance,
        getBalance, transactions, receipt, setReceipt } = context;
    const [amount, setAmount] = useState("")

    // TO DO Terminar post transfer
    useEffect(() => {
        getBalance(currentWallet)
    }, []);

    const handleTransaction = async (e) => {
        console.log("receipt", receipt, "----" , "balance:", balance);
        if (amount > 0 && amount < balance) {
            const newTransaction = {
                hashReceipt: "kajndfkjndakjnf9189hn19urnj",
                status: "SUCCESS",
                timestamp: Date.now(),
                source: currentWallet,
                destination: id,
                amount: amount,
                currency: "ETH",
                gasUsed: 21000
            }
            console.log(newTransaction);
            const response = await axios.post("http://localhost:4000/transactions", newTransaction)
            setReceipt(response.data.transaction)
            getBalance(currentWallet)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const newAmount = parseInt(e.target.value)
        console.log(newAmount, typeof newAmount );
        setAmount(parseInt(e.target.value))
    }
    
    return (
        <div className='page-wrapper'>
            <h1>Transfer</h1>
                <>Current Balance: { balance }</>
            <div className='transaction'>    
                <div className="transaction-label">
                    <strong>From:</strong>
                    <p>{ currentWallet }</p>
                </div>
                <div className="transaction-label">
                    <strong>to:</strong>
                    <p>{ id }</p>
                </div>
                <div className="transaction-label">
                    <strong>Amount:</strong>
                    <input type="number" onChange={handleChange}></input>
                </div>
                <div className="transaction-label">
                    <button onClick={(e) => handleTransaction(e)}>Submit</button>
                </div>
            </div>
            {
                receipt ? <Receipt receipt={receipt}/> : <></>
            }
        </div>
    );
};

const Receipt = ({receipt}) => {
    console.log("receipt", receipt);
    return (
        <Transaction transaction={receipt}/>
    )
}

export default Transfer;