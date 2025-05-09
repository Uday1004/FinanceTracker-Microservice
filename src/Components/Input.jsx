import React from "react";

function Input({ placeholder, type, id, title, value, onChange, ref }) {
  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label mb-0">
        {title}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
}

export default Input;
