import React, { useContext, useState } from "react";
import callApi from "../callApi";
import Input from "./assets/Input";
import Button from "./assets/Button";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
    navigate('/')
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-2xl p-5">Login to Fundraisr</h1>
      <form onSubmit={loginUser} className="flex flex-col items-center justify-center">
        <Input
          label="login-email"
          type="email"
          value={loginEmail}
          changeHandler={(e) => setLoginEmail(e.target.value)}
          className="border-2 border-blue-600 rounded-lg p-1 m-3"
          placeholder="E-mail"
        />
        <Input
          label="login-password"
          type="password"
          value={loginPassword}
          changeHandler={(e) => setLoginPassword(e.target.value)}
          className="border-2 border-blue-600 rounded-lg p-1 m-3"
          placeholder="Password"
        />
        <Button
          type="submit"
          text="Login"
          className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        />
      </form>
      <p className="p-5 text-sm">New to Fundraisr? <span className="text-blue-500 hover:text-blue-700 hover: cursor-pointer" onClick={() => navigate('/signup')}>Sign up with us</span></p>
    </div>
  );
};

export default Login;
