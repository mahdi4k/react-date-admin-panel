import React from 'react';
import { CircularProgressbarWithChildren  , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from "./ChangingProgressProvider";

const DashBoardProgress = () => {
    const percentage = 55;
    return (
        <div className='custom-progressbar' >

            <ChangingProgressProvider values={[0,percentage]}>

                {percentage => (

                        <CircularProgressbarWithChildren
                            value={percentage}
                            text={`${percentage}%`}
                            counterClockwise = {true}
                            styles={buildStyles({
                                pathColor: `#04C694`,
                                textColor: '#131313',
                                trailColor: '#6A5DF5',

                            })}


                        >
                            <p className='mt-5 pt-2 text-secondary'>Match meter</p>
                        </CircularProgressbarWithChildren>

                    )}

            </ChangingProgressProvider>
        </div>
    );
};

export default DashBoardProgress;