import React, { useContext, useEffect } from 'react'
import { AppContext } from './AppContext'

const AcceptClaim = () => {

    const { getClaim, acceptClaim, claimData, connectWallet,showPayButton, setShowPayButton  } = useContext(AppContext);

    useEffect(() => {
      setShowPayButton(false)
    }, [])

    return (
        <>
            <div>
                <button onClick={() => getClaim()}>GET CLAIM</button>
                <button onClick={() => connectWallet()}>CONNECT WALLET</button>
            </div>
            {
                showPayButton ?  
                <div>
                    <h3>This is your current balance: {
                      parseInt(claimData[1].toString()) / (10**18) 
                        } ETH
                    </h3>
                    <button onClick={() => acceptClaim()}>ACCEPT CLAIM</button>
                </div>
                : 
                <></>
            }

            

        </>
    );
}

export default AcceptClaim