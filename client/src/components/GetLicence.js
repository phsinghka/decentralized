import React, { useContext } from 'react'
import { AppContext } from './AppContext'

const GetLicence = () => {

    const { buyLicence, connectWallet } = useContext(AppContext);
    
    return (
        <div>
            <button onClick={() => buyLicence()}>BUY LICENCE</button>
            <button onClick={() => connectWallet()}>CONNECT WALLET</button>
        </div>
    );
}

export default GetLicence