import React from 'react'
import useRoleGuard from '../../hooks/useRoleGuard'
import secureLocalStorage from 'react-secure-storage';
import AdminDirAllocation from './AdminDirAllocation';
import StudentALlocation from './StudentALlocation';

const Reallocations = () => {
    const role = secureLocalStorage.getItem('loginR');
    const isAllowed = useRoleGuard(['admin', 'director', 'student'])
    if (!isAllowed) return null


    if (role === 'student') {
        return (
            <div>
                <StudentALlocation />
            </div>
        )
    }
    else if (role === 'admin' || role === 'director') {
        return (
            <div>
                <AdminDirAllocation />
            </div>
        )
    }

}

export default Reallocations