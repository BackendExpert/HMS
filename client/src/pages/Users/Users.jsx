import React, { useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'
import { FaUserPlus, FaUsers } from 'react-icons/fa6'

const Users = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const emailUser = secureLocalStorage.getItem('loginE')
    const token = localStorage.getItem('login');

    const usersdata = [
        {
            id: 1,
            name: 'All Users',
            value: 0,
            icon: FaUsers,
            clickvalue: 'allusers',
            style: 'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600',
        },

        {
            id: 2,
            name: 'Add User',
            value: '+',
            icon: FaUserPlus,
            clickvalue: 'adduser',
            style: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600',
        },
    ]

    const [vlauec, setvlauec] = useState('allusers')

    const headleClick = (value) => {
        setvlauec(value)
    }

    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {
                    usersdata.map((data, index) => {
                        const Icon = data.icon;
                        return (
                            <div
                                key={data.id}
                                className={`rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl ${data.style}`}
                                onClick={() => headleClick(data.clickvalue)}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <Icon className="w-10 h-10 opacity-90" />
                                    <span className="text-3xl font-bold">{data.value}</span>
                                </div>
                                <h2 className="text-lg font-semibold tracking-wide">{data.name}</h2>
                            </div>
                        )
                    })
                }
            </div>

            <div className="mt-8">
                {
                    (() => {
                        if(vlauec === "allusers"){
                            return (
                                <div className="">askdjalksd</div>
                            )
                        }
                        else if(vlauec === "adduser"){
                            return (
                                <div className="">sdasdas</div>
                            )
                        }
                    })()
                }
            </div>
        </div>
    )
}

export default Users