import React from "react";
import Navbar from "./components/Navbar";
import VideoChat from "./components/VideoChat";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import JoinVideoChat from "./components/JoinVideoChat";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <UnPrivateRoute path="/login" component={Login} />
            <UnPrivateRoute path="/register" component={Register} />
            <PrivateRoute path="/videoChat" exact component={VideoChat} />
            <Route path="/videoChat/join/:id" component={JoinVideoChat} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
