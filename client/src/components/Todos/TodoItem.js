import React, { useState } from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "../../Services/firebase";

function TodoItem({ id, todo, isInProgress, checkUser }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      isInProgress: !isInProgress,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  if (checkUser) {
    return (
      <div style={{ display: "flex" }}>
        <ListItem key={id}>
          <ListItemText
            primary={todo}
            secondary={isInProgress ? "In Progress" : "Completed"}
          />
        </ListItem>
        <Button onClick={toggleInProgress}>
          {isInProgress ? "Done" : "UnDone"}
        </Button>
        <Button onClick={deleteTodo}>X</Button>
      </div>
    );
  } else {
    return "";
  }
}

export default TodoItem;
