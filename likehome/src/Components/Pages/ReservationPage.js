import React, { useEffect } from 'react';
import './ReservationPage.css';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import TextField from '@mui/material';

function Reservation({ img, location, title, description, price, rating, facilities, amenities }) {


  return (
    <div className="reservation_page">
        
        <h1>{title}</h1>

        <div className="reservation_review_info">

          <StarIcon 
            style={{
              color:"#72aee6",
            }}>
          </StarIcon> 

          <p1>{rating}</p1>
        
        </div>
            
        <div className="reservation_top">

          <div className="reservation_top_left">
            <img comment={img} alt=""/>
          
          </div>

          <div className="reservation_top_right">
            <h2>About</h2>
            <br/>
            <p2>{description}</p2>
            <p6><b>{price}</b> night · <i>{location}</i></p6>
          </div>
      
        </div>

        <p3>_____________________________________________________________________________________________________________________________________________________________</p3>
        
        <div className="reservation_details">
          <h3>Included with Your Stay</h3>
          <p7>Amenities</p7>
          <p5>{amenities}</p5>
          <br/>
          <p7>Facilities</p7>
          <p5>{facilities}</p5>
        </div>

        <p3>_____________________________________________________________________________________________________________________________________________________________</p3>

        <div className="reservation_review">
          <div className ="review_left">
            <h3>Your Trip</h3>
            <p4>Selected Check In Date: </p4>
            <p4>Selected Check Out Date: </p4>
            <p4>Number of Guests: </p4>
          </div>
          
          <div className="review_right">
            <br/>
            <p4>{startDate}</p4>
            <p4>{endDate}</p4>
            <p4>{noOfGuests}</p4>
          </div>

        </div>

        <p3>_____________________________________________________________________________________________________________________________________________________________</p3>

        <div className="reservation_price">
        <div className ="price_left">
          <h3>Price Details</h3>
          <p4>{price} x 6 nights </p4>
          <p4>Cleaning Fee: </p4>
          <p4>Service Fee: </p4>
          <p4>Total (USD): </p4>
          </div>
          
          <div className="price_right">
            <p4> </p4>
            <p4> </p4>
            <p4><u>$50.00</u></p4>
            <p4><u>$55.00</u> </p4>
            <p4><u>$591</u></p4>
            <Button 
              style={{
                borderRadius:35,
                marginTop: "60px",
                backgroundColor:"#72aee6",
              }}
              variant="contained"
            >Checkout</Button>
          </div>
        </div>

        <p3>_____________________________________________________________________________________________________________________________________________________________</p3>    

    </div>
  )
}

export default Reservation