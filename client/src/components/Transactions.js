import React, { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import "./Transactions.css"

const Transactions = () => {
    const { transactions, fetchTransactions } = useContext(AppContext)
    
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className='page-wrapper'>
            <div>Number of transaction: {transactions.length}</div>
            <h1>Transaction History</h1>
            {
                transactions.map(transaction => {
                    return <Transaction transaction={transaction} />
                })
            }
        </div>
    );
};

export const Transaction = ({ transaction }) => {
    const { receiptHash, status, timestamp, source, destination, amount, currency} = transaction  
    return (
        <div className='transaction'>    
            <LabelDiv title="Transaction Hash" data={receiptHash} />
            <LabelDiv title="Status" data={status} />
            <LabelDiv title="Timestamp" data={timestamp} />
            <LabelDiv title="Source" data={source} />
            <LabelDiv title="Destination" data={destination} />
            <LabelDiv title="Amount" data={amount} currency={currency} />
        </div>
    )
}
    
const LabelDiv = ({title, data, currency}) => {
    console.log(data, typeof data);
    return (
        <div className="transaction-label">
            <strong>{title}:</strong>
            <p>{data}</p>
            { currency ? <>{currency}</> : <></> }
        </div>
    )
}

export default Transactions;
