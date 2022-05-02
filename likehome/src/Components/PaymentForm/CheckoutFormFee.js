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

const CheckoutFormFee = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm ] = useState({
      name: '',
  })
  const history = useHistory();
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
      Axios.delete(`${config.apiUrl}/delete-reservation`, {
        params: {reserveid: props.resId}
      })
      props.setCancelForm(false);
      history.push("./thank-you");
    }
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const res = await payWithStripe();
    if (res === null) {
      Axios.post(`${config.apiUrl}/create-reservation`, {
        params: { userid: user.id, hotelid: props.hid, reserveDateStart: props.reserveData.startDate, 
          reserveDateEnd: props.reserveData.endDate, guests: props.reserveData.noOfGuests, totalprice: props.price, cancelFee: 50},
      }).then((res) => {
        console.log("payment successful")
      });
    }
  };

    return (   
      <div class="center-screen">
        <p>Order Total: $50</p>
            
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button type="submit" disabled={!stripe}>
            Payment
          </Button>
          <Button onClick={() => history.push("./account")}>
            Cancel
          </Button>
        </form>
       </div>
  )
};

export default CheckoutFormFee;
