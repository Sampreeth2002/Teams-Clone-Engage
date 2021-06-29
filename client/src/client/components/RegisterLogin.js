import React, { useState } from "react";
import axios from "axios";

const RegisterLogin = () => {
  const [registerUserName, setRegisterUserName] = useState("");
  const [LoginUserName, setLoginUserName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: LoginUserName,
        password: LoginPassword,
      },
      withCredentials: true,
      url: "/login",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUserName,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
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

  return (
    <>
      <div>
        <h1>This is Registration</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setRegisterUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Submit
        </button>
      </div>

      <div>
        <h1>This is Login</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setLoginUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Submit
        </button>
      </div>

      <div>
        <h1>Get User</h1>
        <button type="submit" onClick={getUser}>
          Submit
        </button>
        {data.username ? <h1>Welcome Back {data.username} </h1> : null}
      </div>
    </>
  );
};

export default RegisterLogin;
