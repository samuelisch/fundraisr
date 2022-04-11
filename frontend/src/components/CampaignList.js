import React, {useState, useMemo} from 'react';
import ProgressBar from './assets/ProgressBar';

import testimg from '../components/assets/images/children-option1.jpg'
import { FaAngleDoubleRight } from "react-icons/fa";

const CampaignList = (props) => {

const [selectedCategory, setSelectedCategory] = useState();

let list = props.campaignList.map((element, index) => {
     return (
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
    )
})

const handleCategoryChange =(event) => {
    setSelectedCategory(event.target.value);
}

// const filteredList = list.map((element) => {
//     return {...element, tags: element.tags.filter((element) => element === selectedCategory)}
//   })

// const checkCategory = (element, index) => {
// return element[index] === selectedCategory
// }

const filteredList = list.filter(cmpgim => cmpgim.tags.includes(selectedCategory));

const getFilteredList = () => {
    if (!selectedCategory) {
      return list;
    } else {
    return filteredList;
    }
    ;
  }


console.log(selectedCategory)
console.log(filteredList)
 
return (
        <>
        <div id="selection" className="flex space-x-2 justify-center">
            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange} value="">All</button>
            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange} value="global">global</button>
            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange} value="elderly">elderly</button>
            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange} value="children">children</button>
            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange} value="visually impaired">visually impaired</button>
            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange}  value="cancer">cancer</button>
            <button type="button" className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={handleCategoryChange}  value="nature">nature</button>
        </div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {getFilteredList()}
        </div>
        
        </>
    );
};

export default CampaignList;