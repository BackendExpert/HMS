import React from 'react'
import { FaBed, FaMale, FaFemale } from 'react-icons/fa';

const WardenData = () => {
    const data = [
        {
            id: 1,
            name: 'Rooms',
            value: 0,
            icon: <FaBed />,
            color: 'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600', // Gradient color
        },
        {
            id: 2,
            name: 'Students',
            value: 0,
            icon: <FaMale />,
            color: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600',
        },
    ];

    return (
        <div className="py-2 px-2 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="">
                    <div
                        className={`bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-2xl px-6 py-12 shadow-lg text-white transform transition-all hover:scale-105 hover:shadow-2xl `}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-white text-gray-800 flex items-center justify-center">
                                <FaMale />
                            </div>
                            <span className="text-3xl font-bold">40</span>
                        </div>
                        <h2 className="text-xl font-semibold tracking-wide">My Hostel</h2>
                    </div>
                </div>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {data.map(item => (
                        <div
                            key={item.id}
                            className={`rounded-2xl px-6 py-12 shadow-lg text-white transform transition-all hover:scale-105 hover:shadow-2xl ${item.color}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-full bg-white text-gray-800 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="text-3xl font-bold">{item.value}</span>
                            </div>
                            <h2 className="text-xl font-semibold tracking-wide">{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default WardenData