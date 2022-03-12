import './App.css';
import React from 'react'
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import CatalogPage from './CatalogPage';
import { BrowserRouter as Router, Switch, Route }
from "react-router-dom";

function App() {
  return (

    // BEM
    <div className="app">
      <Router>
        <Header />

        <Switch>
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
