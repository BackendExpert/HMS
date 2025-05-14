import React, { useState } from 'react'
import DefultInput from '../../../components/Forms/DefultInput';
import Dropdown from '../../../components/Forms/Dropdown';
import DefultButton from '../../../components/Buttons/DefultButton';
import axios from 'axios'

const StudentUpdateForm = () => {
    const token = localStorage.getItem('login');
    const [stdupdata, setstdupdate] = useState({
        nic: '',
        title: '',
        firstName: '',
        surname: '',
        initials: '',
        phone: '',
    })

    const usertitle = [
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Miss.', value: 'Miss.' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setstdupdate((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleUpdateStdData = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/student/updatemydata', stdupdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert(res.data.Message)
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
            <form onSubmit={headleUpdateStdData} method="post">
                <div className="">
                    <DefultInput
                        label={'Enter NIC'}
                        type={'text'}
                        name={'nic'}
                        value={stdupdata.nic}
                        required
                        placeholder={"NIC Number"}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="">
                    <Dropdown
                        label="Select Title"
                        name="title"
                        onChange={handleInputChange}
                        required
                        options={usertitle}
                    />
                </div>
                <div className="">
                    <DefultInput
                        label={'Enter First Name'}
                        type={'text'}
                        name={'firstName'}
                        value={stdupdata.firstName}
                        required
                        placeholder={"First Name"}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="">
                    <DefultInput
                        label={'Enter Surname'}
                        type={'text'}
                        name={'surname'}
                        value={stdupdata.surname}
                        required
                        placeholder={"Surname"}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="">
                    <DefultInput
                        label={'Enter Initials'}
                        type={'text'}
                        name={'initials'}
                        value={stdupdata.initials}
                        required
                        placeholder={"Initials"}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="">
                    <DefultInput
                        label={'Enter Phone Number'}
                        type={'text'}
                        name={'phone'}
                        value={stdupdata.phone}
                        required
                        placeholder={"Phone Number"}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="">
                    <DefultButton 
                        btntype={'submit'}
                        text='Update Personal Information'
                    />
                </div>
            </form>
        </div>
    )
}

export default StudentUpdateForm