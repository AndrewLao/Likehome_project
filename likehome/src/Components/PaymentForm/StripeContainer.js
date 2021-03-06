import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import config from './../../config'
import CheckoutForm from './CheckoutForm'

const PUBLIC_KEY = "pk_test_51KqTEqDA7Rn06lEUsFeyQeWifhB8uNJtiQxMTMRSdj6PzUCWAbVq0bYnN9pYsEDHXSu0sO3JMsI35xXBAhD66BFu000HldkdsD"

const stripeTestPromise = loadStripe(PUBLIC_KEY);


export default function StripeContainer(props){
    const [clientSecret, setClientSecret] = React.useState('');

    const price = Math.round(
            (props.reserveData.price * (props.reserveData.endDate.getTime() - props.reserveData.startDate.getTime())) /
                (1000 * 60 * 60 * 24) + ((props.reserveData.price * (props.reserveData.endDate.getTime() - props.reserveData.startDate.getTime())) /
                (1000 * 60 * 60 * 24)) * 0.1 + ((props.reserveData.price * (props.reserveData.endDate.getTime() - props.reserveData.startDate.getTime())) /
                (1000 * 60 * 60 * 24)) * 0.05);

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
    <>{clientSecret ? 
        <Elements stripe={stripeTestPromise} options={options}>
            <CheckoutForm reserveData={props.reserveData} hid={props.getHotelID.id} price={price}/>
        </Elements>   : <></>}
    </>
        
    )
}