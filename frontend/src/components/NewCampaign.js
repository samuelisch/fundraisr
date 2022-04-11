import React, { useState } from "react";
import server from "../callApi";
import Button from "./assets/Button";
import Input from "./assets/Input";

const NewCampaign = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amountTarget, setAmountTarget] = useState('')
  const [image, setImage] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('amountTarget', amountTarget);

    const createdCampaign = await server.createCampaign(formData);
    console.log(createdCampaign);
    setTitle('');
    setDescription('');
    setAmountTarget('');
    setImage([]);
  }

  return (
    <>
    <h1 className="font-bold">Create New Campaign</h1>
    <form onSubmit={submitHandler}>
    <label htmlFor="title">Title:</label>
        <br />
      <Input className="border-2 border-blue-600 rounded-lg" type="text" placeholder="Title" value={title} changeHandler={(e) => setTitle(e.target.value)} />
      <br />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
      <Input className="border-2 border-blue-600 rounded-lg" type="text" placeholder="Description" value={description} changeHandler={(e) => setDescription(e.target.value)} />
      <br />
        <br />
        <label htmlFor="target-amount">Target Amount:</label>
        <br />
      <Input className="border-2 border-blue-600 rounded-lg" type="number" placeholder="Target amount" value={amountTarget} changeHandler={(e) => setAmountTarget(e.target.value)} />
       <br />
       <br/>
       <label htmlFor="upload-image">Upload Image:</label>
       <br />
        <Input type="file" multiple={true} changeHandler={(e) => setImage(e.target.files[0])} />
      <div className="form-group">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10" type="submit" text="Create" />
      </div>
    </form>
    </>
  );
};

export default NewCampaign;
