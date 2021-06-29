import React from "react";
import "./App.css";
import VideoChat from "./client/components/VideoChat";
import JoinVideoChat from "./client/components/JoinVideoChat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Video Chat</h1>
        </header>
        <Switch>
          {/* Creating Video Chat Link */}
          <Route path="/videoChat" exact component={VideoChat} />
          {/* Joining through link */}
          <Route path="/videoChat/join/:id" component={JoinVideoChat} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
