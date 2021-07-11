import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import "./Teams.css";
import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import Button from "@material-ui/core/Button";
import CustomizedDialogs from "../dialog";
import CreateTeam from "./CreateTeam";
import { Link } from "react-router-dom";
function Teams() {
  const authContext = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("");
  const [userRooms, setuserRooms] = useState([]);

  useEffect(() => {
    setuserRooms([]);
    setUsername(authContext.user.username);
  }, []);
  useEffect(() => {
    setuserRooms([]);
    var query = db.collection("userRooms");
    query.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "removed") {
        } else if (change.doc.data().username === username) {
          console.log(change.doc.data().username);
          setuserRooms((oldArray) => [
            ...oldArray,
            {
              id: change.doc.id,
              data: change.doc.data(),
            },
          ]);
        }
      });
    });
  }, [username]);

  return (
    <>
      <div className="team_container" style={{ marginTop: "2vh" }}>
        <CustomizedDialogs>
          <CreateTeam username={username} title="Create Team" />
        </CustomizedDialogs>
        <div className="wrapper">
          {userRooms.map((room) => (
            <Card
              img="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              key={room.id}
              id={room.data.roomId}
              name={room.data.roomname}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Teams;
