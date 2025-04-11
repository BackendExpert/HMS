import React, { useState } from 'react'
import { FaUserCog } from 'react-icons/fa'
import { FaGear, FaPowerOff } from 'react-icons/fa6'

const DashNav = () => {
    const [menu, setmenu] = useState(false)

    const toggleMenu = () => {
        setmenu(!menu)
    }
    return (
        <div className='bg-white py-5'>
            <div className="flex justify-between">
                <h1 className="pl-8">Dashboard</h1>
                <div className="pr-8 flex cursor-pointer" onClick={toggleMenu}>
                    <img src="https://avatars.githubusercontent.com/u/138636749?s=48&v=4" alt="" className='h-6 w-auto rounded-full' />
                    <h1 className="text-sm pl-2">s956465465</h1>
                </div>
            </div>

            <div
                className={`absolute bg-white right-4 top-20 w-72 rounded-2xl shadow-2xl py-6 px-5 transition-all duration-300 transform 
    ${menu ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="text-center">
                    <img
                        src="https://avatars.githubusercontent.com/u/138636749?s=48&v=4"
                        alt="profile"
                        className="h-20 w-20 mx-auto rounded-full shadow-md border-2 border-gray-200"
                    />
                    <h1 className="pt-3 text-lg font-bold text-gray-800">s956465465</h1>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Admin</p>
                </div>

                <div className="mt-5 border-t pt-4">
                    <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition"
                    >
                        <FaUserCog className="text-xl" />
                        <span className="text-sm font-medium">Profile</span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition mt-2"
                    >
                        <FaGear className="text-xl" />
                        <span className="text-sm font-medium">Settings</span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition mt-2"
                    >
                        <FaPowerOff className="text-xl fill-red-500" />
                        <span className="text-sm font-medium text-red-500">Logout</span>
                    </a>
                </div>
            </div>


        </div>
    )
}

export default DashNav