import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Link } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./LoginSignup.css";
import { signup } from "../../Backend/auth.js";

function SignUp() {
  const [cred, setCred] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    remember: false,
  });
  const textStyle = { margin: "10px 0px 0px" };

  function handleSubmit(e) {
    signup(cred.firstName, cred.lastName, cred.email, cred.password);
  }

  return (
    <div className="loginSignup">
      <Grid align="center">
        <h2>Sign Up</h2>
      </Grid>
      <TextField
        label="First Name"
        placeholder="Enter first name"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, firstName: e.target.value })}
        style={textStyle}
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        placeholder="Enter last name"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, lastName: e.target.value })}
        style={textStyle}
        fullWidth
        required
      />
      <TextField
        label="Email Address"
        placeholder="Enter email address"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, email: e.target.value })}
        style={textStyle}
        fullWidth
        required
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
        style={textStyle}
        fullWidth
        required
      />
      <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" />}
        onChange={(e) => setCred({ ...cred, remember: e.target.checked })}
        style={textStyle}
        label="Remember me"
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        fullWidth
      >
        Sign Up
      </Button>
      <Typography style={textStyle}>
        {" "}
        Already have an account?&nbsp;
        <Link href="./Login">Login</Link>
      </Typography>
    </div>
  );
}

export default SignUp;
