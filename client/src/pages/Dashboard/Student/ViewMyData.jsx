import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentUpdateForm from './StudentUpdateForm';

const ViewMyData = () => {
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
                setstddata(res.data.Result);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">📌 My Personal Information</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <tbody>
                            {stddata && stddata.student && [
                                ['Index No', stddata.indexNo],
                                ['Email', stddata.email],
                                ['NIC No', stddata.student.nic],
                                ['Title', stddata.student.title],
                                ['First Name', stddata.student.firstName],
                                ['Surname', stddata.student.surname],
                                ['Initials', stddata.student.initials],
                                ['Gender', stddata.student.gender],
                                ['Phone', stddata.student.phone],
                                ['Live in', stddata.student.address],
                                ['Distance', `${stddata.student.distance} Km`],
                            ].map(([label, value], i) => (
                                <tr
                                    key={i}
                                    className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                    <td className="px-4 py-3 font-medium text-gray-600 w-1/3">{label}:</td>
                                    <td className="px-4 py-3 text-gray-800">{value || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Update Personal Information</h1>


                <div className="mt-4">
                    {
                        (() => {
                            const incompleteInfo = [
                                stddata?.student?.nic,
                                stddata?.student?.title,
                                stddata?.student?.firstName,
                                stddata?.student?.surname,
                                stddata?.student?.initials,
                                stddata?.student?.phone
                            ].some(field => !field);

                            return incompleteInfo ? (
                                <div>
                                    <p className="text-gray-500 text-sm text-red-500">
                                        This can only be updated for the first time. If a mistake is made, please contact the administrator
                                    </p>
                                    <StudentUpdateForm />
                                </div>
                            ) : (
                                <>
                                    <p className="">Now You Already Update your Personal Data</p>
                                </>
                            );
                        })()
                    }
                </div>
            </div>
        </div>
    );
};

export default ViewMyData;
