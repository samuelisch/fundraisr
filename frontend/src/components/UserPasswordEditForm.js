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
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="oldPassword">Current password:</label>
      <Input
        className="border-2 border-blue-600 rounded-lg p-1  m-3"
        type="password"
        name="oldPassword"
        placeholder="Current password"
        value={oldPassword}
        changeHandler={(e) => setOldPassword(e.target.value)}
      />
      <label htmlFor="newPassword">New password:</label>
      <Input
        className="border-2 border-blue-600 rounded-lg p-1  m-3"
        type="password"
        name="newPassword"
        placeholder="New password"
        value={newPassword}
        changeHandler={(e) => setNewPassword(e.target.value)}
      />
      <Button
        className="bg-blue-500 text-ml hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        type="submit"
        text="Update password"
      />
    </form>
  );
};

export default UserPasswordEditForm;
