import React, { useState } from 'react'
import RoomData from './RoomData'
import CreateRooms from './CreateRooms'

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
                            <h1 className="">All Rooms</h1>
                        )
                    }
                    else if(selectedrooms === 'assigned'){
                        return (
                            <h1 className="">assigned</h1>
                        )
                    }
                    else if(selectedrooms === 'notassigned'){
                        return (
                            <h1 className="">notassigned</h1>
                        )
                    }
                    else if(selectedrooms === 'addnew'){
                        return (
                            <CreateRooms />
                        )
                    }
                })()
            }
        </div>
    )
}

export default AdminDirRooms