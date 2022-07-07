import "./ButtonSecondary.css";
import React from "react";

function ButtonSecondary({ name, type, onClick }) {
  return (
    <button className="buttonSecondary" onClick={onClick} type={type}>
      {name}
    </button>
  );
}

export default ButtonSecondary;
