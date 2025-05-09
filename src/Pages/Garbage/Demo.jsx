// App.js

import React, { useRef, useState } from "react";
import { Modal } from "../../Utils/Model";
export default function Demo({ onSubmit, open }) {
  // const [open, setOpen] = React.useState(false);

  const testsubmit = (e) => {
    e.preventDefault();
    setItem(testRef.current.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    setOpen(true);
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        padding: 30,
        margin: "auto",
      }}
    >
      <h1 style={{ color: "green" }}>GeeksforGeeks</h1>
      <h4>Modal Component in ReactJS?</h4>
      <button type="button" onClick={handleOpen}>
        Click Me to Open Modal
      </button>
      <Modal isOpen={open}>
        <>
          <form onSubmit={onSubmit}>
            <input type="text" />
            <button type="submit">Submit</button>
            <hr />
            <button onClick={handleClose}>Close</button>
          </form>
          <div className="mt-2">{item}</div>
        </>
      </Modal>
    </div>
  );
}
