import React from 'react'
import SignUp from './Signup'

const SignUpModal = () => {
  return (
    <>
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
  )
}

export default SignUpModal