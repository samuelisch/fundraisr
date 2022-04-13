import React from 'react';
import {getNumberOfDays} from './utils'

const DaysLeft = ({dateEnd}) => {

    return (
        <div>
            <h1 className="inline-block px-3 py-1 border-2 border-primary text-primary font-medium text-xs leading-tight rounded-full">Ending in {getNumberOfDays(dateEnd)} days</h1>
        </div>
    );
};

export default DaysLeft;