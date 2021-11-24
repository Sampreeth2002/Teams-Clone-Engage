import React, { useState } from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";

function NoteItem({ createdAt, note, checkUser, id }) {
  if (checkUser) {
    return (
      <div style={{ display: "flex" }}>
        <ListItem>
          <p
            key={id}
            className={`chat_message_videoMessage chat_receiver_videoMessage`}
          >
            {note}
            <span className="chat_timestemp_videoMessage">{createdAt}</span>
          </p>
        </ListItem>
      </div>
    );
  } else {
    return "";
  }
}

export default NoteItem;
