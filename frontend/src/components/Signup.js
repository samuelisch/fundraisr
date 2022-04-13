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
      <h1 className="font-bold text-2xl p-5 text-gray-700">Sign up with Fundraisr</h1>
      <form onSubmit={createUser} className="flex flex-col items-center justify-center">
        <Input
          type="text"
          value={name}
          placeholder="Name"
          changeHandler={(e) => setName(e.target.value)}
          minLength={2}
        />
        <Input 
          type="email"
          value={email}
          placeholder="Email"
          changeHandler={(e) => setEmail(e.target.value)}
          minLength={3}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password (min. 5 characters)"
          changeHandler={(e) => setPassword(e.target.value)}
          minLength={5}
        />
        <Input
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          changeHandler={(e) => setConfirmPassword(e.target.value)}
          minLength={5}
        />
        {valid
        ?
          <Button
            className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case"
            type="submit"
            text="Sign up"
            disabled={false}
          />
        :
          <Button
            className="btn rounded-lg bg-gray-100  border-none text-white normal-case"
            type="submit"
            text="Sign up"
            disabled={true}
          />
        }
      </form>
      <p className="p-5 text-sm">Have an account? <span className="text-primary hover:text-primary hover: cursor-pointer" onClick={() => navigate('/login')}>Log in</span></p>
    </div>
  );
};

export default Signup;
