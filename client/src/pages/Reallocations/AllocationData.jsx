import React from 'react';
import {
    FaInbox,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
} from 'react-icons/fa';

const AllocationData = ({ btnclickvalue }) => {
    const dataallocation = [
        {
            id: 1,
            name: 'All Requests',
            value: 40,
            icon: <FaInbox className="text-white text-3xl" />,
            color: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500',
            cliclvalue: 'allreqeusts'
        },
        {
            id: 2,
            name: 'Accepted',
            value: 25,
            icon: <FaCheckCircle className="text-white text-3xl" />,
            color: 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500',
            cliclvalue: 'accepetd'
        },
        {
            id: 3,
            name: 'Rejected',
            value: 10,
            icon: <FaTimesCircle className="text-white text-3xl" />,
            color: 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-500',
            cliclvalue: 'rejected'
        },
        {
            id: 4,
            name: 'Pending',
            value: 5,
            icon: <FaHourglassHalf className="text-white text-3xl" />,
            color: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500',
            cliclvalue: 'pending'
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
                    onClick={headleClickvalue(item.cliclvalue)}
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

export default AllocationData;
