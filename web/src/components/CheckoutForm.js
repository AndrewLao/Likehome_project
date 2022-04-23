import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button, TextField } from '@mui/material';
import React from 'react';

const fields = [
    {
        name: 'name',
    },
];

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm ] = React.useState({
      name: '',
  })

  const handleOnChange = (evt) => {
      setForm(prevState => ({
        ...prevState,
        [evt.target.name]: evt.target.value,
      }));
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/* {fields.map((field) => (
          <div>
              <label>
                  {field.name}
                  <TextField variant="outlined" name={field.name} value={form.name} onChange={handleOnChange} />
              </label>
          </div>
      ))} */}
      <Button type="submit" disabled={!stripe}>
        Payment
      </Button>
    </form>
  )
};

export default CheckoutForm;
