import React from 'react'
import DashData from './DashData'
import CommenPart from './CommenPart'

const DirDashbaord = () => {
    return (
        <div className='bg-white p-4 rounded-lg shadow-md'>
            <h1 className="text-xl font-semibold text-gray-500">Director Dashboard </h1>
            <div className="">
                <CommenPart />
            </div>
            <div className="">
                <DashData />
            </div>
        </div>
    )
}

export default DirDashbaord