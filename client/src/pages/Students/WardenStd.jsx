import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const WardenStd = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const token = localStorage.getItem('login');

    const [getvardenstd, setgetvardenstd] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/student/vardenstd', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setgetvardenstd(res.data.Result))
            .catch(err => console.log(err))
    }, [])


    const stdmenu = [
        {
            id: 1,
            name: 'All Students',
            value: getvardenstd.length,
            icon: Users,
            color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        },
    ];
    return (
        <div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {stdmenu.map((data) => {
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

            <div className="bg-white p-4 mt-4">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                "Enrolment No", "NIC", "First Name", "Gender",
                                "Email", "Phone No 1", "Intake", "Date of Enrolment", "Eligible"
                            ].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 h-12 font-semibold">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getvardenstd.map((data, index) => (
                            <tr className="even:bg-gray-50 h-16" key={index}>
                                <td className="border px-4 py-2">{data.enrolmentNo}</td>
                                <td className="border px-4 py-2">{data.nic}</td>
                                <td className="border px-4 py-2">{data.firstName}</td>
                                <td className="border px-4 py-2">{data.gender}</td>
                                <td className="border px-4 py-2">{data.email}</td>
                                <td className="border px-4 py-2">{data.phone1}</td>
                                <td className="border px-4 py-2">{data.intake}</td>
                                <td className="border px-4 py-2">{data.dateOfEnrolment}</td>
                                <td>
                                    {
                                        data.eligible === true ?
                                            <div className="text-center bg-green-500 text-white py-1 px-2 rounded">Eligible</div>
                                            :
                                            <div className="text-center bg-red-500 text-white py-1 px-2 rounded">Not Eligible</div>
                                    }
                                </td>
                                {/* <td className="border px-4 py-2">
                                    <Link to={`/Dashboard/StudentView/${data._id}`}>
                                        <button className="text-blue-500 hover:underline">View</button>
                                    </Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WardenStd