import React, { useEffect, useState } from "react";
import callApi from "../callApi";
import Input from "./assets/Input";
import Button from "./assets/Button";
import tempLogin from "../tempLogin";

const Homepage = () => {
  const [usersList, setUsersList] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    console.log(usersList);
  }, [usersList]);

  const allUsers = async (event) => {
    event.preventDefault();
    const allUsersData = await callApi.allUsers();
    setUsersList(allUsersData);
  };

  const singleUser = async (id) => {
    // event.preventDefault();
    const singleUserData = await callApi.singleUser(id);
    console.log(singleUserData);
  };

  const loginUser = async (e) => {
      e.preventDefault();
      const credentials = {
          email: loginEmail,
          password: loginPassword
      }
      const loginData = await tempLogin.loginUser(credentials)
      console.log(loginData);
  };

  return (
    <div>
      <h1>Homepage</h1>
      <form onSubmit={allUsers}>
        <button type="submit">All Users</button>
      </form>
      <form onClick={() => singleUser("624e57e44f529d34847d5d26")}>
        <button type="submit">Single User</button>
      </form>
      <form onSubmit={loginUser}>
        <Input
          label="login-email"
          type="email"
          value={loginEmail}
          changeHandler={(e) => setLoginEmail(e.target.value)}
          className=""
          placeholder="E-mail"
        />
        <Input
          label="login-password"
          type="password"
          value={loginPassword}
          changeHandler={(e) => setLoginPassword(e.target.value)}
          className=""
          placeholder="Password"
        />
        <Button type="submit" text="Login" className="" />
      </form>
    </div>
  );
};

export default Homepage;
