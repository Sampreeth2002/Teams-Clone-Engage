import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";
import "./HomeChat.css";
function HomeChat() {
  return (
    <div className="homeChat_app">
      <div className="homeChat_app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/chatRoom/:roomId">
              <ChatRoom />
            </Route>
            <Route path="/chat">
              <ChatRoom />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default HomeChat;
