import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ id, name, glass, info, picture }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={picture} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`}>Details</Link>
      </div>
    </article>
  );
};

export default Cocktail;
