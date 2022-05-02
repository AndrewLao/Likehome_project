import React from 'react';
import "./thankyou.css";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';

function ThankYou() {
    let history = useHistory();
    setTimeout(() => {history.push("./account")}, 4000);
    return (
        <div className='thankyou'>
            <h1 className='thankyou-text'>Thank You For Your Purchase</h1>
            <h1 className='thankyou-text'>Redirecting To Your Account Page... </h1>            
            <Stack alignItems="center">
                <CircularProgress sx={{marginTop: "7vh", color: "white"}}/>
            </Stack>
        </div>
        
        
    )
}

export default ThankYou;