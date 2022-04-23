import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Pages/Home";
import Header from "./Components/Navbar/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login";
import Account from "./Components/Pages/Account";
import SignUp from "./Components/Auth/SignUp";
import CatalogPage from "./Components/Catalog/CatalogPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getSession } from "./Backend/auth.js";
import Axios from "axios";

function App() {

  // use states for global application variables
  const [status, setStatus] = useState(false);
  const [sorted, setSorted] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [range, setRange] = useState({
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
    guests: 1
  });

  
  useEffect(() => {
    getSession()
      .then((session) => {
        setStatus(true);
      })
      .catch((err) => {
      });
    // get data on page load
    Axios.get('http://localhost:3001/get-hotels').then((res) => {
        setHotels(res.data);
        setSorted(res.data);
    });
  }, []);
  
  return (
    // BEM
    <div className="app">
      <Router>
        {/*PASS EVERYTHING INTO HEADER DONT KNOW HOW ELSE TO DO THIS*/}
        <Header 
          status={status} 
          setStatus={setStatus} 
          hotels={hotels} 
          sorted={sorted} 
          setSorted={setSorted}
          range={range}
          setRange={setRange}
        />

        <Switch>
          <Route path="/login">
            <Login setStatus={setStatus} />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/catalog">
            <CatalogPage hotels={sorted} range={range} />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
