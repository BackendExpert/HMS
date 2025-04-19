import React, { useEffect, useRef, useState } from 'react'
import { FaUserCog } from 'react-icons/fa'
import { FaGear, FaPowerOff } from 'react-icons/fa6'
import secureLocalStorage from 'react-secure-storage'

const DashNav = () => {
    const [menu, setmenu] = useState(false)
    const menuRef = useRef()

    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')

    const toggleMenu = () => {
        setmenu(!menu)
    }

    const headleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    // Close on outside click and Escape key
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setmenu(false)
            }
        }

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setmenu(false)
            }
        }

        document.addEventListener('mousedown', handler)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handler)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])

    return (
        <div className='bg-white py-5'>
            <div className="flex justify-between">
                <h1 className="pl-8">Dashboard</h1>
                <div className="pr-8 flex cursor-pointer" onClick={toggleMenu}>
                    <img src="https://avatars.githubusercontent.com/u/138636749?s=48&v=4" alt="" className='h-6 w-auto rounded-full' />
                    <h1 className="text-sm pl-2 uppercase">{username}</h1>
                </div>
            </div>

            <div
                ref={menuRef}
                className={`absolute bg-white right-4 top-20 w-72 rounded-2xl shadow-2xl py-6 px-5 transition-all duration-300 transform z-20
                ${menu ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="text-center">
                    <img
                        src="https://avatars.githubusercontent.com/u/138636749?s=48&v=4"
                        alt="profile"
                        className="h-20 w-20 mx-auto rounded-full shadow-md border-2 border-gray-200"
                    />
                    <h1 className="pt-3 text-lg font-bold text-gray-800">{username}</h1>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{role}</p>
                </div>

                <div className="mt-5 border-t pt-4">
                    <a
                        href="/Dashboard/Profile"
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

                    <div
                        onClick={headleLogout}
                        className="cursor-pointer flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition mt-2"
                    >
                        <FaPowerOff className="text-xl fill-red-500" />
                        <span className="text-sm font-medium text-red-500">Logout</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default DashNav