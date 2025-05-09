import React from "react";

function Button({ title, type, className, onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
