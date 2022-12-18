import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import "./Addresses.css"

const Addresses = () => {
    
    const context = useContext(AppContext)
    const { addresses, currentWallet } = context;
    
    return (
        <div className='page-wrapper'>
        <h1>Blockchain Node Addresses</h1>
            <div className='transaction'>
                {
                    addresses.map((addresse) => {
                        console.log(addresse);
                        return (
                            <h2>
                                <Link to={`/transfer/${addresse._id}`}
                                from={currentWallet}
                                >{addresse._id}</Link>
                            </h2>
                        )
                    })
                }
            </div>
        </div>
    );
};
    
export default Addresses;
