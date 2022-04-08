import React, { useEffect, useState } from "react";
import callApi from "../callApi";
import Signup from "./Signup";
import Login from "./Login";
import mainleft from "../components/assets/images/mainleft.jpg"
import mainright from "../components/assets/images/mainright.jpg"
import Button from "./assets/Button";

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
      <h1 className="font-bold text-center text-xl">Support a cause, show you care.</h1>
      <h1 className="font-bold text-center text-l text-blue-700">I want to...</h1>

      <div className="grid grid-cols-2 gap-4 flex justify-center ">
  <div className="relative h-25">
    <img src={mainleft} className="max-w-full object-contain rounded-lg" alt=""/>
    <Button 
    type="button"
    text="Donate"
    className="h-10 px-5 bg-white text-blue-700 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100 absolute font-bold left-10 top-10"/>
  </div>

  <div className="relative h-25">
    <img src={mainright} className=" object-contain rounded-lg" alt=""/>
    <Button 
    type="button"
    text="Start a Campaign"
    className="h-10 px-5 bg-white text-blue-700 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100 absolute font-bold left-10 top-10"/>
  </div>
 
</div>

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
