import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState("");
  const classes = useStyles();

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUserName,
        password: loginPassword,
        email: loginEmail,
      },
      withCredentials: true,
      url: "/login",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/user",
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <h1>Login to Account</h1>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              type="text"
              placeholder="Email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              placeholder="username"
              onChange={(e) => setLoginUserName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              placeholder="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          <button type="submit" onClick={login}>
            Submit
          </button>
        </form>
      </div>

      <br />
      <div style={{ textAlign: "center" }}>
        <h1>Get User</h1>
        <button type="submit" onClick={getUser}>
          Submit
        </button>
        {data.username ? <h1>Welcome Back {data.username} </h1> : null}
      </div>
    </>
  );
};

export default Login;
