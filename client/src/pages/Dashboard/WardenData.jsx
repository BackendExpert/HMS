import React, { useEffect, useState } from 'react'
import { FaBed, FaMale, FaFemale } from 'react-icons/fa';
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import { FaSchool, FaMedal } from "react-icons/fa";


const WardenData = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const token = localStorage.getItem('login');

    const [getvardenstd, setgetvardenstd] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/student/vardenstd', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setgetvardenstd(res.data.Result))
            .catch(err => console.log(err))
    }, [token]);

    const [vardenrooms, setvardenrooms] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/room/vardenrooms', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setvardenrooms(res.data.Result || []))
            .catch(err => console.log(err));
    }, [token]);

    const data = [
        {
            id: 1,
            name: 'Rooms',
            value: vardenrooms.length,
            icon: <FaBed />,
            color: 'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600',
        },
        {
            id: 2,
            name: 'Students',
            value: getvardenstd.length,
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
                                <FaSchool />
                            </div>
                            <span className="text-3xl font-bold"><FaMedal className='h-8 w-auto fill-yellow-500'/></span>
                        </div>
                        <h2 className="text-xl font-semibold tracking-wide">{vardenrooms[0]?.hostel?.name}</h2>
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