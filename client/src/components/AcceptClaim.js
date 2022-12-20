import React, { useContext } from 'react'
import { AppContext } from './AppContext'

const AcceptClaim = () => {

    const { getClaim, acceptClaim, connectWallet } = useContext(AppContext);

    return (
        <>
            <div>
                <button onClick={() => getClaim()}>GET CLAIM</button>
                <button onClick={() => connectWallet()}>CONNECT WALLET</button>
            </div>
            <div>
                <button onClick={() => acceptClaim()}>ACCEPT CLAIM</button>
            </div>

        </>
    );
}

export default AcceptClaim