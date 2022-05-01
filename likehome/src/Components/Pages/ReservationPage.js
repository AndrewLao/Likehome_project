import React from "react";
import "./ReservationPage.css";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useHistory } from "react-router-dom";
import { getSession } from "../../Backend/auth.js";
import Axios from "axios"
import config from "../../config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function Reservation(props) {
  let history = useHistory();

  //Check if user is logged in first 
  //If logged in, redirect to payment-form & pass in hotel title
  const handleCheckout = () => {
    getSession()
      .then((session) => {
        isAlreadyReserved(session.idToken.payload.sub).then((res) => {
            if (!res) {
              history.push("./payment-form");
            } else {
              console.log("Already reserved");
            }
        });
      })
      .catch((err) => { // if no session redirect to login
        history.push("./login");
      });

    // if no session redirect to login
    
  };

  // check if user already has a reservation under the same day
  // return false if they do not have a reservation else return true if there exists a reservation
  const isAlreadyReserved = async (id) => {
    let isReserved = await Axios.get(`${config.apiUrl}/multiple-reservation-check`, {
      params: { id: id, startDate: props.reserveData.startDate, endDate: props.reserveData.endDate }})
      .then((res) => {
      return (res.data.length > 0);
    }
    , []);
    return isReserved;
  };

  return (
    <>
    {props.reserveData.title === "" ? history.push("./catalog") : <div className="reservation_page">
      
      <div className="reservation_title">
        <h1>{props.reserveData.title}</h1>
      </div>

      <div className="reservation_review_info">

        <StarIcon
          style={{
            color: "rgba(0, 139, 139, 0.7)",
          }}
        ></StarIcon>

        <p1>{props.reserveData.rating} ·{" "}
            <i>{props.reserveData.location}</i></p1>
      </div>

      <div className="reservation_top">
        <div className="reservation_top_left">
          <img src={props.reserveData.img} alt="" />
        </div>

        <div className="reservation_top_right">
          <h2>About</h2>
          <br />
          <p2>{props.reserveData.description}</p2>
          <p6>
            <b 
            style={{
              fontSize:"25px",
            }}>${props.reserveData.price}</b> / night 
          </p6>
        </div>
      </div>
      

      <div className="reservation_details">
        <h3>Included with Your Stay</h3>
        <p7>Amenities</p7>
        <p5>{props.reserveData.amenities}</p5>
        <br />
        <p7>Facilities</p7>
        <p5>{props.reserveData.facilities}</p5>
      </div>

      

      <div className="reservation_review">
        <div className="review_left">
          <h3>Your Trip</h3>
          <p4>Selected Check In Date: </p4>
          <p4>Selected Check Out Date: </p4>
          <p4>Number of Guests: </p4>
        </div>

        <div className="review_right">
          <br />
          <p4>{props.reserveData.startDate.toLocaleDateString()}</p4>
          <p4>{props.reserveData.endDate.toLocaleDateString()}</p4>
          <p4>{props.reserveData.noOfGuests}</p4>
        </div>
      </div>

      

      <div className="reservation_price">
        <div className="price_left">
          <h3>Price Details</h3>
          <p4>
            ${props.reserveData.price} x{" "}
            {(props.reserveData.endDate.getTime() -
              props.reserveData.startDate.getTime()) /
              (1000 * 60 * 60 * 24)}{" "}
            nights{" "}
          </p4>
          <p4>Cleaning Fee: </p4>
          <p4>Service Fee: </p4>
          <p4>Total (USD): </p4>
        </div>

        <div className="price_right">
          <p4> </p4>
          <p4>
            <u>
              $
              {Math.round(
                (props.reserveData.price *
                  (props.reserveData.endDate.getTime() -
                    props.reserveData.startDate.getTime())) /
                  (1000 * 60 * 60 * 24)
              )}
            </u>
          </p4>
          <p4>
            <u>
              $
              {Math.round(
                ((props.reserveData.price *
                  (props.reserveData.endDate.getTime() -
                    props.reserveData.startDate.getTime())) /
                  (1000 * 60 * 60 * 24)) *
                  0.1
              )}
            </u>
          </p4>
          <p4>
            <u>
              $
              {Math.round(
                ((props.reserveData.price *
                  (props.reserveData.endDate.getTime() -
                    props.reserveData.startDate.getTime())) /
                  (1000 * 60 * 60 * 24)) *
                  0.05
              )}
            </u>{" "}
            
          </p4>
      
          <p4>
            <u>
              $
              {Math.round(
                (props.reserveData.price *
                  (props.reserveData.endDate.getTime() -
                    props.reserveData.startDate.getTime())) /
                  (1000 * 60 * 60 * 24) +
                  ((props.reserveData.price *
                    (props.reserveData.endDate.getTime() -
                      props.reserveData.startDate.getTime())) /
                    (1000 * 60 * 60 * 24)) *
                    0.1 +
                  ((props.reserveData.price *
                    (props.reserveData.endDate.getTime() -
                      props.reserveData.startDate.getTime())) /
                    (1000 * 60 * 60 * 24)) *
                    0.05
              )}
            </u>
          </p4>
          <Button
            style={{
              borderRadius: 35,
              marginTop: "60px",
              backgroundColor:"rgba(0, 139, 139, 0.7)",
              boxShadow: "0 2px 4px rgba(0, 139, 139, 0.7)"
              //backgroundColor: "#72aee6",
            }}
            variant="contained"
            onClick={() => {
              if (
                Math.round((props.reserveData.price * (props.reserveData.endDate.getTime() - props.reserveData.startDate.getTime())) /
                  (1000 * 60 * 60 * 24) + ((props.reserveData.price * (props.reserveData.endDate.getTime() - props.reserveData.startDate.getTime())) /
                    (1000 * 60 * 60 * 24)) * 0.1 + ((props.reserveData.price * (props.reserveData.endDate.getTime() - props.reserveData.startDate.getTime())) /
                    (1000 * 60 * 60 * 24)) * 0.05) > 0 ) 
              {
                handleCheckout();
              } else {
                toast.error("Total is zero, please choose a start and end date to your stay", {position: toast.POSITION.BOTTOM_RIGHT});
              }
            }}
          >
            Checkout
          </Button>
        </div>
      </div>

      
    </div>} 
    </>
  );
}

export default Reservation;
