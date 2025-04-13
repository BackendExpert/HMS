import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllHostels = () => {
    const token = localStorage.getItem('login');
    const [gethostels, setgethostels] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/hostel/hostels', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgethostels(res.data.Result))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className="hidden md:block overflow-auto shadow-md bg-white rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                "Hostel Name", "Hostel Type", "Room Capacity", "Warden", "Action"
                            ].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 h-12 font-semibold">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {gethostels.map((data, index) => (
                            <tr className="even:bg-gray-50 h-16" key={index}>
                                <td className="border px-4 py-2">{data.name}</td>
                                <td className="border px-4 py-2">{data.gender}</td>
                                <td className="border px-4 py-2">{data.room_capacity}</td>
                                <td className="border px-4 py-2">
                                    {data.warden?.email || 'No warden assigned'}
                                </td>
                                <td className="border px-4 py-2">
                                    <button className="text-blue-500 hover:underline">View</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllHostels