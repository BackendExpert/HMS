import React from 'react'
import secureLocalStorage from 'react-secure-storage'
import AdminDirRooms from './AdminDirRooms'
import WardenRooms from './WardenRooms'

const Rooms = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
  return (
    <div>
        {
            (() => {
                if (role === "admin" || role === "director") {
                    return (
                        <AdminDirRooms />
                    )
                }
                else if(role === "warden"){
                    return (
                        <WardenRooms />
                    )
                }
            })()
        }
    </div>
  )
}

export default Rooms