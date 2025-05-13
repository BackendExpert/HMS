import React, { useEffect, useState } from 'react'
import useRoleGuard from '../../hooks/useRoleGuard'
import axios from 'axios'

const StudentWaiting = () => {
    const token = localStorage.getItem('login');
    const isAllowed = useRoleGuard(['intern', 'staff', 'security', 'admin', 'director']);
    if (!isAllowed) return null;

    const [stdwaiting, setstdwating] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/student/waitinglist`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setstdwating(res.data.Result))
            .catch(err => console.log(err));
    }, []);

    const handleApproveAndCreateAccount = async (email) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/student/accessstd/${email}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (res.data.Status === "Success") {
                alert(res.data.Message);
                window.location.reload();
            } else {
                alert(res.data.Error);
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className='bg-white p-8 shadow-xl rounded-xl'>
            <table className="w-full">
                <thead>
                    <tr className='h-12 border-b border-gray-300 text-blue-500 font-semibold'>
                        <th className='font-semibold'>#</th>
                        <th>Email</th>
                        <th>Index No</th>
                        <th>Faculty</th>
                        <th>Distance from Home</th>
                        <th>Email Verify Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stdwaiting.map((data, index) => (
                            <tr key={index} className='h-12 border-b border-gray-200 text-gray-500 text-center'>
                                <td className='font-semibold'>{index + 1}</td>
                                <td>{data.email}</td>
                                <td>{data.indexNo}</td>
                                <td>{data.faculty}</td>
                                <td>{data.homeDistance} , {data.address}</td>
                                <td>
                                    {data.isVerifyEmail === false ?
                                        <div className="text-red-500 font-semibold">Not Verified</div>
                                        :
                                        <div className="text-green-500 font-semibold">Verified</div>
                                    }
                                </td>
                                <td>
                                    {
                                        data.isApprove === false ?
                                            <button
                                                className='bg-blue-500 text-white px-4 py-2 rounded'
                                                onClick={() => handleApproveAndCreateAccount(data.email)}
                                            >
                                                Grant Access
                                            </button>
                                            :
                                            <div className="text-green-600 font-semibold">Approved</div>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default StudentWaiting;
