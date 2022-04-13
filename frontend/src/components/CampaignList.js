import React, { useState, useEffect } from "react";
import Button from "./assets/Button";
import Card from "./assets/Card";
import callApi from "../callApi";

const CampaignList = () => {
  const [campaignList, setCampaignList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // filter
  const [listToShow, setListToShow] = useState([]); // state of campaigns according to filter
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    callApi.allCampaigns().then((data) => {
      setCampaignList(data);
      setLoaded(true);
    });
  }, []);

  // will run when selectedCat changes, or campaignList changes
  useEffect(() => {
    if (selectedCategory) {
      const filteredList = campaignList.filter((campaign) =>
        campaign.tags.includes(selectedCategory)
      );
      setListToShow(filteredList);
    } else {
      setListToShow(campaignList);
    }
  }, [selectedCategory, campaignList]);

  let buttonStyle = "inline-block px-3 py-1 border border-gray-400 text-gray-400 normal-case leading-tight rounded-full hover:bg-gray-100  focus:outline-none focus:ring-0 transition duration-150 ease-in-out font-bold"
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    
    // if (selectedCategory) {
    //   event.target.className = "inline-block px-3 py-1 border border-gray-400 bg-gray-400 text-white font-medium text-lg leading-tight rounded-full"
    // } else {
    //   event.target.className = "inline-block px-3 py-1 border border-gray-400 text-gray-500 font-medium text-lg leading-tight rounded-full hover:bg-gray-100  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
  
    // }
  
  };

  // console.log(selectedCategory)

  // maps over listToShow, already filtered according to selectedCategory
  const viewList = listToShow.map((element) => {
    return (
      <Card key={element.id} id={element.id} imageURL={element.image.url} title={element.title} amountDonated={element.amountDonated} amountTarget={element.amountTarget} dateEnd={element.dateEnd}
      />

    );
  });

  if (!loaded) {
    return null;
  }

  if (!campaignList.length) {
    return <p className="text-xl text-center mt-5">No campaigns in process! Consider starting one</p>;
  }

  return (
    <>
      <div id="selection" className="flex space-x-2 justify-center mt-10">
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value={null}
          text="All"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="animal"
          text="Animal"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="cancer"
          text="Cancer"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="children"
          text="Children"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="elderly"
          text="Elderly"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="global"
          text="Global"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="nature"
          text="Nature"
        />
        <Button
          type="button"
          className={buttonStyle}
          clickHandler={handleCategoryChange}
          value="visually impaired"
          text="Visually impaired"
        />
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {viewList}
      </div>
    </>
  );
};

export default CampaignList;
