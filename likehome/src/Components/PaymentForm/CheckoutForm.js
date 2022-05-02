import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button, TextField } from '@mui/material';
import React, {useState, useEffect} from 'react';
import config from '../../config';
import { useHistory } from 'react-router-dom';
import "./CheckoutForm.css";
import { getSession } from "../../Backend/auth.js";
import Axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const fields = [
    {
        name: 'name',
    },
];

const useUser = () => {
  const [user, setUser] = useState(null);
  let history = useHistory();
  
  getSession()
      .then((session) => {
        Axios.get(`${config.apiUrl}/get-user`, {
          params: { id: session.idToken.payload.sub },
        }).then((res) => {
          setUser({id: session.idToken.payload.sub, points: res.data[0].points});
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
  const [form, setForm ] = useState({
      name: '',
  })
  const history = useHistory();
  const [payMethod, setPayMethod] = useState('card');
  const user = useUser();
  const [error, setError] = useState(null);

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
      redirect: "if_required" //makes it so that return_url is not required
    });

    if (result.error) {
      console.log(result.error.message);
    } else { 
      Axios.post(`${config.apiUrl}/create-reservation`, {
          params: { userid: user.id, hotelid: props.hid, reserveDateStart: props.reserveData.startDate, 
            reserveDateEnd: props.reserveData.endDate, guests: props.reserveData.noOfGuests, total: props.price, fee: 50},
        })
      Axios.put(`${config.apiUrl}/point-add`, {
        params: {userid: user.id, points: props.price},
      });
      console.log("payment successful");
      history.push('./thank-you');
    }
  }

  const payWithPoints = () => {
    setError(null);
    if (user.points >= props.price) {
      Axios.put(`${config.apiUrl}/point-payment`, {
        params: {userid: user.id, points: props.price},
      })
      //After subtracting points, make a post request to create reservation
      Axios.post(`${config.apiUrl}/create-reservation`, {
        params: { userid: user.id, hotelid: props.hid, reserveDateStart: props.reserveData.startDate, 
          reserveDateEnd: props.reserveData.endDate, guests: props.reserveData.noOfGuests, total: props.price, fee: 50},
      })
      console.log("payment successful");
      history.push('./thank-you');
    } else {
      toast.error("not enough points");
    }
    
    

    // }).catch((e) => {
    //   setError(e.response.data.message);
    // })
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();


    if (payMethod === 'card') {
      const res = await payWithStripe();
      if (res === null) {
        Axios.post(`${config.apiUrl}/create-reservation`, {
          params: { userid: user.id, hotelid: props.hid, reserveDateStart: props.reserveData.startDate, 
            reserveDateEnd: props.reserveData.endDate, guests: props.reserveData.noOfGuests, totalprice: props.price, cancelFee: 50},
        }).then((res) => {
          console.log("payment successful")
        });
      }
    } else if (payMethod === 'points') {
      payWithPoints();
    }
  };

    return (   
        <div class="center-screen">
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
