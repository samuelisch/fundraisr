import React from 'react';
import ProgressBar from './assets/ProgressBar';

import testimg from './images/children-option1.jpg'
import { FaAngleDoubleRight } from "react-icons/fa";

const Card = () => {
    return (
        <div>
            <div className=" w-full lg:max-w-full lg:flex" key={index}>
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${testimg})`}} 
            >
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{element.title}</div>
                    <ProgressBar percentage={Math.round((element.amountDonated / element.amountTarget) * 100)} target={element.amountTarget.toLocaleString("en-US")}/>
                </div>
                <div className="bg-grey-lighter p-3 flex items-end justify-end transition hover:bg-grey-light" data-bs-toggle="modal" data-bs-target="#singlecampaign" onClick={(e) => props.singleCampaign(e, element.id)}>
                See More&nbsp;<FaAngleDoubleRight/>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Card;