import React, { useState, useCallback, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Lobby from "./Lobby/Lobby";
import Room from "./Room/Room";
import { AuthContext } from "../../Context/AuthContext";

const VideoChat = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState(uuidv4());
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUsername(authContext.user.username);
  }, []);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = await fetch("/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          // room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [username, roomName]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
