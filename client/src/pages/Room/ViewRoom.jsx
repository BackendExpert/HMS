import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const ViewRoom = () => {
    const token = localStorage.getItem('login');
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');

    const { id } = useParams()

    const [roomdata, setroomdata] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/room/viewRoom/' + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

            .then(res => setroomdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <a href="/Dashboard/Rooms">
                <button className="bg-blue-500 text-white py-2 px-4 rounded duration-500 hover:bg-blue-600">
                    Back
                </button>
            </a>
            <div className="mt-4">
                <h1 className="text-gray-500 font-semibold">Student ID: {roomdata.roomNumber}</h1>
            </div>

            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                <h1 className="text-xl font-semibold text-gray-500 mb-4">Room Information</h1>
                <table className='w-full'>
                    <tbody className='w-full'>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Gender:</th>
                            <td>{roomdata.gender}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Room Status:</th>
                            <td>{roomdata.status} | Current Occupants: {roomdata.currentOccupants}/{roomdata.capacity} </td>
                        </tr>                        
                    </tbody>
                </table>
            </div>

            
            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                <h1 className="text-xl font-semibold text-gray-500 mb-4">Room Hostel Information</h1>
                <table className='w-full'>
                    <tbody className='w-full'>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Hostel Name & Hostel ID :</th>
                            <td>{roomdata.hostel?.name} | {roomdata.hostel?.hostelID}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Hostel Location :</th>
                            <td>
                                <a href={`${roomdata.hostel?.location}`} target='_blank' className='text-blue-600 font-semibold duration-500 hover:underline'>View on Google Maps</a>
                            </td>
                        </tr>                        
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ViewRoom