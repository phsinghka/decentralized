import { AppContext } from "./components/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import  Addresses from "./components/Addresses";
import  Transfer from "./components/Transfer";
import Navbar from "./components/Navbar";
import React from 'react'
import Transactions from "./components/Transactions";
import Wallet from "./components/Wallet";
import { Home } from "./Home";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Invoices } from "./Invoices";
import { PrivateRoutes } from "./components/PrivateRoute";

export const App = () => {
  
  const context = useContext(AppContext)
  const { currentWallet } = context;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/home" element={<Home />}/>
          <Route path="/invoices" element={<Invoices />}/>
        </Route>
              {/* <Route path="/transactions" element={<Transactions />} />
              <Route path="/transfer/:id" element={<Transfer/>} />
              <Route path="/wallet" element={<Wallet/>} /> */}
              <Route path="/" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
        </Routes>
    </BrowserRouter>
    )
}


export default App;
