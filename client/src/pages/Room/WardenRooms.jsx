import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios';
import { MdBedroomParent } from "react-icons/md";

const WardenRooms = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const token = localStorage.getItem('login');

    const [vardenrooms, setvardenrooms] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/room/vardenrooms', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setvardenrooms(res.data.Result))
            .catch(err => console.log(err))
    }, [token]);

    const roommenu = [
        {
            id: 1,
            name: 'All Rooms',
            value: vardenrooms.length,
            icon: MdBedroomParent,
            color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        },
    ];

    return (
        <div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                {roommenu.map((data) => {
                    const Icon = data.icon;
                    return (
                        <div
                            key={data.id}
                            className={`rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl ${data.color}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Icon className="w-10 h-10 opacity-90" />
                                <span className="text-3xl font-bold">{data.value}</span>
                            </div>
                            <h2 className="text-lg font-semibold tracking-wide">{data.name}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default WardenRooms