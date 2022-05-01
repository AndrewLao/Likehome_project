import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Pages/Home";
import Header from "./Components/Navbar/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login";
import Account from "./Components/Pages/Account";
import SignUp from "./Components/Auth/SignUp";
import CatalogPage from "./Components/Catalog/CatalogPage";
import ReservationPage from "./Components/Pages/ReservationPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getSession } from "./Backend/auth.js";
import Axios from "axios";
import StripeContainer from "./Components/PaymentForm/StripeContainer";
import ThankYou from "./Components/Pages/ThankYou";
import config from "./config";

function App() {
  // use states for global application variables
  const [status, setStatus] = useState({
    status: false,
    sub: "",
    fname: "",
    lname: "",
    email: "",
  }); // status = login status True = logged in
  const [sorted, setSorted] = useState([]); // sorted = array of hotels passed into all parts where hotels are not constant i.e. search
  const [filtered, setFiltered] = useState([]); //filtered = array of hotels filtered by filter options such as sort by price.
  const [hotels, setHotels] = useState([]); // single source of truth for hotels
  const [range, setRange] = useState({
    // calendar date ranges and guest number
    startDate: new Date(),
    endDate: new Date(),
    guests: 1,
  });
  const [isFiltered, setIsFiltered] = useState(false); //This is to signal to the searchbar whether to search based on the filtered list or original hotel list. (yes this is scuffed but it will work)
  const [reserveData, setReserveData] = useState({
    img: "",
    location: "",
    title: "",
    description: "",
    price: 0,
    rating: 0,
    facilities: "",
    amenities: "",
    startDate: "",
    endDate: "",
    noOfGuests: 0,
  });


  // every time the page reloads run this
  // get whether or not the user is logged in or not
  // get all hotels from the db and set it to both hotels and sorted
  useEffect(() => {
    getSession()
      .then((session) => {
        setStatus({
          status: true,
          sub: session.idToken.payload.sub,
          fname: session.idToken.payload.given_name,
          lname: session.idToken.payload.family_name,
          email: session.idToken.payload.email,
        });
      })
      .catch((err) => {});
    // get data on page load
    Axios.get(`${config.apiUrl}/get-hotels`).then((res) => {
      setHotels(res.data);
      setSorted(res.data);
    });
  }, []);

  const getHotelID = () => {
    return hotels.find((e) => e.hotelname === reserveData.title);

  }

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
          filtered={filtered}
          isFiltered={isFiltered}
        />

        <Switch>
          <Route path="/login">
            <Login status={status} setStatus={setStatus} />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/account">
            <Account status={status} hotels={hotels} />
          </Route>

          <Route path="/catalog">
            <CatalogPage
              setFiltered={setFiltered}
              setIsFiltered={setIsFiltered}
              setReserveData={setReserveData}
              hotels={sorted}
              range={range}
            />
          </Route>

          <Route path="/payment-form">
            <StripeContainer reserveData={reserveData} getHotelID={getHotelID()} fname={status.fname} lname={status.lname} id={status.sub}/>
          </Route>

          <Route path="/thank-you">
            <ThankYou />
          </Route>

          <Route path="/reservation">
            <ReservationPage reserveData={reserveData} />
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
