import React, { useState } from "react";
import server from "../callApi";
import Button from "./assets/Button";
import Input from "./assets/Input";

const NewCampaign = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amountTarget, setAmountTarget] = useState('')
  const [image, setImage] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [tags, setTags] = useState([])

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('amountTarget', amountTarget);
    formData.append('dateEnd', dateEnd)
    formData.append('tags', tags)

    const createdCampaign = await server.createCampaign(formData);
    console.log(createdCampaign);
    setTitle('');
    setDescription('');
    setAmountTarget('');
    setImage('');
    setDateEnd('')
    setTags([])
  }

  let buttonStyle = "inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";

  const handleTagsChange = (event) => {
    
    if (!tags.includes(event.target.value)) {
      event.target.className = "bg-blue-600 inline-block px-6 py-2 border-2 border-blue-600 text-white font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";      
      setTags((prevState) => {
      return [...prevState, event.target.value]

    })} else {
      event.target.className = "inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";
      const tagsArr = tags.filter((element) => element !== event.target.value)
      setTags(tagsArr)
    }
  }

console.log(tags)

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
      <label htmlFor="end-date">End Date:</label>
        <br />
        <Input className="border-2 border-blue-600 rounded-lg" type="date" value={dateEnd}changeHandler={(e) => setDateEnd(e.target.value)} />
        <br />
        <br/>
      <label htmlFor="upload-image">Upload Image:</label>
        <br />
        <Input type="file" multiple={true} changeHandler={(e) => setImage(e.target.files[0])} />
        <br/>
        <br/>
      <label htmlFor="tags">Tags:</label>
        <br />
        <div id="selection" className="flex space-x-2 justify-start">
        <Button
            type="button"
            className={buttonStyle}
            clickHandler={handleTagsChange}
            value="animal"
            text="Animal"/>
          <Button
            type="button"
            className={buttonStyle}
            clickHandler={handleTagsChange}
            value="cancer"
            text="Cancer"
          />
          <Button
            type="button"
            className={`${buttonStyle}`}
            clickHandler={handleTagsChange}
            value="children"
            text="Children"
          />
          <Button
            type="button"
            className={buttonStyle}
            clickHandler={handleTagsChange}
            value="elderly"
            text="Elderly"
          />
          <Button
            type="button"
            className={buttonStyle}
            clickHandler={handleTagsChange}
            value="global"
            text="Global"
          />      
          <Button
            type="button"
            className={buttonStyle}
            clickHandler={handleTagsChange}
            value="nature"
            text="Nature"/>
          <Button
            type="button"
            className={buttonStyle}
            clickHandler={handleTagsChange}
            value="visually impaired"
            text="Visually impaired"
          />
        </div>
        <div className="form-group">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10" type="submit" text="Create" />
        </div>
    </form>
    </>
  );
};

export default NewCampaign;
