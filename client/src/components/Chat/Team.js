import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import AddUser from "./AddUser";
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
    console.log(input);
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
          {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
          <div className="chat_headerInfo">
            <h3 className="chat-room-name">{roomname}</h3>
          </div>
          <div className="chat_headerRight">
            {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton> */}
          </div>
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
            <button type="submit" onClick={sendMessage}>
              Send a Message
            </button>
          </form>
        </div>
      </div>

      <div>
        <div>
          <h2>Team Users</h2>
        </div>
        <div>
          {users.map((user) => (
            <li>{user.data.username}</li>
          ))}
        </div>

        <div>
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
