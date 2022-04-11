import React from "react";
import { useNavigate } from "react-router-dom";
import mainleft from "../components/assets/images/mainleft.jpg";
import mainright from "../components/assets/images/mainright.jpg";
import Button from "./assets/Button";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="font-bold text-center text-xl mt-5 mb-5">
        Support a cause, show you care.
      </h1>
      <h1 className="font-bold text-center text-l text-blue-700 mb-5">
        I want to...
      </h1>

      <div className="flex justify-evenly">
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
            clickHandler={() => navigate("/campaigns")}
          />
        </div>

        <div className="relative">
          <img src={mainright} className="rounded-lg object-fill h-96" alt="" />
          <Button
            type="button"
            text="Start a Campaign"
            className="h-10 px-5 bg-white text-blue-700 transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100 absolute font-bold left-5 top-5"
            clickHandler={() => navigate('/newcampaign')}
          />
        </div>
      </div>

    </div>
   
  );
};

export default Homepage;