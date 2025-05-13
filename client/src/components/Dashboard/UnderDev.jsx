import React from 'react'
import { BsHouseGearFill } from "react-icons/bs";


const UnderDev = () => {
    return (
        <div className="flex justify-center items-center ">
            <div className="my-16 text-center">
                <BsHouseGearFill className="h-20 w-auto mx-auto" />
                <p className="mt-8 text-xl font-semibold">503 Service Unavailable</p>

                <p className="">Page is Under Development</p>
            </div>
        </div>

    )
}

export default UnderDev