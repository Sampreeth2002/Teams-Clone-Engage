import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import firebase from "firebase";
import { db } from "../../../Services/firebase";
import { AuthContext } from "../../../Context/AuthContext";
import AddUser from "./AddUser";
import { Button } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import "./Team.css";

function Team() {
  const authContext = useContext(AuthContext);
  let { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

  useEffect(() => {
    if (roomId) {
      //Updates roomname using roomid
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomname(snapshot.data().name);
        });

      //get previous message of the room
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              messageId: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [roomId]);

  useEffect(() => {
    //gets the users of the given roomid
    db.collection("rooms")
      .doc(roomId)
      .collection("users")
      .onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            roomId: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    //updates username of user
    setUsername(authContext.user.username);
  }, []);

  const videoMeeting = () => {};

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      text: input,
      username: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div>
        <div className="chat_header">
          <div className="chat_headerInfo">
            <h3 className="chat-room-name">{roomname} </h3>
          </div>
          <div className="chat_headerRight"></div>
        </div>
        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={`chat_message ${
                message.data.username === username && "chat_receiver"
              }`}
            >
              {message.data.username === username ? (
                ""
              ) : (
                <span className="chat_name">{message.data.username}</span>
              )}

              {message.data.text}
              <span className="chat_timestemp">
                {new Date(message.data.createdAt?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
        <div className="chat_footer">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Type a message"
            />
            <Button type="submit" onClick={sendMessage}>
              Send
            </Button>
            <Link
              to={`/videoChat/join/${roomId}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                className="video_meeting"
                variant="contained"
                color="primary"
                onClick={videoMeeting}
                style={{ backgroundColor: "#878ECD" }}
              >
                Meeting{" "}
                <i
                  class="fas fa-video"
                  style={{
                    marginTop: "1px",
                    marginLeft: "4px",
                  }}
                ></i>
              </Button>
            </Link>
          </form>
        </div>
      </div>

      <div>
        <div style={{ paddingTop: "7vh", paddingLeft: "5vw" }}>
          <h2>Team Users</h2>
        </div>
        <div>
          {users.map((user) => (
            <ListItem>
              <ListItemText
                primary={user.data.username}
                style={{
                  width: "50%",
                  margin: "0 10px",
                  textAlign: "center",
                  padding: "8px 0",
                  backgroundColor: "#a6e3e9",
                }}
              />
            </ListItem>
          ))}
        </div>

        <div>
          {/* Checks user is admin or not */}
          {users.map((user) => (
            <div>
              {user.data.username === username && user.data.admin === true ? (
                <AddUser roomId={roomId} roomname={roomname} />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
