import React, { useState } from 'react'
import { hosteldata } from './HostelData'
import CreateHostel from './CreateHostel'
import FemaleHostels from './FemaleHostels'
import MaleHostels from './MaleHostels'
import AllHostels from './AllHostels'
import secureLocalStorage from 'react-secure-storage'


const Hostels = () => {
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
                    {
                        hosteldata.map((data, index) => {
                            const Icon = data.icon;
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
                                </div>
                            )
                        })
                    }
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
                                        <MaleHostels />
                                    </div>
                                )
                            }
                            if (valueclick === 'femaleh') {
                                return (
                                    <div className="">
                                        <FemaleHostels />
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