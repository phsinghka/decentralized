import React, { useContext } from 'react'
import { AppContext } from './AppContext'

const FileClaim = () => {

    const { fileClaim, connectWallet } = useContext(AppContext);
    
    return (
        <div>
            <button onClick={() => fileClaim("0xfc516cdf0902B6ff0AA41BfDBDE4022873857B56", 1 )}>File Claim</button>
            <button onClick={() => connectWallet()}>CONNECT WALLET</button>
        </div>
    );
}

export default FileClaim