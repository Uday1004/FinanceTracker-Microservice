import React from "react";

function Form({ title, children, funcName }) {
  return (
    <form className="w-30  mt-2 gx-5 mb-lg-0" onSubmit={funcName}>
      <div className="card p-3 ">
        <div className=" display-5 text-primary py-2">{title}</div>
        {children}
      </div>
    </form>
  );
}

export default Form;
