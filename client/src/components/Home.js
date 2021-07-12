import React from "react";
import img1 from "../Images/4457.jpg";
import "./Home.css";
const Home = () => {
  return (
    <div style={{ paddingTop: "20vh" }}>
      <div className="home_container">
        <div className="home_text">
          <h2>Microsoft Teams</h2>
          <p>Meet, chat, call, and collaborate in just one place.</p>
        </div>
        <div className="home_image">
          <img src={img1} alt="Sampreeth" />
        </div>
      </div>
    </div>
  );
};

export default Home;
