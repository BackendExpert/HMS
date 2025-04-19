import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const StudentView = () => {
    const token = localStorage.getItem('login');
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');

    const { id } = useParams();

    const [stddata, setStdData] = useState({});
    const [roomhosteldata, setRoomHostelData] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/student/getstudent/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                console.log('Full response:', res.data);
                setStdData(res.data.Stundet || {});
                setRoomHostelData(res.data.roomhostel); // Keep null if null
            })
            .catch(err => console.log(err));
    }, []);


    if (role === 'admin' || role === 'director') {
        return (
            <div>
                <a href="/Dashboard/Students">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded duration-500 hover:bg-blue-600">
                        Back
                    </button>
                </a>

                <div className="mt-4">
                    <h1 className="text-gray-500 font-semibold">Student ID: {stddata.indexNo}</h1>

                    <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                        <h1 className="text-xl font-semibold text-gray-500 mb-4">Stundet Information</h1>
                        <table className='w-full'>
                            <tbody className='w-full'>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Enrolment No:</th>
                                    <td>{stddata.enrolmentNo}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Index Number:</th>
                                    <td>{stddata.indexNo}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">NIC Number:</th>
                                    <td>{stddata.nic}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Full Name:</th>
                                    <td>{stddata.title} {stddata.firstName} {stddata.surname}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Initials:</th>
                                    <td>{stddata.initials}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Gender:</th>
                                    <td>{stddata.gender}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Email:</th>
                                    <td>{stddata.email}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Phone 1:</th>
                                    <td>{stddata.phone1}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Phone 2:</th>
                                    <td>{stddata.phone2}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">A/L District:</th>
                                    <td>{stddata.alDistrict}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Z core:</th>
                                    <td>{stddata.zScore}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Medium:</th>
                                    <td>{stddata.medium}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">General English:</th>
                                    <td>{stddata.generalEnglish}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Intake:</th>
                                    <td>{stddata.intake}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Date Of Enrolment:</th>
                                    <td>{stddata.dateOfEnrolment}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Address:</th>
                                    <td>{stddata.address1}, {stddata.address2}</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Distance:</th>
                                    <td>{stddata.distance} Km</td>
                                </tr>
                                <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                    <th className="text-left pr-4 font-semibold">Eligible:</th>
                                    <td>{
                                        stddata.eligible === true ?
                                            <span className="bg-green-500 text-white py-2 px-4 rounded">Eligible</span>
                                            :
                                            <span className="bg-red-500 text-white py-2 px-4 rounded">Not Eligible</span>
                                    }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {
                        stddata.eligible === true ?
                            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                                <h1 className="text-xl font-semibold text-gray-500 mb-4">Stundet Room and Hostel Information</h1>
                                <table className='w-full'>
                                    <tbody className='w-full'>
                                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                            <th className="text-left pr-4 font-semibold">Room No:</th>
                                            <td>{roomhosteldata?.roomId?.roomNumber}</td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                            <th className="text-left pr-4 font-semibold">Hostel Number & Name:</th>
                                            <td>{roomhosteldata?.roomId?.hostel?.hostelID} | {roomhosteldata?.roomId?.hostel?.name}</td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                            <th className="text-left pr-4 font-semibold">Hostel Location:</th>
                                            <td>
                                                <a href={`${roomhosteldata?.roomId?.hostel?.location}`} target='_blank' className='font-semibold text-blue-500 duration-500 hover:underline'>View on Google Map</a>
                                            </td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-200 text-gray-500'>
                                            <th className="text-left pr-4 font-semibold">Room Status:</th>
                                            <td>{roomhosteldata?.roomId?.status} | Current Occupants : {roomhosteldata?.roomId?.currentOccupants}/{roomhosteldata?.roomId?.capacity}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className="bg-white p-4 rounded-lg mt-4 shadow-lg">
                                <h1 className="text-red-500 text-lg font-semibold">This Student is not Eligible</h1>
                            </div>
                    }




                </div>
            </div>
        );
    }
    else {
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        }, [])
    }
};

export default StudentView;
