import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Button from "./assets/Button";

const Navbar = () => {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null)
    navigate("/");
  };

  return (
    <div className="navbar bg-base-200 sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Fundraisr
        </a>
      </div>
      <div className="flex-none gap-2">
        {user
        ?
          <>
            <div className="dropdown dropdown-end">
              <button className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <span onClick={() => navigate(`/profile`)}>
                    Profile
                  </span>
                </li>
                <li>
                  <span onClick={logoutUser}>Logout</span>
                </li>
              </ul>
            </div>
          </>
        :
          <>
            <Button type="button" className="btn rounded-md bg-blue-500 hover:bg-blue-600 border-none" text="login" clickHandler={() => navigate('/login')} />
            <Button type="button" className="btn rounded-md bg-blue-500 hover:bg-blue-600 border-none" text="signup" clickHandler={() => navigate('/signup')} />
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;
