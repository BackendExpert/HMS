import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DefultButton from '../../components/Buttons/DefultButton';
import DefultInput from '../../components/Forms/DefultInput';
import axios from 'axios'

const EmailVerifyStd = () => {
    const navigate = useNavigate()
    const [verifystdemail, setverifystdemail] = useState({
        email: '',
        otp: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setverifystdemail((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleVerfiyEmail = async (e) => {        
        e.preventDefault()
        // console.log(verifystdemail)
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/stdEmailVerfy', verifystdemail)
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert(res.data.Message)
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

    return (
        <div className='bg-gray-200 min-h-screen'>
            <div className="xl:grid grid-cols-3 gap-4 xl:py-[10%] py-[15%] xl:px-0 px-4 md:px-16">
                <div className="w-full"></div>
                <div className="w-full bg-white p-8 rounded-md shadow-xl">
                    <div className="">
                        <h1 className="text-center font-semibold uppercase text-xl text-gray-500">Student Email Verification</h1>

                        <div className="mt-4">
                            <form onSubmit={headleVerfiyEmail} method="post">

                                <div className="my-1">
                                    <DefultInput
                                        label={"Enter Email Address"}
                                        placeholder={"Email Address"}
                                        name={'email'}
                                        value={verifystdemail.email}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="my-1">
                                    <DefultInput
                                        type='text'
                                        label={"Enter OTP"}
                                        placeholder={"One Time Password (OTP)"}
                                        name={'otp'}
                                        value={verifystdemail.otp}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <DefultButton
                                    btntype={'submit'}
                                    text='Verify Email Address'
                                />

                            </form>
                        </div>
                        <div className="mt-4">
                            <div className="">
                                <a href="/" className='text-blue-600 font-semibold'>Back</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full"></div>
            </div>
        </div>
    )
}

export default EmailVerifyStd