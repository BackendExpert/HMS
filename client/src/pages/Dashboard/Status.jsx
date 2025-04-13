import React from 'react'
import GenderChart from '../../components/Charts/GenderChart'
import WardenList from '../../components/Tables/WardenList'

const Status = () => {
    return (
        <div className='p-4'>
            <h1 className="text-xl font-semibold text-gray-500">Status</h1>
            <div className="xl:flex mt-2">
                <div className="xl:mr-2">
                    <GenderChart />
                </div>
                <div className="xl:ml-2 w-full xl:my-0 my-4">
                    <WardenList />
                </div>

            </div>
        </div>
    )
}

export default Status