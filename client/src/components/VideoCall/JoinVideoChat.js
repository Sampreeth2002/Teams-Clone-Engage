import React, { useState, useCallback, useEffect, useContext } from "react";
import Room from "./Room/Room";
import { AuthContext } from "../../Context/AuthContext";

const JoinVideoChat = ({ match }) => {
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [roomName, setRoomName] = useState(match.params.id);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUsername(authContext.user.username);
  }, []);

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
