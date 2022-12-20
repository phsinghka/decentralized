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
import { BuyInsurance } from "./BuyInsurance";
import GetLicence from "./components/GetLicence";
import FileClaim from "./components/FileClaim";

export const App = () => {
  
  const context = useContext(AppContext)
  const { currentWallet } = context;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>} >
          <Route path="/home" element={<Home />}/>
          <Route path="/buy_insurance" element={<BuyInsurance />}/>
          <Route path="/get_licence" element={<GetLicence />}/>
          <Route path="/file_claim" element={<FileClaim />}/>
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
