import React, { useEffect, useState } from 'react'
import ViewMyData from './ViewMyData'
import axios from 'axios'

const StudentInfor = () => {
    const [stddata, setstddata] = useState(null);
    const token = localStorage.getItem('login');

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/student/currentstudetdata', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("Backend response:", res.data);
                setstddata(res.data.Result);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);
    return (
        <div className="min-h-screen">
            {/* Dashboard Container */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-700 mb-4">🎓 My Information</h1>

                {/* Common Part */}
                <div className="mb-4">
                </div>

                {/* Main Dashboard Row */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Welcome Card */}
                    <div className="flex-1 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            {/* Text Part */}
                            <div>
                                <h2 className="text-xl text-gray-600 font-medium mb-2">Welcome Back!</h2>
                                <p className="text-3xl font-bold text-blue-600 mb-1">{stddata?.username}</p>
                                <p className="text-orange-500 font-semibold text-sm mb-6">{stddata?.waitstd?.faculty}</p>

                                <div className="grid grid-cols-2 gap-6">
                                    {
                                        (() => {
                                            const incompleteInfo = [
                                                stddata?.student?.nic,
                                                stddata?.student?.title,
                                                stddata?.student?.firstName,
                                                stddata?.student?.surname,
                                                stddata?.student?.initials,
                                                stddata?.student?.phone
                                            ].some(field => !field); // checks for empty, null or undefined

                                            return incompleteInfo ? (
                                                <div>
                                                    Please fill Personal Information to get Hostel and Room
                                                </div>
                                            ) : (
                                                <>
                                                    <div>
                                                        <h3 className="text-lg text-gray-500 font-semibold">Hostel</h3>
                                                        <p className="text-base text-gray-700">New Male Hostel</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg text-gray-500 font-semibold">Room</h3>
                                                        <p className="text-base text-gray-700">125</p>
                                                    </div>
                                                </>
                                            );
                                        })()
                                    }
                                </div>
                            </div>

                            <div className="mt-6 md:mt-0">
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="my-8">
                <ViewMyData />
            </div>
        </div>
    )
}

export default StudentInfor