import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "@material-ui/core";
import "./Chatchat.css";

function Team(props) {
  const authContext = useContext(AuthContext);
  let roomId = props.roomId;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomname(snapshot.data().name);
        });

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
    setUsername(authContext.user.username);
  }, []);

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
    <div className="chat_videoMessage">
      <div>
        <div className="chat_header_videoMessage">
          <div className="chat_headerInfo_videoMessage">
            <h3 className="chat-room-name_videoMessage">{roomname} </h3>
          </div>
        </div>
        <div className="chat_body_videoMessage">
          {messages.map((message) => (
            <p
              className={`chat_message_videoMessage ${
                message.data.username === username &&
                "chat_receiver_videoMessage"
              }`}
            >
              {message.data.username === username ? (
                ""
              ) : (
                <span className="chat_name_videoMessage">
                  {message.data.username}
                </span>
              )}

              {message.data.text}
              <span className="chat_timestemp_videoMessage">
                {new Date(message.data.createdAt?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
        <div className="chat_footer_videoMessage">
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Team;
