import React from 'react'
import secureLocalStorage from 'react-secure-storage';

const ViewHostel = () => {
    const token = localStorage.getItem('login');
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    return (
        <div>ViewHostel</div>
    )
}

export default ViewHostel