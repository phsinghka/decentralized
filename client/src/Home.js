import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from './components/AppContext'
import Navbar from './components/Navbar'
import styled from 'styled-components'

export const Home = () => {
  const { currentWallet, setCurrentWallet, updatePlanStatus, planObject } = useContext(AppContext)
  const [input, setInput] = useState("")

  const currentPlan = {
    valid: true,
    plan: "plan1",
    last_payment: "11-11-2022",
    next_payment: "11-11-2022",
  }

  const handleWallet = (input) => {
    console.log("Handling Wallet", input)
    setCurrentWallet(input)
    updatePlanStatus(input)
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

  console.log("WIPI", planObject);


  return (
    <Layout>
      <h1>Home</h1>
      <Navbar />

      <UserSection>
        <h3>User</h3>
        <Card>

          <h4>Email:</h4>
          <label></label>
        </Card>
      </UserSection>

      <WalletSection>
        <Card>
          <h4>Wallet</h4>
          {
            currentWallet ?
              <Row>
                <label>{currentWallet}</label>
                <BtnWallet
                  onClick={() => {
      
                  }}
                >Edit Wallet</BtnWallet>
              </Row>
              :
              <Row>
                <input placeholder='wallet' onChange={
                  (e) =>setInput(e.target.value)
                }></input>
                <BtnWallet
                  onClick={() => {
                    handleWallet(input)
                  }}
                >Set Wallet</BtnWallet>
              </Row>
          }
        </Card>
      </WalletSection>

      <div>
        {/* Plan Info */}
        <CurrentPlanCard>
          <h3>Plan</h3>
          {
            planObject.length > 0 ?
              <Card>
                {
                planObject.map(entry => {
                  return (
                  <Row>
                    <h3>{entry[0]}: &nbsp; &nbsp;</h3>
                    <h3>{entry[1]}</h3>
                  </Row>
                  )
                })}
              </Card> :
              <></>
          }
        </CurrentPlanCard>

        {/* Paymentes */}
        <PaymentsSection>
          <h3>Payments</h3>
          {
            payments.map(payment => {
              console.log(payment);
              return (
                <Card>
                  {Object.entries(payment).map(entry => {
                    console.log(entry)
                    return (
                      <Row>
                        <h3>{entry[0]} --- </h3>
                        <h3>{entry[1]}</h3>
                      </Row>
                    )
                  })}
                </Card>
              )


            })
          }
        </PaymentsSection>
      </div>
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px
`

const Row = styled.div`
  display: flex;
`

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 20px
`

const WalletSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 20px;
`

const CurrentPlanCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 20px;
`

const BtnWallet = styled.button`
  width: 50px
`

const PaymentsSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin-top: 20px;
  padding: 20px;

  `

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin-top: 20px
`
