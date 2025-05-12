import uoplogo from '../../assets/uoplogo.png'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'
import secureLocalStorage from 'react-secure-storage'


const Signin = () => {
    const navigate = useNavigate()
    const [signupdata, setsignupdata] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setsignupdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/signin', signupdata)
                .then(res => {
                    if (res.data.Status === "Success") {
                        navigate('/Dashboard/Home')
                        alert("Login Success")
                        localStorage.setItem("login", res.data.Token)
                        secureLocalStorage.setItem("loginE", res.data.Result.email)
                        secureLocalStorage.setItem("loginU", res.data.Result.username)
                        secureLocalStorage.setItem("loginR", res.data.Result.role)
                        localStorage.setItem("dashmenuID", 1)
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
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
            <div className="xl:w-[70%] w-full md:w-[90%] p-4">
                <div className="xl:flex bg-white rounded-md shadow-md overflow-hidden">
                    <div className="xl:w-1/2 w-full py-12 md:px-10 px-4">
                        <img src={uoplogo} alt="" className='h-12 w-auto' />
                        <h1 className="text-xl mt-4 text-gray-500 font-semibold">Welcome Back!</h1>
                        <p className="text-gray-600 text-sm mt-4">
                            Now you are login to Hostel Management System at University of Peradeniya
                        </p>

                        <form onSubmit={headleSubmit} method="post" className="mt-6">
                            <div className="my-4">
                                <DefultInput
                                    label={"Enter Email Address"}
                                    placeholder={"Email Address"}
                                    name={'email'}
                                    value={signupdata.email}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="my-4">
                                <DefultInput
                                    type='password'
                                    label={"Enter Password"}
                                    placeholder={"Password"}
                                    name={'password'}
                                    value={signupdata.password}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>

                            <DefultButton
                                btntype={'submit'}
                                text='SignIn'
                            />
                        </form>

                        <div className="">
                            <div className="mt-4">
                                <div className="">
                                    <a href="" className='text-blue-600 font-semibold'>Forget Password ?</a>
                                </div>

                                <div className="md:flex justify-between mt-4">
                                    <div className="">
                                        <a href="/StudentEmailVerify" className='text-blue-600 font-semibold'>Verify Email (if Student)</a>
                                    </div>

                                    <div className="text-gray-500">
                                        <a href="/signup" className='text-blue-600 font-semibold'>Create Account</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 bg-[url(https://wallpapercave.com/wp/wp7373636.jpg)] bg-cover bg-center">
                    </div>

                </div>
            </div>
        </div>
    );

};

export default Signin;
