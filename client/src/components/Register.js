import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  //Updates username,password,email states
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", email: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Sends the details to AuthService for signup request
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  const paperStyle = {
    padding: "30px 20px",
    width: 350,
    height: "65vh",
    margin: "20px auto",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  return (
    <div
      style={{
        marginTop: "10%",
      }}
    >
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={onChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={onChange}
            />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              value={user.password}
              onChange={onChange}
              name="password"
            />
            {/* <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="I accept the terms and conditions."
            /> */}
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </form>
          {message ? <Message message={message} /> : null}
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
