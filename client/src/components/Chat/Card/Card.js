import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

//Returns Card with styling
function Card(props) {
  return (
    <div className="card" key={props.id}>
      <div className="card__body">
        <h2 className="card__title">{props.name}</h2>
      </div>
      <Link to={`/teams/${props.id}`}>
        <button className="card__btn">Go to Team</button>
      </Link>
    </div>
  );
}

export default Card;
