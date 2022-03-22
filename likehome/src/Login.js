import React, { useState } from "react";
import { Grid, TextField, Button, Typography,Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./LoginSignup.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const textStyle = {margin:'10px 0px 0px'}

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="loginSignup">
            <Grid align='center'>
                <h2>Login</h2>
            </Grid>
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
            <Button type='submit' variant="contained" fullWidth>Login</Button>
            <Typography style={textStyle}>
                <Link href="./forgotPassword" >
                    Forgot password?
                </Link>
            </Typography>
            <Typography style={textStyle}> Do you have an account?&nbsp;
                <Link href="./SignUp" >
                    Sign Up 
                </Link>
            </Typography>
        </div>
        
    );
}

export default Login;