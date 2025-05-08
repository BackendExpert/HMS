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
        <div className='bg-gray-200 min-h-screen'>
            <div className="xl:grid grid-cols-3 gap-4 xl:py-[10%] py-[15%] xl:px-0 px-4 md:px-16">
                <div className="w-full"></div>
                <div className="w-full bg-white p-8 rounded-md shadow-xl">
                    <div className="">
                        <h1 className="text-center font-semibold uppercase text-xl text-gray-500">Login</h1>

                        <div className="mt-4">
                            <form onSubmit={headleSubmit} method="post">

                                <div className="my-1">
                                    <DefultInput
                                        label={"Enter Email Address"}
                                        placeholder={"Email Address"}
                                        name={'email'}
                                        value={signupdata.email}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="my-1">
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
                        </div>
                        <div className="mt-4">
                            <div className="">
                                <a href="" className='text-blue-600 font-semibold'>Forget Password ?</a>
                            </div>
                            <div className="">
                                Don't have Account ? <a href="/signup" className='text-blue-600 font-semibold'>Create Account</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full"></div>
            </div>
        </div>
    )
}

export default Signin