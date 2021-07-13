import React, { useState, useEffect } from "react";
import { db } from "../../../Services/firebase";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
function CreateChat(props) {
  const [teamName, setTeamName] = useState("");
  const [latestInsert, setLatestInsert] = useState("");

  useEffect(() => {
    if (latestInsert) {
      //adds user and roomname to userRooms collection

      if (latestInsert[0].teamId.length > 1) {
        db.collection("userRooms").add({
          roomId: latestInsert[0].teamId,
          roomname: teamName,
          username: props.username,
        });
      }

      //adds user has admin for the roomId in rooms collection

      db.collection("rooms")
        .doc(latestInsert[0].teamId)
        .collection("users")
        .add({
          username: props.username,
          admin: true,
        });
    }
    setTeamName("");
  }, [latestInsert]);

  const onSubmit = (e) => {
    e.preventDefault();

    db.collection("rooms").add({
      name: teamName,
      date: new Date(),
    });

    //returns latest added room in rooms colelction

    db.collection("rooms")
      .orderBy("date", "asc")
      .limitToLast(1)
      .onSnapshot((snapshot) =>
        setLatestInsert(
          snapshot.docs.map((doc) => ({
            teamId: doc.id,
          }))
        )
      );
  };

  //Return create chat
  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          id="standard-secondary"
          label="Team Name"
          color="primary"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <br />
        <br />
        <Button color="primary" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateChat;
