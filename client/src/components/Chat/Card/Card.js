import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card__body">
        {/* <img src={props.img} class="card__image" alt="" /> */}
        <h2 className="card__title">{props.name}</h2>
        {/* <p className="card__description">{props.description}</p> */}
      </div>
      <Link to={`/teams/${props.id}`}>
        <button className="card__btn">Go to Team</button>
      </Link>
    </div>
  );
}

export default Card;
