import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

//Updates user and password and to authService which send to back-end to check credinals
const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Send username and password to AuthService and return the value
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/home");
      } else setMessage(message);
    });
  };

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 330,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <div
      style={{
        marginTop: "10%",
      }}
    >
      <Grid>
        <form onSubmit={onSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="Username"
              placeholder="Enter username"
              onChange={onChange}
              name="username"
              fullWidth
              required
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              onChange={onChange}
              name="password"
              type="password"
              fullWidth
              required
            />
            <br />
            <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign in
            </Button>
            <br />
            <br />
            <Typography>
              Create a new account <Link href="/register">Sign Up</Link>
            </Typography>
          </Paper>
        </form>
        {message ? <Message message={message} /> : null}
      </Grid>
    </div>
  );
};

export default Login;
