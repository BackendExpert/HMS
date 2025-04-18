import React, { useState } from 'react'
import RoomData from './RoomData'
import AllRooms from './AllRooms'

const AdminDirRooms = () => {
    const [selectedrooms, setselectedrooms] = useState('allrooms')

    const handleRoomClick = (value) => {
        setselectedrooms(value)
    }
    return (
        <div>
            <RoomData btnclickvalue={handleRoomClick} />
            {
                (() => {
                    if(selectedrooms === 'allrooms'){
                        return (
                            <AllRooms />
                        )
                    }
                })()
            }
        </div>
    )
}

export default AdminDirRooms