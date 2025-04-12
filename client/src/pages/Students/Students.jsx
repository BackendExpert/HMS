import React from 'react'
import secureLocalStorage from 'react-secure-storage'
import AuthStd from './AuthStd'
import WardenStd from './WardenStd'

const Students = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')

    if (role === "admin") {
        return (
            <div>
                <AuthStd />
            </div>
        )
    }
    if (role === "director") {
        return (
            <div>
                <AuthStd />
            </div>
        )
    }
    if (role === "warden") {
        return (
            <div>
                <WardenStd />
            </div>
        )
    }
}

export default Students