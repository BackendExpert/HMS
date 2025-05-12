import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefultInput from '../../components/Forms/DefultInput'
import DefultButton from '../../components/Buttons/DefultButton'
import Dropdown from '../../components/Forms/Dropdown'


const Signup = () => {
    const navigate = useNavigate()
    const [signupdata, setsignupdata] = useState({
        indexNo: '',
        username: '',
        email: '',
        password: '',
        role: '',
        address: '',
        faculty: ''
    })

    const facultyOptions = [
        { label: 'Faculty of Agriculture', value: 'Faculty of Agriculture' },
        { label: 'Faculty of Allied Health Sciences', value: 'Faculty of Allied Health Sciences' },
        { label: 'Faculty of Arts', value: 'Faculty of Arts' },
        { label: 'Faculty of Dental Sciences', value: 'Faculty of Dental Sciences' },
        { label: 'Faculty of Engineering', value: 'Faculty of Engineering' },
        { label: 'Faculty of Management', value: 'Faculty of Management' },
        { label: 'Faculty of Medicine', value: 'Faculty of Medicine' },
        { label: 'Faculty of Science', value: 'Faculty of Science' },
        { label: 'Faculty of Veterinary Medicine and Animal Science', value: 'Faculty of Veterinary Medicine and Animal Science' },
        { label: 'Postgraduate Institute of Humanities and Social Sciences (PGIHS)', value: 'Postgraduate Institute of Humanities and Social Sciences (PGIHS)' },
        { label: 'Postgraduate Institute of Agriculture (PGIA)', value: 'Postgraduate Institute of Agriculture (PGIA)' },
    ];

    const roleusers = [
        { label: 'Student', value: 'student' },
        { label: 'Warden', value: 'warden' },
    ];

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
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/signup', signupdata)
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert("Registation Success")
                        navigate('/')
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
        <div className='bg-gray-200 min-h-screen -mb-8'>
            <div className="xl:grid grid-cols-3 gap-4 xl:py-[5%] py-[15%] xl:px-0 px-4 md:px-16">
                <div className="w-full"></div>
                <div className="w-full bg-white p-8 rounded-md shadow-xl">
                    <div className="">
                        <h1 className="text-center font-semibold uppercase text-xl text-gray-500">Registation</h1>
                        <h1 className="my-4">
                            <span className='text-red-500 font-semibold uppercase'>important :</span>
                            <span className="text-gray-500"> Please Read <span className='text-blue-500 font-semibold'>Student Sign-Up Guide</span> before the Registation</span>
                        </h1>
                        <hr />
                        <div className="mt-4">
                            <form onSubmit={headleSubmit} method="post">
                                <div className="xl:flex justify-between">
                                    <div className="">
                                        <DefultInput
                                            label={"Enter Registaion Number"}
                                            placeholder={"Index Number"}
                                            name={'indexNo'}
                                            value={signupdata.indexNo}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="">
                                        <DefultInput
                                            label={"Enter Username"}
                                            placeholder={"Username"}
                                            name={'username'}
                                            value={signupdata.username}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <DefultInput
                                        label={"Enter Email Address"}
                                        placeholder={"Email Address"}
                                        name={'email'}
                                        value={signupdata.email}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="">
                                    <Dropdown
                                        label="Enter Role Options"
                                        name="role"
                                        onChange={handleInputChange}
                                        required
                                        options={roleusers}
                                    />
                                </div>

                                {signupdata.role === 'student' && (
                                    <div className="xl:flex justify-between">
                                        <div className="w-1/2">
                                            <Dropdown
                                                label="Enter Faculty"
                                                name="faculty"
                                                onChange={handleInputChange}
                                                required
                                                options={facultyOptions}
                                            />
                                        </div>
                                        <div className="">
                                            <DefultInput
                                                label={"Enter Nearest City"}
                                                placeholder={"Nearest City"}
                                                name={'address'}
                                                value={signupdata.address}
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}


                                <div className="">
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
                                    text='Create Account'
                                />

                            </form>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="">
                                Already have Account ? <a href="/" className='text-blue-600 font-semibold'>Login</a>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="text-sm text-gray-500 font-sembold">
                            How to Register on Hostal Management System ? <a href="/signupInfo" className='font-semibold text-blue-600 duration-500 hover:underline'>Student SignUp Guide</a>
                        </div>
                    </div>
                </div>
                <div className="w-full"></div>
            </div>
        </div>
    )
}

export default Signup