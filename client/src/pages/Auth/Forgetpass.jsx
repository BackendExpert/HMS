import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Forgetpass = () => {
    const navigate = useNavigate()
    const [forgetpass, setforgetpass] = useState({
        email: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setforgetpass((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleforgetpass = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/signin', forgetpass)
            .then(res => {
                if(res.data.Status === "Success"){
                    alert(res.data.Message)
                    navigate('/VerifyOPTPass', {replace:true})
                }
                else{
                    alert(res.data.Error)
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Forget password</h2>

            <form onSubmit={headleforgetpass}>
                <DefultInput
                    label="Email"
                    type="email"
                    name="email"
                    value={forgetpass.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                />
                <div className="text-center mt-6">
                    <DefultButton text="Request OTP" btntype="submit" />
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                <Link to="/" className="text-blue-600 hover:underline font-semibold">
                    Back
                </Link>
            </p>
        </div>
    )
}

export default Forgetpass