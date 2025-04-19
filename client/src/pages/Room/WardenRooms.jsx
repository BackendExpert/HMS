import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { Users } from 'lucide-react';
import axios from 'axios';

const WardenRooms = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const token = localStorage.getItem('login');

    const [vardenrooms, setvardenrooms] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/rooms/vardenrooms', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setvardenrooms(res.data.Result))
            .catch(err => console.log(err))
    }, [token]);

    return (
        <div>WardenRooms</div>
    )
}

export default WardenRooms