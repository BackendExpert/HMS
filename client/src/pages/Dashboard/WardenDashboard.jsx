import React from 'react'
import CommenPart from './CommenPart'
import WardenData from './WardenData'


const WardenDashboard = () => {
    return (
        <div className="">
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <h1 className="text-xl font-semibold text-gray-500">Warden Dashboard </h1>
                <div className="">
                    <CommenPart />
                </div>
                <div className="">
                    <WardenData />
                </div>
            </div>
            <div className="my-4">
                <p className="font-semibold"><span className='text-red-500 font-bold uppercase'>important: </span>Please don't do anything until you assign to hostel</p>
            </div>
        </div>
    )
}

export default WardenDashboard