import React, { useState, useContext } from "react";
import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <h1 className="navbar-logo">
          Teams <i className="fas fa-users"></i>
        </h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <Button>Sign up</Button> */}
        {/* <Link className="nav-links" to="/register">
          <Button className="navbar_button">Sign up</Button>
          Sign up
        </Link> */}
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <h1 className="navbar-logo">
          Teams <i className="fas fa-users"></i>
        </h1>
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            if (item.title !== "Login") {
              if (item.title !== "Sign Up") {
                return (
                  <li key={index}>
                    <Link className={item.cName} to={item.url}>
                      {item.title}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <Button
                    className="navbar_button"
                    onClick={onClickLogoutHandler}
                  >
                    Logout
                  </Button>
                );
              }
            }
          })}
        </ul>
      </>
    );
  };

  return (
    <nav className="navbarItems">
      {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
    </nav>
  );
};

export default Navbar;
