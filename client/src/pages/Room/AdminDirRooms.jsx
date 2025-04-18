import React, { useState } from 'react'
import RoomData from './RoomData'

const AdminDirRooms = () => {
    const [selectedrooms, setselectedrooms] = useState('allrooms')

    const handleRoomClick = (value) => {
        setselectedrooms(value)
    }
    return (
        <div>
            <RoomData btnclickvalue={handleRoomClick} />
            <div className="mt-4">Selected: {selectedrooms}</div>
        </div>
    )
}

export default AdminDirRooms