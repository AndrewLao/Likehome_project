import React from "react";
import "./Home.css";
import Slider from "react-slick";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autplayspeed: 10,
    draggable: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  return (
    <div className="home">
      <div className="home-top">
        <img src="pexels-quark-studio-2507007.jpg" alt="" />

        <div className="home-top-caption">
          <h1> WELCOME </h1>
          <p>A perfect stay for everyone</p>
        </div>
      </div>

      <div className="carousel">
        <h1>Check out some of our most beautiful places!</h1>
        <p>___________________________</p>
        <Slider {...settings} className="slider">
          <div className="image">

              <img src="./hotelpics/a232dd86.jpg" alt="" />
              <p>Hyatt Centric Center City</p>
              <p1>Philadelphia, PA</p1>
            
          </div>
          <div className="image1">
            
              <img
                src="./hotelpics/2c8f59ca.jpg"
                alt=""
              />
              <p>TownePlace Suites</p>
              <p1>Phoenix, AZ</p1>
            
          </div>
          <div className="image2">
            
              <img src="./hotelpics/hotel-drisco.jpg" alt="" />
              <p>Hotel Drisco</p>
              <p1>San Francisco, CA</p1>
            
          </div>
          <div className="image3">
            
              <img
                src="./hotelpics/337351560.jpg"
                alt=""
              />
              <p>Victorian History Landmart</p>
              <p1>San Jose, CA</p1>
            
          </div>
          <div className="image4">
            
              <img src="./hotelpics/mediterranean-inn.jpg" alt="" />
              <p>The Mediterranean Inn</p>
              <p1>Seattle, WA</p1>
            
          </div>
          <div className="image5">
            
              <img src="./hotelpics/avanti-palms-resort-and.jpg" alt="" />
              <p>Avanti Palms Resort And Conference Center</p>
              <p1>Orlando, FL</p1>
            
          </div>
          <div className="image6">
            
              <img src="./hotelpics/dear-irving.jpg" alt="" />
              <p>Aliz Hotel Times Square</p>
              <p1>NYC, NY</p1>
            
          </div>
          <div className="image7">
            
              <img src="./hotelpics/ff033257-166f-41e5-bbb6-174f830a45eb.jpg" alt="" />
              <p>The Masterpiece Melrose Villa</p>
              <p1>Hollywood, LA</p1>
            
          </div>
          <div className="image8">
            
              <img
                src="./hotelpics/lobby.jpg"
                alt=""
              />
              <p>Element North Kansas City</p>
              <p1>N Kansas City, MO</p1>
            
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;
