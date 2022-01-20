import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Services/firebase";
import "./Note.css";

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

  function colors(index) {
    if (index % 6 === 0) return "blue";

    if (index % 6 === 1) return "green";

    if (index % 6 === 2) return "yellow";

    if (index % 6 === 3) return "brown";

    if (index % 6 === 4) return "purple";

    if (index % 6 === 5) return "orange";
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <div class="container bootstrap snippets bootdeys">
        <div class="">
          {username != null ? (
            <div>
              {notes.map((note, index) => (
                <div key={note.id}>
                  {note.username === username ? (
                    <>
                      <div class="col-md-4 col-sm-6 content-card">
                        <div class="card-big-shadow">
                          <div
                            class="card card-just-text"
                            data-background="color"
                            data-color={colors(index)}
                            data-radius="none"
                          >
                            {console.log(colors(index))}
                            <div class="content">
                              <h6 class="category">
                                {note.createdAt
                                  .toDate()
                                  .toString()
                                  .slice(0, 25)}
                              </h6>
                              <h4 class="title">{note.roomname}</h4>
                              <p class="description">{note.note}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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
      </div>
    </div>
  );
}

export default Notes;
