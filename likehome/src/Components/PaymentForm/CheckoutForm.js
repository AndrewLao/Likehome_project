import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button, TextField } from '@mui/material';
import React from 'react';
import config from '../../config';
import { useHistory } from 'react-router-dom';
import "./CheckoutForm.css";
import { getSession } from "../../Backend/auth.js";
import Axios from "axios";

const fields = [
    {
        name: 'name',
    },
];

const useUser = () => {
  const [user, setUser] = React.useState(null);
  let history = useHistory();
  // React.useEffect(() => {
  //   const username = localStorage.getItem('username');
  //   fetch(config.apiUrl + '/user?email=' + username).then((res) => res.json()).then((data) => {
  //     setUser(data);
  //   });
  // }, []);
  getSession()
      .then((session) => {
        Axios.get("http://localhost:3001/get-user", {
          params: { id: session.idToken.payload.sub },
        }).then((res) => {
          setUser({points: res.data[0].points});
        });
      })
      .catch((err) => { // if no session redirect to login
        history.push("./login");
      });


  return user;
}

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm ] = React.useState({
      name: '',
  })
  const history = useHistory();
  const [payMethod, setPayMethod] = React.useState('card');
  const user = useUser();
  const [error, setError] = React.useState(null);

  const handleOnChange = (evt) => {
      setForm(prevState => ({
        ...prevState,
        [evt.target.name]: evt.target.value,
      }));
  }

  const payWithStripe = async () => {

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {

        /**
         * req.body.userid,
      req.body.hotelid,
      req.body.reserveDateStart,
      req.body.reserveDateEnd,
      req.body.guests,
      req.body.totalprice,
      req.body.cancelFee,
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
         */
        //props.hid is hotel id. MAKE A POST REQUEST HERE TO MAKE THE RESERVATION
        

        return_url: "http://localhost:3000/thank-you",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  const payWithPoints = () => {
    setError(null);

    // fetch(config.apiUrl + '/point-payment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: localStorage.getItem('username')
    //   })
    // }).then((res) => {
    //   return res.json();
    // }).then((data) => {
    //   if (!data.success) {
    //     return setError(data.message);;
    //   }





      //props.hid is hotel id. MAKE A POST REQUEST HERE TO MAKE THE RESERVATION
      history.push('/thank-you');
    // }).catch((e) => {
    //   setError(e.response.data.message);
    // })
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();


    if (payMethod === 'card') {
      payWithStripe();
    } else if (payMethod === 'points') {
      payWithPoints();
    }
  };

    return (   
        <div class="center-screen">
            {/* <div class="order-summary">
                <div class="add-space">
                    <p>Order Total:</p>
                </div>
                <div class="add-space">
                    <p>${props.price}</p>
                </div>
                <div class="add-space">
                    <button variant="outlined" onClick={() => setPayMethod('points')}>Apply Points</button>
                </div>
            </div> */}
        <p>Order Total: {payMethod === 'card' ? ("$"+props.price) : (props.price+" points")} <Button onClick={() => {
          payMethod === 'card' ? setPayMethod('points') : setPayMethod('card')
        }}>{payMethod === 'card' ? "Apply Points" : "Pay With Card"}</Button><br/><br/><br/></p>
            
        <form onSubmit={handleSubmit}>
            
            {payMethod === 'card' && (
                <PaymentElement />
            )}
            {payMethod === 'points' && (
            <div>
            {user && <p>You have {user.points} points</p>}
            {error && <p>{error}</p>} <br/><br/>
            </div>
        )}
        <Button type="submit" disabled={!stripe}>
          Payment
        </Button>
        <Button 
          onClick={() => {
            history.push("./catalog");
          }}>
          Cancel
        </Button>
        </form>
       </div>
  )
};

export default CheckoutForm;
