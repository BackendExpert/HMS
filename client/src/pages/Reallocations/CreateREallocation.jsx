import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateREallocation = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('login')
    const [hosteldatastd, sethosteldatastd] = useState(null);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/student/getcurrentstdhostlroom', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                sethosteldatastd(res.data.Result);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    const [reallocationdata, setreallocationdata] = useState({
        currenthostal: '',
        currentroom: '',
        requesthostel: '',
        requestroom: '',
        reson: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setreallocationdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleSubmitReallocation = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/reallocation/createReallocation', reallocationdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            .then(res => {
                if(res.data.Status === "Success"){
                    alert(res.data.Message)
                    window.location.reload()
                }
                else{
                    alert(res.data.Error)
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='bg-white p-8 rounded-xl shadow-xl'>
            <h1 className="text-xl font-semibold text-gray-500">Create New Reallocation</h1>

            <div className="my-4">
                <form onSubmit={headleSubmitReallocation} method="post">

                </form>
            </div>
        </div>
    )
}

export default CreateREallocation