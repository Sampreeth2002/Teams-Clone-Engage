import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(authContext.user);
  console.log(user);
  return (
    <div>
      <h1>Welcome back {user.username}</h1>
    </div>
  );
};

export default Home;
