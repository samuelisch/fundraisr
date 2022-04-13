import React from "react";
import Button from "./assets/Button";
import Input from "./assets/Input";

const UserEditForm = ({
  name,
  email,
  changeNameHandler,
  changeEmailHandler,
  handleSubmit,
}) => {
  return (
    <>
      <h1 className="text-base font-bold p-2 text-gray-700">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameEdit" className="text-gray-700 ml-5">
          Name:
        </label>
        <Input
          className="border-2 border-blue-600 rounded-lg p-1  m-3"
          type="text"
          name="nameEdit"
          value={name}
          placeholder="Name"
          changeHandler={(e) => changeNameHandler(e.target.value)}
          minLength={2}
        />
        <label htmlFor="emailEdit" className="text-gray-700 ml-5">
          Email:
        </label>
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
          className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case ml-5"
          type="submit"
          text="Update profile"
        />
      </form>
    </>
  );
};

export default UserEditForm;
