import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import callApi from "../callApi";
import Button from "./assets/Button";
import Input from "./assets/Input";

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valid, setValid] = useState(false);
  const authenticated = window.localStorage.getItem('loggedUser')

  useEffect(() => {
    if (authenticated) {
      console.log('checking')
      navigate('/')
    }
  }, [authenticated, navigate])

  useEffect(() => {
    if (confirmPassword !== "" && confirmPassword === password) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [confirmPassword, password])

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await callApi.createUser(name, email, password);
      console.log(createdUser);
      //clear form
      setName("");
      setEmail("");
      setPassword("");
      navigate('/login')
    } catch (err) {
      console.error(err);
      setPassword("");
    }
  };

  return (
    <div className="flex-col items-center justify-center text-center">
      <h1 className="font-bold text-2xl p-5">Sign up with Fundraisr</h1>
      <form onSubmit={createUser} className="flex flex-col items-center justify-center">
        <Input
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="text"
          value={name}
          placeholder="Name"
          changeHandler={(e) => setName(e.target.value)}
          minLength={2}
        />
        <Input 
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="email"
          value={email}
          placeholder=" New email"
          changeHandler={(e) => setEmail(e.target.value)}
          minLength={3}
        />
        <Input
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="password"
          value={password}
          placeholder="New password"
          changeHandler={(e) => setPassword(e.target.value)}
          minLength={5}
        />
        <Input
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          changeHandler={(e) => setConfirmPassword(e.target.value)}
          minLength={5}
        />
        {valid
        ?
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            type="submit"
            text="Signup"
            disabled={false}
          />
        :
          <Button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2"
            type="submit"
            text="Signup"
            disabled={true}
          />
        }
      </form>
      <p className="p-5 text-sm">Have an account? <span className="text-blue-500 hover:text-blue-700 hover: cursor-pointer" onClick={() => navigate('/login')}>Log in</span></p>
    </div>
  );
};

export default Signup;
