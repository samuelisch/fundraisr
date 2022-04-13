import React from "react";

// const ProgressBar = ({ className, current, target })
const ProgressBar = ({ percentage, target }) => {
  // PROGRESS BAR - TO BE STYLED ACCORDING TO FUND CAMPAIGN GOAL ACCORDING TO CURRENT / TARGET RATIO
  return (
    <>
      {/* <div className={className}> */}
      <div className="flex justify-end mb-1">
        <span className="text-sm font-medium text-primary">
          {percentage}% of ${target}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-5">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
