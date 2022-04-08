import React from 'react';
import Login from './Login';

const LoginModal = () => {
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
    </>
  )
}

export default LoginModal
