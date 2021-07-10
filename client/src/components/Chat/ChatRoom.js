import React, { useState, useEffect, useContext } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { db } from "../../firebase";
import SendMessage from "./SendMessage";
import AddUser from "./AddUser";
import { AuthContext } from "../../Context/AuthContext";
// import "./ChatRoom.css";

function Room() {
  const authContext = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  let { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const user = authContext.user;

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
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
    setUsername(authContext.user.username);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      text: input,
      username: user.username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  // useEffect(() => {
  //   db.collection("rooms")
  //     .doc(roomId)
  //     .onSnapshot((snapshot) =>
  //       setRoomName(snapshot.docs.map((doc) => doc.data().name))
  //     );
  // }, []);

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

  // return (
  //   <div>
  //     Room : {roomId}
  //     <SendMessage roomId={roomId} />
  //     {messages.map((message) => (
  //       <p key={message.messageId}>
  //         {message.data.username} : {message.data.text} :
  //         {new Date(message.data.createdAt?.toDate()).toUTCString()}
  //       </p>
  //     ))}
  //     {/* {users} */}
  //     <h1>Users of {roomId} </h1>
  //     {users.map((user) => (
  //       <p key={user.userId}>
  //         {user.data.username} : {user.data.admin ? "true" : "false"} :
  //         {user.data.username === username && user.data.admin ? (
  //           <AddUser roomId={roomId} />
  //         ) : (
  //           ""
  //         )}
  //       </p>
  //     ))}
  //   </div>
  // );

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3 className="chat-room-name">{roomName}</h3>
          <p className="chat-room-last-seen">
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.data.createdAt?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.data.username === username && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.data.username}</span>
            {message.data.text}
            <span className="chat_timestemp">
              {new Date(message.data.createdAt?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Room;
