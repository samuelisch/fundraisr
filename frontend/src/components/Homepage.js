import React, { useEffect, useState } from "react";
import callApi from "../callApi";
import mainleft from "../components/assets/images/mainleft.jpg";
import mainright from "../components/assets/images/mainright.jpg";
import Button from "./assets/Button";
import CampaignList from "./CampaignList";
// import SingleCampaign from "./SingleCampaign";

const Homepage = () => {
 
  const [usersList, setUsersList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState({})

  useEffect(() => {
    if (usersList.length) {
      console.log(usersList);
    }
  }, [usersList]);

  useEffect(() => {
    if (campaignList.length) {
      console.log(campaignList);
    }
  }, [campaignList]);

  useEffect(() => {
    if (selectedCampaign) {
      console.log(selectedCampaign);
    }
  }, [selectedCampaign]);

  const allUsers = async (event) => {
    event.preventDefault();
    const allUsersData = await callApi.allUsers();
    setUsersList(allUsersData);
  };

  const singleUser = async (event, id) => {
    event.preventDefault();
    const singleUserData = await callApi.singleUser(id);
    console.log(singleUserData);
  };

  const allCampaigns = async (event) => {
    event.preventDefault();
    const allCampaignsData = await callApi.allCampaigns();
    setCampaignList(allCampaignsData);
  };
  
  const singleCampaign = async (event, id) => {
    event.preventDefault();
    const singleCampaignData = await callApi.singleCampaign(id);
    setSelectedCampaign(singleCampaignData)
    };
  

  return (
    <div>
      <h1 className="font-bold text-center text-xl mt-5 mb-5">
        Support a cause, show you care.
      </h1>
      <h1 className="font-bold text-center text-l text-blue-700 mb-5">
        I want to...
      </h1>

      <div className="flex justify-around">
        <div className="relative">
          <img
            src={mainleft}
            className="rounded-lg object-fill h-96"
            alt=""
          />
          <Button
            type="button"
            text="Donate"
            className="h-10 px-5 bg-white text-blue-700 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100 absolute font-bold left-5 top-5"
            clickHandler={allCampaigns}
          />
        </div>

        <div className="relative">
          <img src={mainright} className="rounded-lg object-fill h-96" alt="" />
          <Button
            type="button"
            text="Start a Campaign"
            className="h-10 px-5 bg-white text-blue-700 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100 absolute font-bold left-5 top-5"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <form onSubmit={allUsers}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            All Users
          </button>
        </form>
        <form onSubmit={(e) => singleUser(e, "624fa0568a6bab944590126f")}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Single User
          </button>
        </form>
        <form onSubmit={(e) => singleCampaign(e, "624ff26987b87cf280b74bca")}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Single Campaign
          </button>
        </form>
      </div>
      <CampaignList campaignList={campaignList}selectedCampaign={selectedCampaign} setSelectedCampaign={setSelectedCampaign} singleCampaign={singleCampaign} />
      {/* <SingleCampaign selectedCampaign={selectedCampaign} setSelectedCampaign={setSelectedCampaign}/> */}
    </div>
   
  );
};

export default Homepage;
