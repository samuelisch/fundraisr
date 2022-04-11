import React, { useState, useEffect } from "react";
import ProgressBar from "./assets/ProgressBar";
import testimg from "../components/assets/images/children-option1.jpg";
import { FaAngleDoubleRight } from "react-icons/fa";
import Button from "./assets/Button";

const CampaignList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null); // filter
  const [listToShow, setListToShow] = useState([]); // state of campaigns according to filter

  // will run when selectedCat changes, or campaignList changes
  useEffect(() => {
    if (selectedCategory) {
      const filteredList = props.campaignList.filter((campaign) =>
        campaign.tags.includes(selectedCategory)
      );
      setListToShow(filteredList);
    } else {
      setListToShow(props.campaignList);
    }
  }, [selectedCategory, props.campaignList]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // maps over listToShow, already filtered according to selectedCategory
  const viewList = listToShow.map((element) => {
      console.log(element)
    return (
      <div className=" w-full lg:max-w-full lg:flex" key={element.id}>
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${testimg})` }}
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
            onClick={(e) => props.singleCampaign(e, element.id)}
          >
            See More&nbsp;
            <FaAngleDoubleRight />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div id="selection" className="flex space-x-2 justify-center">
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value={null}
          text="All"
        />
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="global"
          text="Global"
        />
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="elderly"
          text="Elderly"
        />
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="children"
          text="Children"
        />
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="visually impaired"
          text="Visually impaired"
        />
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="cancer"
          text="Cancer"
        />
        <Button
          type="button"
          className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          clickHandler={handleCategoryChange}
          value="nature"
          text="Nature"
        />
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {viewList}
      </div>
    </>
  );
};

export default CampaignList;
