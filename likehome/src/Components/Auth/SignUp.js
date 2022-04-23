import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Link } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./LoginSignup.css";
import { signup } from "../../Backend/auth.js";
import { useHistory } from "react-router-dom";
import Axios from "axios";

// handles signup with congnito
function SignUp() {
  let history = useHistory();
  const [isValid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [cred, setCred] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    remember: false,
  });
  const textStyle = { margin: "10px 0px 0px" };

  // handles onSubmit
  // adds user to db
  const handleSubmit = async (e) => {
    signup(cred.firstName, cred.lastName, cred.email, cred.password)
      .then((data) => {
        Axios.post('http://localhost:3001/create-user', {
          id: data.userSub, 
          fname: cred.firstName, 
          lname: cred.lastName, 
          email: cred.email
        });
        setValid(true);
        setErrMsg("");
        history.push("./home");
      })
      .catch((err) => {
        setValid(false);
        setErrMsg(err.message);
      });
  };

  // enables enter key submit
  const handleEnterKeyPress = async (e) => {
    if (e.key === "Enter") {
      signup(cred.firstName, cred.lastName, cred.email, cred.password)
      .then((data) => {
        setValid(true);
        setErrMsg("");
        history.push("./home");
      })
      .catch((err) => {
        setValid(false);
        setErrMsg(err.message);
      });
    }
  };
  

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
        error={!isValid}
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        placeholder="Enter last name"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, lastName: e.target.value })}
        style={textStyle}
        error={!isValid}
        fullWidth
        required
      />
      <TextField
        label="Email Address"
        placeholder="Enter email address"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, email: e.target.value })}
        style={textStyle}
        error={!isValid}
        fullWidth
        required
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        variant="outlined"
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
        onKeyDown={handleEnterKeyPress}
        style={textStyle}
        error={!isValid}
        helperText={errMsg}
        inputProps={{ minlength:8 }}
        fullWidth
        required
      />
      <Typography style={textStyle}>
        {" "}
        Minimum 8 characters and at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol&nbsp; 
      </Typography>
      <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" />}
        onChange={(e) => setCred({ ...cred, remember: e.target.checked })}
        style={textStyle}
        error={!isValid}
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
