import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'
import axios from 'axios'


const UpdatePass = () => {
    const navigate = useNavigate()
    const [updatepassdata, setupdatepassdata] = useState({
        email: '',
        newpass: '',
        confirmmewpass: '',
    })

    const passtoken = localStorage.getItem('passtoken')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setupdatepassdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleUpdatePass = async (e) => {
        e.preventDefault()
        if (updatepassdata.newpass !== updatepassdata.confirmmewpass) {
            alert("Password Not Match")
            return
        }
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/passupdate', updatepassdata, {
                headers: {
                    'Authorization': `Bearer ${passtoken}`,
                },
            })
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert(res.data.Message)
                        localStorage.clear()
                        navigate('/', { replace: true })
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

    if (!passtoken || passtoken !== undefined) {
        return (
            <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Password</h2>

                <form onSubmit={headleUpdatePass}>
                    <DefultInput
                        label="Enter Email Address"
                        type="email"
                        name="email"
                        value={updatepassdata.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                    />

                    <DefultInput
                        label="Enter New Password"
                        type="password"
                        name="newpass"
                        value={updatepassdata.newpass}
                        onChange={handleInputChange}
                        placeholder="OTP (One Time Password)"
                        required
                    />

                    <DefultInput
                        label="Confirm New Password"
                        type="password"
                        name="confirmmewpass"
                        value={updatepassdata.confirmmewpass}
                        onChange={handleInputChange}
                        placeholder="Re-Type Password"
                        required
                    />
                    <div className="text-center mt-6">
                        <DefultButton text="Verify OTP" btntype="submit" />
                    </div>
                </form>
            </div>
        )
    }
    else {
        useEffect(() => {
            localStorage.clear()
            navigate('/', { replace: true })
        }, [])
    }

}

export default UpdatePass