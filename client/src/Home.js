import React, { useContext } from 'react'
import { AppContext } from './components/AppContext'
import Navbar from './components/Navbar'

export const Home = () => {
  const { currentWallet } = useContext(AppContext)
  
  const currentPlan = {
    valid: true, 
    plan: "plan1", 
    last_payment: "11-11-2022",
    next_payment: "11-11-2022",
  }

  const payments = [
    {
    amount: true, 
    payment_date: "11-11-2022",
    status: "open",
    },
    {
      amount: true, 
      payment_date: "11-11-2022",
      status: "payed",
    },
  ]

  return (
    <div>
        <h1>Home</h1>
        <Navbar/>
        
        <div>
            <h4>Email:</h4>
            <label></label>
        </div>
       
        <div>
            <h4>Wallet</h4>
            {
              currentWallet ?
              <>
                <label>{currentWallet}</label>
                <button>Set Wallet</button>
              </>
              :
              <>
                <input placeholder='wallet'></input>
                <button>Set Wallet</button> 
              </>
            }
        </div>
        
        <div>
            {/* Plan Info */}
            <div>
              {
                currentPlan ?
                <div>
                  {
                  Object.entries(currentPlan).map(
                    entry => {
                      return (
                        <>
                          <h3>{entry[0]}:</h3>
                          <h3>{entry[1]}</h3>
                        </>
                      )
                    }
                  )
                  }
                </div> :
                <></>
              }
            </div>

            {/* Paymentes */}
            <div>
              {
                payments.map(payment => {
                  console.log(payment);
                  return Object.entries(payment).map(entry => {
                    console.log(entry)
                    return (
                      <div>
                        <h3>{entry[0]}</h3>
                        <h3>{entry[1]}</h3>
                      </div>
                    )
                  })
                })
              }
            </div>
        </div>
    </div>
  )
}
