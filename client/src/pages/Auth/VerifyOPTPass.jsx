import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DefultInput from '../../components/Forms/DefultInput';
import DefultButton from '../../components/Buttons/DefultButton';
import axios from 'axios';


const VerifyOPTPass = () => {
    const navigate = useNavigate()
    const [otpdata, setotpdata] = useState({
        email: '',
        otp: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setotpdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleforgetpass = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/verifypassotp', otpdata)
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert(res.data.Message)
                        localStorage.setItem('passtoken', res.data.token)
                        navigate('/UpdatePass', { replace: true })
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
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Verify One Time Password</h2>

            <form onSubmit={headleforgetpass}>
                <DefultInput
                    label="Enter Email Address"
                    type="email"
                    name="email"
                    value={otpdata.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                />

                <DefultInput
                    label="Enter OTP (One Time Password)"
                    type="text"
                    name="otp"
                    value={otpdata.otp}
                    onChange={handleInputChange}
                    placeholder="OTP (One Time Password)"
                    required
                />
                <div className="text-center mt-6">
                    <DefultButton text="Verify OTP" btntype="submit" />
                </div>
            </form>
        </div>
    )
}

export default VerifyOPTPass