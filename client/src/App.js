import { AppContext } from "./components/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import  Addresses from "./components/Addresses";
import  Transfer from "./components/Transfer";
import Navbar from "./components/Navbar";
import React from 'react'
import Transactions from "./components/Transactions";
import Wallet from "./components/Wallet";
import "./App.css"

export const App = () => {
  
  const context = useContext(AppContext)
  const { currentWallet } = context;

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
              {/* <Route path="/transactions" element={<Transactions />} />
              <Route path="/transfer/:id" element={<Transfer/>} />
              <Route path="/wallet" element={<Wallet/>} /> */}
              <Route path="/" element={<Home />}/>
        </Routes>
    </BrowserRouter>
    )
}


export default App;
