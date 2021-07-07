import React, { useState, useCallback, useEffect } from "react";
import Lobby from "./Lobby";
import Room from "./Room";
import { v4 as uuidv4 } from "uuid";

const JoinVideoChat = ({ match }) => {
  const [username, setUsername] = useState(uuidv4());
  const [roomName, setRoomName] = useState(match.params.id);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyAPI = useCallback(async () => {
    const data = await fetch("/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setToken(data.token);
  }, [username, roomName]);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  let render = "";
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  }
  return render;
};

export default JoinVideoChat;
