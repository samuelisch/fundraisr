import React, { useEffect, useState } from "react";
import Button from "./assets/Button";
import ProgressBar from "./assets/ProgressBar";
import callApi from "../callApi";

import { useParams } from "react-router-dom";

const SingleCampaign = () => {
  const { id } = useParams();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [donateAmt, setDonateAmt] = useState(0);

  useEffect(() => {
    if (id) {
      callApi.singleCampaign(id).then((data) => {
        console.log(data);
        setSelectedCampaign(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedCampaign) {
      setCurrentPercent(
        Math.round(
          (selectedCampaign.amountDonated / selectedCampaign.amountTarget) * 100
        )
      );
    }
  }, [selectedCampaign]);

  //Functions for Amount to Donate
  const handleSubtract = () => {
    if (donateAmt > 0) {
      setDonateAmt(donateAmt - 10);
    }
  };
  const handleAdd = () => {
    setDonateAmt(donateAmt + 10);
  };

  //Function for buttons
  const closeButton = () => {
    setDonateAmt(0);
  };

  if (!selectedCampaign) {
    return null;
  }

  return (
    <>
      {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className=" w-full lg:max-w-full lg:flex">
              <div className="flex flex-col">
                <img
                  className="h-64 max-h-full px-6 pt-4 pb-2 rounded"
                  src={selectedCampaign.image.url}
                  alt="campaign"
                />
                <div className="px-6 pt-4 pb-2">
                  {selectedCampaign.tags.map((element, index) => {
                    return (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {element}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="mb-8 px-6 pt-4 pb-2">
                <ProgressBar
                  percentage={currentPercent}
                  target={selectedCampaign.amountTarget.toLocaleString("en-US")}
                />
                <div className="text-gray-900 font-bold text-xl mb-5">
                  {selectedCampaign.title}
                </div>
                <p className="text-gray-700 text-base mb-5">
                  {selectedCampaign.description}
                </p>
                <div className="custom-number-input h-10 w-32 flex flex-row">
                  <label
                    htmlFor="custom-input-number"
                    className="w-full text-gray-700 text-sm font-semibold mr-5"
                  >
                    Amount
                  </label>
                  <div className="flex flex-row justify-around h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      data-action="decrement"
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border border-gray-500"
                      onClick={handleSubtract}
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-blue border border-gray-500"
                      name="custom-input-number"
                      value={donateAmt}
                      onChange={(e) => setDonateAmt(e.target.value)}
                    ></input>
                    <button
                      data-action="increment"
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer outline-none border border-gray-500"
                      onClick={handleAdd}
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                className="text-blue-500 background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded border border-blue-500"
                type="button"
                text="Close"
                clickHandler={closeButton}
              />
              <Button
                className="bg-blue-500 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                text="Confirm Donation"
                clickHandler={closeButton}
              />
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default SingleCampaign;
