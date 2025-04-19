import React, { useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'

const Profile = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const emailUser = secureLocalStorage.getItem('loginE')
    const token = localStorage.getItem('login');

    const [passdata, setpassdata] = useState({
        oldPass: '',
        newpass: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpassdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headlePasswordUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/updatepass', passdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert("Password Updated Success")
                        window.location.reload()
                    }
                    else {
                        alert(res.data.Error)
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-xl font-semibold text-gray-500">Profile : {username}</h1>

                <div className="">
                    <table className='w-full mt-8 text-gray-500'>
                        <tr className='border-b border-gray-200 h-12'>
                            <td className='font-semibold'>Usernmae: </td>
                            <td>{username}</td>
                        </tr>
                        <tr className='border-b border-gray-200 h-12'>
                            <td className='font-semibold'>Email: </td>
                            <td>{emailUser}</td>
                        </tr>
                        <tr className='border-b border-gray-200 h-12'>
                            <td className='font-semibold'>Role: </td>
                            <td>{role}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 my-4">
                <h1 className="text-xl font-semibold text-gray-500">Password Update</h1>

                <form onSubmit={headlePasswordUpdate} method="post">
                    <div className="my-4">
                        <DefultInput
                            label={"Enter Current Password"}
                            type={'password'}
                            name={'oldPass'}
                            value={passdata.oldPass}
                            onChange={handleInputChange}
                            placeholder={"Current Password"}
                            required
                        />
                    </div>
                    <div className="my-4">
                        <DefultInput
                            label={"Enter New Password"}
                            type={'password'}
                            name={'newpass'}
                            value={passdata.newpass}
                            onChange={handleInputChange}
                            placeholder={"New Password"}
                            required
                        />
                    </div>

                    <div className="my-4">
                        <DefultButton 
                            btntype={'submit'}
                            text={'Update Password'}
                        />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Profile