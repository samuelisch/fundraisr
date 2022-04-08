import React, { useState } from "react";
import callApi from "../callApi";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const createUser = async (e) => {
    e.preventDefault()
    const createdUser = await callApi.createUser(name, email, password);
    console.log(createdUser)
  };

  return (
    <>
      <h1 className="font-bold">Create New User</h1>
      <form onSubmit={createUser}>
        <label htmlFor="username">Username:</label>
        <br></br>
        <input
          className="border-2 border-blue-600 rounded-lg"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <label htmlFor="email">Email:</label>
        <br></br>
        <input
          className="border-2 border-blue-600 rounded-lg"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">Password:</label>
        <br></br>
        <input
          className="border-2 border-blue-600 rounded-lg"
          type="password"
          name="passwordHash"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default SignUp;
