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

const RegisterLogin = () => {
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const classes = useStyles();
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUserName,
        password: registerPassword,
        email: registerEmail,
      },
      withCredentials: true,
      url: "/register",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <h1>Register an Account</h1>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              type="text"
              placeholder="Email Id"
              onChange={(e) => setRegisterEmail(e.target.value)}
              // label="Outlined"
              // variant="outlined"
            />
          </div>
          <div>
            <TextField
              type="text"
              placeholder="Username"
              onChange={(e) => setRegisterUserName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="text"
              placeholder="Password"
              onChange={(e) => setRegisterPassword(e.target.value)}
              // label="Outlined"
              // variant="outlined"
            />
          </div>
          <div>
            <Button
              type="submit"
              onClick={register}
              color="primary"
              // variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterLogin;
