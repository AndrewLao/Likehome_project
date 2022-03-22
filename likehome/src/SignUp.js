import React, { useState } from "react";
import { Grid, TextField, Button, Typography,Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './LoginSignup.css';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const textStyle = {margin:'10px 0px 0px'}

    function validateForm() {
        return firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="loginSignup">
            <Grid align='center'>
                <h2>Sign Up</h2>
            </Grid>
            <TextField label='First Name' placeholder='Enter first name' variant='outlined' style={textStyle} fullWidth required/>
            <TextField label='Last Name' placeholder='Enter last name' variant='outlined' style={textStyle} fullWidth required/>
            <TextField label='Email Address' placeholder='Enter email address' variant='outlined' style={textStyle} fullWidth required/>
            <TextField label='Password' placeholder='Enter password' type='password' variant='outlined' style={textStyle} fullWidth required/>
            <FormControlLabel
                control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                }style={textStyle}
                label="Remember me"
            />
            <Button type='submit' variant="contained" fullWidth>Sign Up</Button>
            <Typography style={textStyle}> Already have an account?&nbsp;
                <Link href="./Login" >
                    Login
                </Link>
            </Typography>
        </div>
        
    );
}

export default SignUp;