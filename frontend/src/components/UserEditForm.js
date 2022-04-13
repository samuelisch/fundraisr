import React from 'react';
import Button from './assets/Button';
import Input from './assets/Input';

const UserEditForm = ({ name, email, changeNameHandler, changeEmailHandler, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nameEdit">Name:</label>
      <Input
        className="border-2 border-blue-600 rounded-lg p-1  m-3"
        type="text"
        name="nameEdit"
        value={name}
        placeholder="Name"
        changeHandler={(e) => changeNameHandler(e.target.value)}
        minLength={2}
      />
      <label htmlFor="emailEdit">Email:</label>
      <Input 
        className="border-2 border-blue-600 rounded-lg p-1  m-3"
        type="email"
        name="emailEdit"
        value={email}
        placeholder=" New email"
        changeHandler={(e) => changeEmailHandler(e.target.value)}
        minLength={3}
      />
      <Button 
        className="bg-blue-500 text-ml hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        type="submit" text="Update profile" />
    </form>
  )
}

export default UserEditForm