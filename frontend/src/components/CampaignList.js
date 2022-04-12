import React, { useState, useEffect } from "react";
import ProgressBar from "./assets/ProgressBar";
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "./assets/Button";
import callApi from "../callApi";
import { useNavigate } from "react-router-dom";

const CampaignList = () => {
  const navigate = useNavigate();
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // maps over listToShow, already filtered according to selectedCategory
  const viewList = listToShow.map((element) => {
    return (
      <div className=" w-full lg:max-w-full lg:flex" key={element.id}>
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${element.image.url})` }}
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {element.title}
            </div>
            <ProgressBar
              percentage={Math.round(
                (element.amountDonated / element.amountTarget) * 100
              )}
              target={element.amountTarget.toLocaleString("en-US")}
            />
          </div>
          <div
            className="bg-grey-lighter p-3 flex items-end justify-end transition hover:bg-grey-light"
            data-bs-toggle="modal"
            data-bs-target="#singlecampaign"
            onClick={() => navigate(`/campaigns/${element.id}`)}
          >
            See More&nbsp;
            <FaAngleDoubleRight />
          </div>
        </div>
      </div>
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
      <div id="selection" className="flex space-x-2 justify-center">
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value={null}
          text="All"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="animal"
          text="Animal"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="cancer"
          text="Cancer"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="children"
          text="Children"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="elderly"
          text="Elderly"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="global"
          text="Global"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="nature"
          text="Nature"
        />
        <Button
          type="button"
          className="inline-block px-3 py-1 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
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
