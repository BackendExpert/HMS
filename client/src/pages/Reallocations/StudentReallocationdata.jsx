import React from 'react';
import {
    FaInbox,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
} from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';

const StudentReallocationdata = ({ btnclickvalue }) => {
    const dataallocation = [
        {
            id: 1,
            name: 'My Requests',
            value: 40,
            icon: <FaInbox className="text-white text-3xl" />,
            color: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500',
            cliclvalue: 'mystdreqsut'
        },
        {
            id: 2,
            name: 'Create New',
            value: 5,
            icon: <FaCirclePlus className="text-white text-3xl" />,
            color: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500',
            cliclvalue: 'createstdrequest'
        },
    ];

    const headleClickvalue = (value) => {
        btnclickvalue(value)
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {dataallocation.map((item) => (
                <div
                    key={item.id}
                    className={`p-6 rounded-2xl shadow-lg text-white flex justify-between items-center ${item.color} transition-transform transform hover:scale-105`}
                    onClick={() => headleClickvalue(item.cliclvalue)}
                >
                    <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-4xl font-bold mt-1">{item.value}</p>
                    </div>
                    <div className="ml-4">
                        {item.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentReallocationdata;
