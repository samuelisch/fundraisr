import React, { useContext, useEffect, useState } from "react";
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
  const authenticated = window.localStorage.getItem("loggedUser");

  const [loginValidation, setLoginValidation] = useState("");

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        email: loginEmail,
        password: loginPassword,
      };
      const loginData = await callApi.userLogin(credentials);
      // set token to callApi
      callApi.setToken(loginData.token);
      //set token to localStorage
      window.localStorage.setItem("loggedUser", JSON.stringify(loginData));
      //clears form
      setLoginEmail("");
      setLoginPassword("");
      setLoginValidation("");
      setUser(loginData);
      navigate("/");
    } catch (error) {
      setLoginValidation("Incorrect email / password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-2xl p-5 text-gray-700">
        Login to Fundraisr
      </h1>
      <form
        onSubmit={loginUser}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-red-600">{loginValidation}</h1>
        <Input
          label="login-email"
          type="email"
          value={loginEmail}
          changeHandler={(e) => setLoginEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          label="login-password"
          type="password"
          value={loginPassword}
          changeHandler={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          type="submit"
          text="Login"
          className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case"
        />
      </form>
      <p className="p-5 text-sm">
        New to Fundraisr?{" "}
        <span
          className="text-primary hover:text-primary hover: cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up with us
        </span>
      </p>
    </div>
  );
};

export default Login;
