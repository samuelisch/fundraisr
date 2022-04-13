import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./assets/Button";

const CreateCampaignModal = (props) => {
  const navigate = useNavigate();

  const closeButton = () => {
    navigate("/campaigns");
    props.setTitle("");
    props.setDescription("");
    props.setAmountTarget("");
    props.setImage("");
    props.setDateEnd("");
    props.setTags([]);
    props.setShowModal(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <h1 className="p-10 text-gray-600">Campaign created.</h1>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                className="btn rounded-lg bg-primary hover:bg-primary/70 border-none text-white normal-case"
                type="button"
                text="Close"
                clickHandler={closeButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCampaignModal;
