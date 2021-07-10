import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import "./Teams.css";
import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";
import Button from "@material-ui/core/Button";
function Teams() {
  const authContext = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("");
  const [userRooms, setuserRooms] = useState([]);

  useEffect(() => {
    console.log("Starting here");
    console.log(authContext.user);
    setUsername(authContext.user.username);
    console.log(username);
    setRooms([]);
    function unsubscribe() {
      db.collection("userRooms").onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    }

    unsubscribe();
  }, []);

  return (
    <>
      <div className="team_container">
        {/* <Button variant="contained" className="create_team">
          Create Team
        </Button>  */}
        {/* {username} */}
        <button className="create_team">Create Team</button>
        <div className="wrapper">
          {rooms.map((room) => (
            <Card
              img="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              key={room.id}
              id={room.data.roomId}
              name={room.data.roomname}
            />
          ))}

          {/* <Card
        title="The Everyday Salad"
        description="Take your boring salads up a knotch. This recipe is perfect for lunch
          and only contains 5 ingredients!"
      /> */}
        </div>
      </div>
    </>
  );
}

export default Teams;
