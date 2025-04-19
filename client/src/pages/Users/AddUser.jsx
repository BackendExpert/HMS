import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'
import Dropdown from '../../components/Forms/Dropdown'


const AddUser = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const emailUser = secureLocalStorage.getItem('loginE')
    const token = localStorage.getItem('login');

    const [newuserdata, setnewuserdata] = useState({
        username: '',
        email: '',
        role: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewuserdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleCreateUser = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/createuser', newuserdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert("New User Created Success")
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

    if (role === 'director') {
        return (
            <div>
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h1 className="text-xl font-semibold text-gray-500">Add New User</h1>

                    <div className="mt-4">
                        <form onSubmit={headleCreateUser} method="post">
                            <div>
                                <DefultInput
                                    label={"Enter Username"}
                                    type={'text'}
                                    name={'username'}
                                    value={newuserdata.username}
                                    onChange={handleInputChange}
                                    placeholder={"Username"}
                                    required
                                />
                            </div>

                            <div>
                                <DefultInput
                                    label={"Enter Email Address"}
                                    type={'email'}
                                    name={'email'}
                                    value={newuserdata.email}
                                    onChange={handleInputChange}
                                    placeholder={"Email Address"}
                                    required
                                />
                            </div>

                            <div className="">
                                <Dropdown
                                    label="Select User Type"
                                    name="role"
                                    onChange={handleInputChange}
                                    required
                                    options={[
                                        { value: "", label: "Select Role" },
                                        { value: "director", label: "Director" },
                                        { value: "admin", label: "Admin" },
                                        { value: "warden", label: "Warden" },
                                    ]}
                                />
                            </div>


                            <div className="">
                                <DefultButton
                                    btntype={'submit'}
                                    text={'Create New User'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    else {
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        })
    }

}

export default AddUser