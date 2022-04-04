import React from "react";
import "./App.css";
import Home from "./Components/Pages/Home";
import Header from "./Components/Navbar/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login";
import Account from "./Components/Pages/Account";
import SignUp from "./Components/Auth/SignUp";
import CatalogPage from "./Components/Catalog/CatalogPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    // BEM
    <div className="app">
      <Router>
        <Header />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/catalog">
            <CatalogPage />
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
