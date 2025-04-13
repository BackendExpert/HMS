import React from 'react'
import DashData from './DashData'
import CommenPart from './CommenPart'
import Status from './Status'

const AdminDashboard = () => {
    return (
        <div className="">
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <h1 className="text-xl font-semibold text-gray-500">Admin Dashboard </h1>
                <div className="">
                    <CommenPart />
                </div>
                <div className="">
                    <DashData />
                </div>
            </div>
            <div className="my-4">
                <Status />
            </div>
        </div>
    )
}

export default AdminDashboard