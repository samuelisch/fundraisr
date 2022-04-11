import React, { useContext, useState } from "react";
import callApi from "../callApi";
import Input from "./assets/Input";
import Button from "./assets/Button";
import { UserContext } from "../App";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    const credentials = {
      email: loginEmail,
      password: loginPassword,
    };
    const loginData = await callApi.userLogin(credentials);
    // set token to callApi
    callApi.setToken(loginData.token)
    //set token to localStorage
    window.localStorage.setItem('loggedUser', JSON.stringify(loginData));
    setUser(loginData)
    console.log('logged in!');
    //clears form
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div>
      <h1 className="font-bold">Login Form</h1>
      <form onSubmit={loginUser}>
        <Input
          label="login-email"
          type="email"
          value={loginEmail}
          changeHandler={(e) => setLoginEmail(e.target.value)}
          className="border-2 border-blue-600 rounded-lg"
          placeholder="E-mail"
        />
        <br />
        <br />
        <Input
          label="login-password"
          type="password"
          value={loginPassword}
          changeHandler={(e) => setLoginPassword(e.target.value)}
          className="border-2 border-blue-600 rounded-lg"
          placeholder="Password"
        />
        <br />
        <br />
        <Button
          type="submit"
          text="Login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default Login;
