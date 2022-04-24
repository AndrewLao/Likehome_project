import React, { useEffect } from 'react';
import './ReservationPage.css';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import TextField from '@mui/material';

function Reservation() {


  return (
    <div className="reservation_page">
        
        <h1 comment="{title}">Hollywood Rentals LLC</h1>

        <div className="reservation_review_info">

          <StarIcon 
            style={{
              color:"#72aee6",
            }}>
          </StarIcon> 

          <p1 comment="{ratingVal}{numRatings}"> 7.2 · <u>300 reviews</u></p1>
        
        </div>
            
        <div className="reservation_top">

          <div className="reservation_top_left">
            <img comment="{imglink}" src="patrick-robert-doyle-AH8zKXqFITA-unsplash.jpg"alt=""/>
          
          </div>

          <div className="reservation_top_right">
            <h2>About</h2>
            <br/>
            <p2 comment="{details}">You're eligible for a Genius discount at Hollywood Rentals LLC! To save at this property, all you have to do is. .. Offering free WiFi throughout the property, Hollywood Rentals LLC is located in Chicago, 5.5 km from Wrigley Field and 9.7 km from Lincoln Park Zoo. The property is around 11.3 km from Water Tower Chicago, 11.3 km from Michigan Avenue and 12.9 km from 360 Chicago. Shops at Northbridge is 14.5 km away and Navy Pier is 14.5 km from the guesthouse.. All rooms in the guesthouse are equipped with a flat-screen TV. Rooms come with a coffee machine, while some rooms include a kitchen with a microwave, a fridge and an oven. The rooms at Hollywood Rentals LLC have air conditioning and a desk.. United Center is 12.9 km from the accommodation, while Chicago Museum of Contemporary Art is 12.9 km from the property. The nearest airport is Chicago O'Hare International Airport, 24.1 km from Hollywood Rentals LLC.</p2>
            <p6 comment="{price}"><b>$81</b> night · <i comment="{address}">1656 West Hollywood Avenue, Chicago, IL 60660, United States of America</i></p6>
          </div>
      
        </div>

        <p3>_____________________________________________________________________________________________________________________________________________________________</p3>
        
        <div className="reservation_details">
          <h3>Included with Your Stay</h3>
          <p7 comment="{amenities}" >Amenities</p7>
          <p5> Kitchen , Streaming service (like Netflix) , Toilet , Bathtub or shower , Towels , Linens , Desk , Private entrance , TV , Refrigerator , Tea/Coffee maker , Iron , Shared toilet , Shared bathroom , Microwave , Hairdryer , Kitchenware , Fan , Guest bathroom , Towels/Sheets (extra fee) , Oven , Stovetop , Toaster , Upper floors accessible by stairs only , Toilet paper , Carbon monoxide detector</p5>
          <br/>
          <p7 comment="{facilities}">Facilities</p7>
          <p5> Non Smoking Rooms, Parking (fee required), Free WiFi Internet Access Included, Daily maid service, Coffee/Tea maker, Non Smoking Rooms, Parking (fee required), Free WiFi Internet Access Included, Daily maid service, Coffee/Tea maker</p5>
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
            <p4>04/20/22 </p4>
            <p4 >04/20/23 </p4>
            <p4 >1 </p4>
          </div>

        </div>

        <p3>_____________________________________________________________________________________________________________________________________________________________</p3>

        <div className="reservation_price">
        <div className ="price_left">
          <h3>Price Details</h3>
          <p4>$81 x 6 nights </p4>
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