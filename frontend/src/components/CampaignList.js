import React from 'react';

import testimg from '../components/assets/images/children-option1.jpg'


const CampaignList = (props) => {

let list = props.campaignList.map((element, index) => {
    console.log(element.title)
     return (
        <div className=" w-full lg:max-w-full lg:flex" key={index}>
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${testimg})`}} 
        >
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                    <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg>
                Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">{element.title}</div>
                <p className="text-gray-700 text-base">Amount target: ${element.amountTarget}</p>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src={testimg} alt="Avatar of Writer"/>
                <div className="text-sm">
                <p class="text-gray-900 leading-none">John Smith</p>
                <p className="text-gray-600">Aug 18</p>
            </div>
        </div>
        </div>
        </div>
    )
}
)


return (
        <>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {list}
        </div>
        </>
    );
};

export default CampaignList;