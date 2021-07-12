import React from "react";
import img1 from "../../Images/4457.jpg";
import "./Home.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div style={{ paddingTop: "20vh" }}>
      <div className="home_container">
        <div className="home_text">
          <span className="microsoft_teams">Microsoft Teams</span>
          <p>Meet, chat, call, and collaborate in just one place.</p>
          <div className="home_buttons">
            <div className="home_login">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  style={{ padding: "2vh 4vw" }}
                >
                  Login
                </Button>
              </Link>
            </div>
            <div className="home_register">
              <Link style={{ textDecoration: "none" }} to="/register">
                <Button
                  variant="contained"
                  style={{
                    padding: "2vh 4vw",
                    backgroundColor: "#878ecd",
                    color: "white",
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="home_image">
          <img src={img1} alt="Sampreeth" />
        </div>
      </div>
    </div>
  );
};

export default Home;
