import React, { useEffect, useState } from 'react'
import CreateHostel from './CreateHostel'
import AllHostels from './AllHostels'
import secureLocalStorage from 'react-secure-storage'
import { FaFemale, FaMale } from "react-icons/fa";
import { FaPlus, FaSchool } from "react-icons/fa6";
import axios from 'axios';
import CountUp from 'react-countup'


const Hostels = () => {
    const token = localStorage.getItem('login');
    const [gethostels, setgethostels] = useState([])

    const [maleHostelsCount, setMaleHostelsCount] = useState(0);
    const [femaleHostelsCount, setFemaleHostelsCount] = useState(0);
    const [totalHostelsCount, setTotalHostelsCount] = useState(0);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/hostel/hostels', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => {
            setgethostels(res.data.Result);
    
            const maleCount = res.data.Result.filter(hostel => hostel.gender === 'Male').length;
            const femaleCount = res.data.Result.filter(hostel => hostel.gender === 'Female').length;
            const totalCount = res.data.Result.length; 
    
            setMaleHostelsCount(maleCount);
            setFemaleHostelsCount(femaleCount);
            setTotalHostelsCount(totalCount); 
        })
        .catch(err => console.log(err));
    }, [token]); 

    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')

    const [valueclick, setvalueclick] = useState('allhostel')

    const headleClick = (value) => {
        setvalueclick(value)
    }

    if (role === "admin" || role === "director") {
        return (
            <div className="">
                <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
                    <div onClick={() => headleClick('allhostel')} className="rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                        <div className="flex items-center justify-between mb-3">
                            <FaSchool className="w-10 h-10 opacity-90" />
                            <span className="text-3xl font-bold"><CountUp end={totalHostelsCount} duration={1.5} /></span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-wide">Hostels</h2>
                    </div>

                    <div onClick={() => headleClick('createhostel')} className="rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-purple-500 to-pink-500">
                        <div className="flex items-center justify-between mb-3">
                            <FaPlus className="w-10 h-10 opacity-90" />
                            <span className="text-3xl font-bold"></span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-wide">Add New Hostel</h2>
                    </div>

                    <div className="rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-green-400 to-emerald-600">
                        <div className="flex items-center justify-between mb-3">
                            <FaMale className="w-10 h-10 opacity-90" />
                            <span className="text-3xl font-bold"><CountUp end={maleHostelsCount} duration={1.5} /></span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-wide">Male Hostels</h2>
                    </div>

                    <div className="rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r from-red-400 to-rose-600">
                        <div className="flex items-center justify-between mb-3">
                            <FaFemale className="w-10 h-10 opacity-90" />
                            <span className="text-3xl font-bold"><CountUp end={femaleHostelsCount} duration={1.5} /></span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-wide">Female Hostels</h2>
                    </div>
                </div>

                <div className="mt-8">
                    {
                        (() => {
                            if (valueclick === 'allhostel') {
                                return (
                                    <div className="">
                                        <AllHostels />
                                    </div>
                                )
                            }
                            if (valueclick === 'maleh') {
                                return (
                                    <div className="">
                                        <AllHostels />
                                    </div>
                                )
                            }
                            if (valueclick === 'femaleh') {
                                return (
                                    <div className="">
                                        <AllHostels />
                                    </div>
                                )
                            }
                            if (valueclick === 'createhostel') {
                                return (
                                    <div className="">
                                        <CreateHostel />
                                    </div>
                                )
                            }
                        })()
                    }
                </div>
            </div>
        )
    }

}

export default Hostels
