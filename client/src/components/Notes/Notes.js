import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Services/firebase";

function Notes() {
  const [notes, setNotes] = useState("");
  const [username, setUsername] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setUsername(authContext.user.username);
  }, []);

  useEffect(() => {
    setNotes([]);
    db.collection("notes")
      .orderBy("createdAt", "desc")
      .onSnapshot(function (querySnapshot) {
        setNotes(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            createdAt: doc.data().createdAt,
            note: doc.data().note,
            roomId: doc.data().roomId,
            roomname: doc.data().roomname,
            username: doc.data().username,
          }))
        );
      });
  }, [username]);

  return (
    <div style={{ marginTop: "150px" }}>
      {username != null ? (
        <div>
          {notes.map((note) => (
            <div key={note.id}>
              {note.username === username ? (
                <div>
                  <p style={{ fontSize: "18px" }}>
                    Team : <b>{note.roomname}</b>
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    {note.createdAt.toDate().toString().slice(0, 25)}
                  </p>
                  <p style={{ fontSize: "20px" }}>Note : {note.note}</p>
                  <br></br>
                </div>
              ) : (
                <> </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Not loaded</p>
        </div>
      )}
    </div>
  );
}

export default Notes;
