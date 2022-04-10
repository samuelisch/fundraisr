import React, { useEffect, useState } from "react";
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
    formData.append('file', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('amountTarget', amountTarget);

    const createdCampaign = await server.createCampaign(formData)
    console.log(createdCampaign);
    setTitle('');
    setDescription('');
    setAmountTarget('');
    setImage('');
  }

  return (
    <form onSubmit={submitHandler}>
      <Input type="text" placeholder="Title" value={title} changeHandler={(e) => setTitle(e.target.value)} />
      <Input type="text" placeholder="Description" value={description} changeHandler={(e) => setDescription(e.target.value)} />
      <Input type="number" placeholder="Target amount" value={amountTarget} changeHandler={(e) => setAmountTarget(e.target.value)} />
      <Input type="file" multiple={true} changeHandler={(e) => setImage(e.target.files[0])} />
      <div className="form-group">
        <Button className="btn" type="submit" text="Create" />
      </div>
    </form>
  );
};

export default NewCampaign;
