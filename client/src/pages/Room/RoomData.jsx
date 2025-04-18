import React from 'react'
import { MdBedroomParent } from "react-icons/md";

const RoomData = ({ btnclickvalue }) => {
    const roomdata = [
        {
            id: 1,
            name: 'All Rooms',
            value: 500,
            icon: MdBedroomParent,
            clickvalue: 'allrooms',
            style: 'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600',
        },
        {
            id: 2,
            name: 'Assigned Rooms',
            value: 500,
            icon: MdBedroomParent,
            clickvalue: 'assigned',
            style: 'bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600',
        },
        {
            id: 3,
            name: 'Not Assigned Rooms',
            value: 500,
            icon: MdBedroomParent,
            clickvalue: 'notassigned',
            style: 'bg-gradient-to-r from-green-400 to-emerald-600',
        },
    ]

    const headleClick = (value) => {
        btnclickvalue(value)
    }

    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {
                    roomdata.map((data, index) => {
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
        </div>
    )
}

export default RoomData