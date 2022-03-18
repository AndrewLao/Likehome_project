<<<<<<< Updated upstream
import React from 'react'
import './Home.css'
import Slider from "react-slick";


function Home() {
  const settings = {
    dots: true ,
    infinite: true,
    autoplay: true,
    autplayspeed: 10,
    draggable:true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:true
  };

  return (
    <div className='home'>
      <div className='home-top'>
        <img src="pexels-quark-studio-2507007.jpg" />
        <p>WELCOME</p>
        <h1> A perfect stay for everyone </h1>
      </div>

      <div className = 'carousel'>
        <h1>Check out some of our most beautiful places!</h1>
        <p>___________________________</p>
          <Slider {...settings} className='slider'>
            <div className="image1">
              <h3> 
                <img src="./places/DJI_0079-1024x820.jpg"/>
                <p>Sovena Kiri, Koh Kood</p>
                <p1>Thailand</p1>
              </h3>
            </div>
            <div className ="image2">
              <h3>
                <img src="./places/anantara_al_jabal_al_akhdar_dianas_point_01_1920x1037.jpg"/>
                <p>Anantara Al Jabal Al Akhdar Resort</p>
                <p1>Oman</p1>
              </h3>
            </div>
            <div className ="image3">
              <h3>
                <img src="./places/Aman-Venice_Dining-Hero-5.jpg"/>
                <p>Aman Venice</p>
                <p1>Italy</p1>
              </h3>
            </div>
            <div className ="image4">
              <h3>
                <img src="./places/HACIENDA+DE+SAN+ANTONIO_110ft+POOL_15+-+Photography+by+Davis+Gerber.jpg"/>
                <p>Hacienda de San Antonio</p>
                <p1>Mexico</p1>
              </h3>
            </div>
            <div className ="image5">
              <h3>
                <img src="./places/002929-06-Private-Sitout.jpg"/>
                <p>Taj Lake Palace</p>
                <p1>India</p1>
              </h3>
            </div>
            <div className ="image6">
              <h3>
                <img src="./places/lhorizon-palm-springs-main.jpg"/>
                <p>L'Horizon Hotel and Spa</p>
                <p1>United States</p1>
              </h3>
            </div>
            <div className ="image7">
              <h3>
                <img src="./places/LHOTEL_MARRAKECH-Roof-Terrace-05.jpg"/>
                <p>L'Hôtel Marrakech</p>
                <p1>Morroco</p1>
              </h3>
            </div>
            <div className ="image8">
              <h3>
                <img src="./places/as-the-sun-goes-down.jpg"/>
                <p>Tierra Atacama</p>
                <p1>Chile</p1>
              </h3>
            </div>
            <div className ="image9">
              <h3>
                <img src="./places/etosoto-formentera-espagne-baleares-exterieur-terrasse.jpg"/>
                <p>Etosoto Villa</p>
                <p1>Spain</p1>
              </h3>
            </div>
          </Slider>

      </div>

      

    </div>
    
  );
}

=======
import React from 'react'
import './Home.css'
import Slider from "react-slick";


function Home() {
  const settings = {
    dots: true ,
    infinite: true,
    autoplay: true,
    autplayspeed: 10,
    draggable:true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:true
  };

  return (
    <div className='home'>
    
      <div className='home-top'>
        <img src="pexels-quark-studio-2507007.jpg" />
        <h1> WELCOME </h1>
        <p>A perfect stay for everyone</p>
      </div>

      <div className = 'carousel'>
        <h1>Check out some of our most beautiful places!</h1>
        <p>___________________________</p>
          <Slider {...settings} className='slider'>
            <div className="image1">
              <h3> 
                <img src="./places/DJI_0079-1024x820.jpg"/>
                <p>Sovena Kiri, Koh Kood</p>
                <p1>Thailand</p1>
              </h3>
            </div>
            <div className ="image2">
              <h3>
                <img src="./places/anantara_al_jabal_al_akhdar_dianas_point_01_1920x1037.jpg"/>
                <p>Anantara Al Jabal Al Akhdar Resort</p>
                <p1>Oman</p1>
              </h3>
            </div>
            <div className ="image3">
              <h3>
                <img src="./places/Aman-Venice_Dining-Hero-5.jpg"/>
                <p>Aman Venice</p>
                <p1>Italy</p1>
              </h3>
            </div>
            <div className ="image4">
              <h3>
                <img src="./places/HACIENDA+DE+SAN+ANTONIO_110ft+POOL_15+-+Photography+by+Davis+Gerber.jpg"/>
                <p>Hacienda de San Antonio</p>
                <p1>Mexico</p1>
              </h3>
            </div>
            <div className ="image5">
              <h3>
                <img src="./places/002929-06-Private-Sitout.jpg"/>
                <p>Taj Lake Palace</p>
                <p1>India</p1>
              </h3>
            </div>
            <div className ="image6">
              <h3>
                <img src="./places/lhorizon-palm-springs-main.jpg"/>
                <p>L'Horizon Hotel and Spa</p>
                <p1>United States</p1>
              </h3>
            </div>
            <div className ="image7">
              <h3>
                <img src="./places/LHOTEL_MARRAKECH-Roof-Terrace-05.jpg"/>
                <p>L'Hôtel Marrakech</p>
                <p1>Morroco</p1>
              </h3>
            </div>
            <div className ="image8">
              <h3>
                <img src="./places/as-the-sun-goes-down.jpg"/>
                <p>Tierra Atacama</p>
                <p1>Chile</p1>
              </h3>
            </div>
            <div className ="image9">
              <h3>
                <img src="./places/etosoto-formentera-espagne-baleares-exterieur-terrasse.jpg"/>
                <p>Etosoto Villa</p>
                <p1>Spain</p1>
              </h3>
            </div>
          </Slider>

      </div>

      

    </div>
    
  );
}

>>>>>>> Stashed changes
export default Home