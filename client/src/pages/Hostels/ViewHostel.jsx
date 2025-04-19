import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';


const ViewHostel = () => {
    const token = localStorage.getItem('login');
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');

    const {id} = useParams()

    const [hosteldata, sethosteldata] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/hostel/viewhostel/' + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

            .then(res => sethosteldata(res.data.Result))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <a href="/Dashboard/Hostels">
                <button className="bg-blue-500 text-white py-2 px-4 rounded duration-500 hover:bg-blue-600">
                    Back
                </button>
            </a>


            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                <h1 className="text-xl font-semibold text-gray-500 mb-4">Hostel Information</h1>
                <table className='w-full'>
                    <tbody className='w-full'>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Hostel Name:</th>
                            <td>{hosteldata.name}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Hostel Number:</th>
                            <td>{hosteldata.hostelID}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Hostel Location :</th>
                            <td>
                                <a href={`${hosteldata.location}`} target='_blank' className='text-blue-600 font-semibold duration-500 hover:underline'>View on Google Maps</a>
                            </td>
                        </tr>   
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Room Capacity:</th>
                            <td>{hosteldata.room_capacity}</td>
                        </tr>                     
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                <h1 className="text-xl font-semibold text-gray-500 mb-4">Hostel Warden Information</h1>
                <table className='w-full'>
                    <tbody className='w-full'>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Warden Name:</th>
                            <td>{hosteldata.warden?.username}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                            <th className="text-left pr-4 font-semibold">Warden Email (Contact Information):</th>
                            <td><a href={`mailto:${hosteldata.warden?.email}`} className='text-blue-600 font-semibold duration-500 hover:underline'>{hosteldata.warden?.email}</a></td>
                        </tr>
                
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewHostel