import React from 'react'
import './App.css';
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import Account from './Account'
import SignUp from './SignUp'
import CatalogPage from './CatalogPage'
import { BrowserRouter as Router, Switch, Route }
from "react-router-dom";

function App() {
  return (

    // BEM
    <div className="app">
      <Router>
        <Header />

        <div className="body">    
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
        </div>

        <Footer />

      </Router>
    </div>
  );
}

export default App;
