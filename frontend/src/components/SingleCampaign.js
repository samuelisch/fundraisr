import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./assets/Button";
import ProgressBar from "./assets/ProgressBar";
import DaysLeft from "./assets/DaysLeft";
import callApi from "../callApi";

import { useParams } from "react-router-dom";

import DonateSuccessModal from "./DonateSuccessModal";

const SingleCampaign = () => {
  
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [donateAmt, setDonateAmt] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      callApi.singleCampaign(id).then((data) => {
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
      setDonateAmt(donateAmt - 100);
    }
  };
  const handleAdd = () => {
    setDonateAmt(donateAmt + 100);
  };

  //Function for buttons
  const backButton = () => {
    navigate('/campaigns');
    setDonateAmt(0);
  };

  if (!selectedCampaign) {
    return null;
  }

  const donateButton = async (e) => {
    e.preventDefault();
    try {
      const donateCampaign = await callApi.donateCampaign(id, donateAmt);
      setShowModal(true);
      // console.log(donateCampaign)
    } catch (err) {
      console.error(err);      
    }
  };


  return (
    <>
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
      {/*content*/}
        <form onSubmit={donateButton} >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="w-full lg:max-w-full lg:flex">
              <div className="flex flex-col">
                <div className="px-6 pt-4 pb-2">
                  <DaysLeft dateEnd={selectedCampaign.dateEnd} />
                </div>
                <img
                  className="h-100 lg:h-auto lg:w-100 flex-none rounded-lg text-center overflow-hidden m-5"
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
                <div className="text-gray-700 font-bold text-xl mb-5">
                {selectedCampaign.title}
                </div>
                <p className="text-gray-700 text-base mb-5">
                  {selectedCampaign.description}
                </p>
                <div className="custom-number-input h-10 w-48 flex flex-col">
                  <label
                    htmlFor="custom-input-number"
                    className="w-full text-gray-700 text-sm font-semibold mr-5"
                  >Amount (SGD)
                  </label>
                  <div className="flex flex-row justify-around h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                    type="button"
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
                    type="button"
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
                className="btn rounded-lg text-primary normal-case bg-white border-primary hover:bg-primary/30 hover:border-primary/20 mr-5"
                type="button"
                text="Back"
                clickHandler={backButton}
              />
              <Button
                className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case"
                type="submit"
                text="Confirm Donation"
                disabled={false}
              />
            </div>
          </div>
          </form>
        </div>
        {showModal ? <DonateSuccessModal setDonateAmt={setDonateAmt} setShowModal={setShowModal} selectedCampaign={selectedCampaign}/> : null}
         
    </>
  );
};

export default SingleCampaign;
