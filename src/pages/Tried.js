import React from 'react';
import { Line } from "react-chartjs-2";
import LineGraph from './LineGraph';


function Tried() {
    
    return (
      <div>
        <div className="bg-green-300 h-screen w-screen flex flex-col justify-center items-center">
          <div className="w-[90%] p-4 flex justify-between">
            <h3 className="text-3xl font-bold text-[darkblue]">Home Performance</h3>
            <button>Report  ></button>
          </div>
          <div className="bg-white h-[90%] w-[90%] rounded-[20px] p-4">
            <LineGraph />
          </div>
        </div>
      </div>
    );
}

export default Tried;