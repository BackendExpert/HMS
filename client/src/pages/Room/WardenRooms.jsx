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

            <div className="bg-white p-4">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {["Room Number", "Hostel", "Students Count", "Room Gender", "Action"].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 h-12 font-semibold whitespace-nowrap">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {vardenrooms.map((data, index) => (
                            <tr className="even:bg-gray-50 h-16" key={index}>
                                <td className="border px-4 py-2">{data.roomNumber}</td>
                                <td className="border px-4 py-2">{data.hostel?.name}</td>
                                <td className="border px-4 py-2">{data.currentOccupants} / {data.capacity} {data.status}</td>
                                <td className="border px-4 py-2">{data.gender}</td>
                                <td className="border px-4 py-2 text-center">
                                    {
                                        data.eligible ?
                                            <div className="bg-green-500 text-white py-1 px-2 rounded">Eligible</div> :
                                            <div className="bg-red-500 text-white py-1 px-2 rounded">Not Eligible</div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WardenRooms