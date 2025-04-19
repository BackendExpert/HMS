import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'
import axios from 'axios'

const AddUser = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const emailUser = secureLocalStorage.getItem('loginE')
    const token = localStorage.getItem('login');

    if(role === 'director'){
        return (
            <div>AddUser</div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        })
    }

}

export default AddUser