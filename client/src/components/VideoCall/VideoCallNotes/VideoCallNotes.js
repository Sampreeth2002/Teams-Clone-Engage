import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { db } from "../../../Services/firebase";
import NoteItem from "./Note";
import CustomizedDialogs from "./dialog";
import { AuthContext } from "../../../Context/AuthContext";
import { Button } from "@material-ui/core";
import "./VideoCallChat.css";

function Notes(props) {
  const authContext = useContext(AuthContext);
  let roomId = props.roomId;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

  useEffect(() => {
    setUsername(authContext.user.username);
  }, []);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomname(snapshot.data()?.name);
        });

      db.collection("notes")
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              note: doc.data().note,
              username: doc.data().username,
              roomId: doc.data().roomId,
              roomname: doc.data().roomname,
              createdAt: doc.data().createdAt,
            }))
          )
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("notes").add({
      note: input,
      roomId: roomId,
      roomname: roomname,
      username: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <CustomizedDialogs>
      <div className="chat_videoMessage">
        <div>
          <div className="chat_header_videoMessage">
            <div className="chat_headerInfo_videoMessage">
              <h3 className="chat-room-name_videoMessage">{roomname} </h3>
            </div>
          </div>
          <div className="chat_body_videoMessage">
            {messages.map((message) => (
              <NoteItem
                checkUser={
                  message.username === username && message.roomname === roomname
                }
                note={message.note}
                createdAt={new Date(message.createdAt?.toDate()).toUTCString()}
                id={String(
                  new Date(message.createdAt?.toDate()).toUTCString() + username
                )}
              />
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
    </CustomizedDialogs>
  );
}

export default Notes;
