import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import config from '../../config'
import CheckoutFormFee from './CheckoutFormFee'

const PUBLIC_KEY = "pk_test_51KqTEqDA7Rn06lEUsFeyQeWifhB8uNJtiQxMTMRSdj6PzUCWAbVq0bYnN9pYsEDHXSu0sO3JMsI35xXBAhD66BFu000HldkdsD"

const stripeTestPromise = loadStripe(PUBLIC_KEY);


export default function StripeContainerFee(props){
    const [clientSecret, setClientSecret] = React.useState('');

    const price = 50;

    React.useEffect(() =>{
        const request = async () => {
            const customer = await fetch(`${config.apiUrl}/customer`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: props.fname + " " + props.lname
                })
            }).then((res) => res.json());
    
            fetch(`${config.apiUrl}/payment`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: (price * 100), 
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

    return (
    <>{clientSecret && props.isCancelForm ? 
        <Elements stripe={stripeTestPromise} options={options}>
            <CheckoutFormFee resId={props.resId} setCancelForm={props.setCancelForm}/>
        </Elements>   : <></>}
    </>
        
    )
}