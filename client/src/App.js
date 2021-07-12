import React from "react";
import Navbar from "./components/Navbar/Navbar";
import VideoChat from "./components/VideoCall/VideoChat";
import Home from "./components/Home/Home";
import UserHome from "./components/UserHome";
import Login from "./components/Login";
import Register from "./components/Register";
import JoinVideoChat from "./components/VideoCall/JoinVideoChat";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import Team from "./components/Chat/Team/Team";
import Teams from "./components/Chat/Teams/Teams";
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
            <PrivateRoute path="/home" exact component={UserHome} />
            <UnPrivateRoute path="/login" component={Login} />
            <UnPrivateRoute path="/register" component={Register} />
            <PrivateRoute path="/videoChat" exact component={VideoChat} />
            <PrivateRoute
              path="/videoChat/join/:id"
              component={JoinVideoChat}
            />
            <PrivateRoute path="/teams" exact component={Teams} />
            <PrivateRoute path="/teams/:roomId" exact component={Team} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
