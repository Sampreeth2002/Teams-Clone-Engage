import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";

function AddUser({ roomId, roomname }) {
  const [newUser, setNewUser] = useState("");
  const [isPresentUserCollection, setIsPresentUserCollection] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    await db.collection("rooms").doc(roomId).collection("users").add({
      username: newUser,
      admin: false,
    });

    await db.collection("userRooms").add({
      roomId: roomId,
      roomname: roomname,
      username: newUser,
    });

    setNewUser("");
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <Input value={newUser} onChange={(e) => setNewUser(e.target.value)} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

export default AddUser;
