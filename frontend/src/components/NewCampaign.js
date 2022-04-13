import React, { useState } from "react";
import server from "../callApi";
import Button from "./assets/Button";
import Input from "./assets/Input";
import CreateCampaignModal from './CreateCampaignModal'

const NewCampaign = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amountTarget, setAmountTarget] = useState('')
  const [image, setImage] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [tags, setTags] = useState([])
  const [showModal, setShowModal] = useState(false);

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

  let buttonStyle = "inline-block px-6 py-2 border-2 border-primary text-primary font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";

  const handleTagsChange = (event) => {
    if (!tags.includes(event.target.value)) {
      event.target.className = "bg-primary inline-block px-6 py-2 border-2 border-primary text-white font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";      
      setTags((prevState) => {
      return [...prevState, event.target.value]
      })} else {
      event.target.className = "inline-block px-6 py-2 border-2 border-primary text-primary font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";
      const tagsArr = tags.filter((element) => element !== event.target.value)
      setTags(tagsArr)
    }
  }

console.log(tags)

  let today = new Date()
  let tomorrow = new Date() 
  tomorrow.setDate(today.getDate() + 1)
  let tomorrowuse = tomorrow.toLocaleDateString('eng-ca')

  return (
    <>
    <div className="flex-col items-center justify-center text-center">
    <h1 className="font-bold text-2xl p-5 text-gray-700">Start A New Campaign</h1>
    <form onSubmit={submitHandler}>
      <div id="rowone" className="flex flex-row ml-10 mr-10 mb-3">
        <div id="title">  
          <label htmlFor="title" className="text-gray-700 ml-5">Title:</label>
          <Input type="text" value={title} changeHandler={(e) => setTitle(e.target.value)} />
        </div>
        <div id="amount">
          <label htmlFor="target-amount" className="text-gray-700 ml-5">Target Amount:</label>
          <Input type="number" value={amountTarget} changeHandler={(e) => setAmountTarget(e.target.value)} />
        </div>
      </div>
      <div id="rowtwo" className="flex flex-row ml-10 mr-10 mb-3">
        <label htmlFor="description" className="text-gray-700 ml-5">Description:</label>
        <textarea className="w-96 h-24 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20 p-1 m-3" type="text"  value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div id="rowthree" className="flex flex-row ml-10 mr-10 mb-3">
        <div id="enddate">
          <label htmlFor="end-date" className="text-gray-700 ml-5">End Date:</label>
          <Input type="date" min={tomorrowuse} value={dateEnd} changeHandler={(e) => setDateEnd(e.target.value)} />
        </div>
        <div id="upload-image">
          <label htmlFor="upload-image">Upload Image:</label>
          <Input type="file" multiple={true} changeHandler={(e) => setImage(e.target.files[0])} />
          </div>
        </div>
        <div id="rowfour" className="flex flex-row ml-10 mr-10 mb-3">
          <label htmlFor="tags" className="text-gray-700 ml-5 mr-5">Tags:</label>
          <div id="selection" className="flex space-x-2 justify-start grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-2">
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
            className={buttonStyle}
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
      </div>
          <Button className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case mt-5" type="submit" text="Create" />
    </form>
    </div>
    {showModal ? <CreateCampaignModal setTitle={setTitle}setDescription={setDescription}setAmountTarget={setAmountTarget}setImage={setImage} setDateEnd={setDateEnd} setTags={setTags} setShowModal={setShowModal}/> : null}

    </>
  );
};

export default NewCampaign;
