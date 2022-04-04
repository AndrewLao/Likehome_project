import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Link } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./LoginSignup.css";
import { login } from "../../Backend/auth.js";
import { useHistory } from "react-router-dom";

function Login(props) {
  let history = useHistory();
  const [cred, setCred] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isValid, setValid] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const textStyle = { margin: "10px 0px 0px" };

  // cognito integration
  const handleSubmit = async (e) => {
    login(cred.email, cred.password)
      .then((data) => {
        console.log("Logged in!", data);
        setValid(true);
        setErrMsg("");
        history.push("./home");
      })
      .catch((err) => {
        console.error("Failed to login", err);
        setValid(false);
        setErrMsg("Incorrect username/password");
      });
  };

  return (
    <div className="loginSignup">
      <Grid align="center">
        <h2>Login</h2>
      </Grid>
      <TextField
        label="Email Address"
        placeholder="Enter email address"
        variant="outlined"
        style={textStyle}
        error={!isValid}
        onChange={(e) => setCred({ ...cred, email: e.target.value })}
        fullWidth
        required
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        variant="outlined"
        style={textStyle}
        error={!isValid}
        helperText={errMsg}
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
        fullWidth
        required
      />
      <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" />}
        style={textStyle}
        label="Remember me"
        onChange={(e) => setCred({ ...cred, remember: e.target.checked })}
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        fullWidth
      >
        Login
      </Button>

      <Typography style={textStyle}>
        <Link href="./forgotPassword">Forgot password?</Link>
      </Typography>
      <Typography style={textStyle}>
        {" "}
        Do you have an account?&nbsp;
        <Link href="./SignUp">Sign Up</Link>
      </Typography>
    </div>
  );
}

export default Login;
