import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import config from '../../../config'
import CheckoutForm from './CheckoutForm'

const PUBLIC_KEY = "pk_test_51KqTEqDA7Rn06lEUsFeyQeWifhB8uNJtiQxMTMRSdj6PzUCWAbVq0bYnN9pYsEDHXSu0sO3JMsI35xXBAhD66BFu000HldkdsD"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(){
    const [clientSecret, setClientSecret] = React.useState('');

    React.useEffect(() =>{
        const request = async () => {
            const customer = await fetch(`${config.apiUrl}/customer`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json());
    
            fetch(`${config.apiUrl}/payment`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 100,
                    customer_id: customer.customer_id,
                }),
            }).then((resp) => {
                return resp.json();
            }).then((data) => {
                setClientSecret(data.clientSecret);
            });
        }

        request();
    }, []);

    const options = {
        clientSecret,
    }

    if (!clientSecret) {
        return <div />;
    }

    return(
        <Elements stripe={stripeTestPromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
}