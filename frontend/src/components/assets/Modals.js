import React from "react";
import Login from "../Login";
import SignUp from "../Signup";

const Modals = () => {
  return (
    <>
      <input type="checkbox" id="login" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="login"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Login />
        </div>
      </div>
      <input type="checkbox" id="signup" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="signup"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default Modals;
