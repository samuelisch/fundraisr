import React from 'react';

import testimg from '../components/assets/images/children-option1.jpg'
import { FaAngleDoubleRight } from "react-icons/fa";


const CampaignList = (props) => {

let list = props.campaignList.map((element, index) => {
     return (
        <div className=" w-full lg:max-w-full lg:flex" key={index}>
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${testimg})`}} 
            >
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{element.title}</div>
                    <p className="text-gray-700 text-base">Amount target: ${element.amountTarget}</p>
                </div>
                <div className="bg-grey-lighter p-3 flex items-end justify-end transition hover:bg-grey-light" onClick={(e) => props.singleCampaign(e, element.id)}>
                See More&nbsp;<FaAngleDoubleRight/>
                </div>
            </div>
        </div>
    )
})


return (
        <>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {list}
        </div>
        </>
    );
};

export default CampaignList;