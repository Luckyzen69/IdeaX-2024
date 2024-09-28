import React from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import Potato from '../../assets/vegitables/potato.svg';
import Chilli from '../../assets/vegitables/chilli.svg';
import Fish from '../../assets/vegitables/fish.svg';
import Sugar from '../../assets/vegitables/sugar.svg';
import Chicken from '../../assets/vegitables/chicken.svg';
import { data } from './kalimatidata';

export default function Table() {
  

    return (
        <div className="m-4">
            {/* Enable horizontal scroll on small screens */}
            <div className="overflow-x-auto">
                <table className="sm:w-full min-w-[700px] bg-sixth table-fixed border-collapse">
                    <thead>
                        <tr className="bg-accent text-white m-2 p-2">
                            <th className="p-4">Images</th>
                            <th className="p-4 border">कृषि उपज</th>
                            <th className="p-4">ईकाइ</th>
                            <th className="p-4 border">न्यूनतम</th>
                            <th className="p-4">अधिकतम</th>
                            <th className="p-4 border">औसत</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data,index) => {
                            return (
                                <tr
                                    key={index}
                                    className="text-center"
                                    
                                >
                                    <td className="p-4">
                                        <img
                                            src={``}
                                            className="aspect-square w-16 sm:w-24"
                                        />
                                     </td>
                                    <td className="p-4 font-bold">{ data['कृषि उपज'] }</td>
                                    <td className="p-4">{data.ईकाइ }</td>
                                    <td className="p-4">{data.न्यूनतम}</td>
                                    <td className="p-4">{data.अधिकतम}</td>
                                    <td className="p-8 sm:p-16">{data.औसत}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
    