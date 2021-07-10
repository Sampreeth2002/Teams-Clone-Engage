import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import firebase from "firebase";
import { AuthContext } from "../../Context/AuthContext";

const SendMessage = ({ roomId }) => {
  const authContext = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(authContext.user);
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    await db.collection("rooms").doc(roomId).collection("messages").add({
      username: user.username,
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default SendMessage;
