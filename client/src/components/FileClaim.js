import React, { useContext, useState } from 'react'
import { AppContext } from './AppContext'

const FileClaim = () => {

    const { fileClaim, connectWallet } = useContext(AppContext);
    
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState(0)

    return (
        <div>
            
            <div>
                <button onClick={() => fileClaim(address, amount )}>File Claim</button>
                <button onClick={() => connectWallet()}>CONNECT WALLET</button>
            </div>
            <div>
                <label>Wallet Address</label>
                <input 
                    placeholder='Wallet Address'
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                >                    
                </input>
                <label>Amount</label>
                <input
                    placeholder='Wallet Address'
                    onChange={(e) => {
                        const stringValue = e.target.value; 
                        const numberValue = parseFloat(stringValue)
                        setAmount(numberValue)
                    }}
                >                    
                </input>
            </div>
        </div>
    );
}

export default FileClaim