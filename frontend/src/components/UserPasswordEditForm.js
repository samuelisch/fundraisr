import React, { useState } from "react";
import Button from "./assets/Button";
import Input from "./assets/Input";

const UserPasswordEditForm = ({ handleSubmit }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const passwordObj = {
      oldPassword,
      newPassword,
    };

    handleSubmit(passwordObj);
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <>
      <h1 className="text-base font-bold p-2 text-gray-700">Edit Password</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="oldPassword" className="text-gray-700 ml-5">
          Current password:
        </label>
        <Input
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="password"
          name="oldPassword"
          placeholder="Current password"
          value={oldPassword}
          changeHandler={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="newPassword" className="text-gray-700 ml-5">
          New password:
        </label>
        <Input
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="password"
          name="newPassword"
          placeholder="New password"
          value={newPassword}
          changeHandler={(e) => setNewPassword(e.target.value)}
        />
        <Button
          className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case ml-5"
          type="submit"
          text="Update password"
        />
      </form>
    </>
  );
};

export default UserPasswordEditForm;
