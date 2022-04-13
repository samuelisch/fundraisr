import React from 'react';
import ProgressBar from './ProgressBar';
import DaysLeft from './DaysLeft';
import { useNavigate } from "react-router-dom";

const Card = ({id, imageURL, title, amountDonated, amountTarget, dateEnd}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className=" w-full lg:max-w-full lg:flex" key={id} onClick={() => navigate(`/campaigns/${id}`)}>
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${imageURL})` }}
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {title}
            </div>
            <ProgressBar
              percentage={Math.round(
                (amountDonated / amountTarget) * 100
              )}
              target={amountTarget.toLocaleString("en-US")}
            />
          </div>
          <div
            className="bg-grey-lighter p-3 flex items-center justify-end transition hover:bg-grey-light"
          >
           <div className="flex items-center justify-between">
            <DaysLeft dateEnd={dateEnd}/>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Card;