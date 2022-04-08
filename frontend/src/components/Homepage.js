import React, { useEffect, useState } from "react";
import callApi from "../callApi";
import Signup from "./Signup";
import Login from "./Login";

const Homepage = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    console.log(usersList);
  }, [usersList]);

  const allUsers = async (event) => {
    event.preventDefault();
    const allUsersData = await callApi.allUsers();
    setUsersList(allUsersData);
  };

  const singleUser = async (event, id) => {
    event.preventDefault();
    const singleUserData = await callApi.singleUser(id);
    console.log(singleUserData);
  };

  return (
    <div>
      <h1 className="font-bold">Homepage</h1>
      <div className="flex flex-col space-y-4">
        <form onSubmit={allUsers}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            All Users
          </button>
        </form>
        <form onClick={(e) => singleUser(e, "624fa0568a6bab944590126f")}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Single User
          </button>
        </form>
        <Signup />
        <Login />
      </div>
    </div>
  );
};

export default Homepage;
