import React from 'react'
import secureLocalStorage from 'react-secure-storage';

const ViewRoom = () => {
    const token = localStorage.getItem('login');
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    return (
        <div>ViewRoom</div>
    )
}

export default ViewRoom