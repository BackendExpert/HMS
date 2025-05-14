import React, { useEffect, useState } from 'react'
import { Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';


const StudentData = ({ btnclickvalue }) => {
    const [getallstudent, setgetallstudent] = useState([]);

    const token = localStorage.getItem('login');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/student/allstudents`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setgetallstudent(res.data.Result);
            })
            .catch(err => console.log(err));
    }, []);

    const [stdwaiting, setstdwating] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/student/waitinglist`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setstdwating(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const eligibleCount = getallstudent.filter(std => std.eligible === true).length;
    const notEligibleCount = getallstudent.filter(std => std.eligible === false).length;
    const stdmenu = [
        {
            id: 1,
            name: 'All Students',
            value: getallstudent.length,
            clickvalue: 'allstd',
            icon: Users,
            color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        },
        {
            id: 2,
            name: 'Eligible Students',
            value: eligibleCount,
            clickvalue: 'eligible',
            icon: CheckCircle,
            color: 'bg-gradient-to-r from-green-400 to-emerald-600',
        },
        {
            id: 3,
            name: 'Not Eligible Students',
            value: notEligibleCount,
            clickvalue: 'noteligible',
            icon: XCircle,
            color: 'bg-gradient-to-r from-red-400 to-rose-600',
        },

        {
            id: 5,
            name: 'Eligible with Hostel Assign',
            value: '+',
            clickvalue: 'eligiblehostel',
            icon: Users,
            color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        },
        {
            id: 6,
            name: 'Student Waiting List',
            value: stdwaiting.length,
            clickvalue: 'waitinglist',
            icon: AlertCircle,
            color: 'bg-gradient-to-r from-purple-500 to-pink-500',
        },

    ];

    const headleClick = (value) => {
        btnclickvalue(value)
    }

    return (
        <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
            {stdmenu.map((data) => {
                const Icon = data.icon;
                let extraInfo = null;
                return (
                    <div
                        key={data.id}
                        className={`rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl ${data.color}`}
                        onClick={() => headleClick(data.clickvalue)}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Icon className="w-10 h-10 opacity-90" />
                            <span className="text-3xl font-bold">{data.value}</span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-wide">{data.name}</h2>
                        {extraInfo}
                    </div>
                );
            })}
        </div>
    )
}

export default StudentData