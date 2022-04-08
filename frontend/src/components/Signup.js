import React from 'react';
import callApi from '../callApi'
import '../index.css';

const SignUp = () => {

    const createUser = async (name, email, passwordHash) => {
        await callApi.createUser(name, email, passwordHash);
     }


    return (
        <>
           <h1 className="font-bold">Create New User</h1>
    <form onSubmit={createUser}>
        <label htmlFor="username">Username:</label><br></br>
        <input className= "border-2 border-blue-600 rounded-lg" type="text" name="name"/><br></br>
        <label htmlFor='email'>Email:</label><br></br>
        <input className= "border-2 border-blue-600 rounded-lg" type="email" name="email"/><br></br>
        <label htmlFor='password'>Password:</label><br></br>
        <input className= "border-2 border-blue-600 rounded-lg" type="password" name="passwordHash"/><br></br>
        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" value="Submit"/>
      </form>
            
        </>
    );
};

export default SignUp;