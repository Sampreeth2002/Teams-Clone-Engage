import React from "react";
import "./Lobby.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

//handle submit returns to the room for the given roomId
const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}) => {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  return (
    <div className="lobby_container">
      <div className="lobby">
        <div className="card">
          <div className="contain">
            <div className="enter_room">
              <h2>Enter the room</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="name">
                <TextField
                  label="Enter your username"
                  type="text"
                  id="field"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="submit_button">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
