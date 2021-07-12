import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "./UserHome.css";
const Home = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(authContext.user);
  const [code, setCode] = useState("");
  return (
    <div className="userhome_container">
      <div className="userhome">
        <h1>Welcome back {user.username}</h1>

        <div className="your_teams">
          <Link to={`/teams`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{ padding: "1ww", backgroundColor: "#b9bbdf" }}
            >
              Your Teams
              <i class="fas fa-users" style={{ marginLeft: "5px" }}></i>
            </Button>
          </Link>
        </div>

        <div className="join_meeting">
          <Link to="/VideoChat" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              className="instant_meeting"
              style={{ padding: "1vw", backgroundColor: "#b9bbdf" }}
            >
              Instant Meeting{" "}
              <i class="fas fa-video" style={{ marginLeft: "5px" }}></i>
            </Button>
          </Link>

          <TextField
            id="outlined-search"
            label="Meeting Code"
            type="Meeting Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Link
            to={`/VideoChat/join/${code}`}
            style={{ textDecoration: "none" }}
          >
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
