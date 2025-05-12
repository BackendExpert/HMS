import React, { useState } from 'react'

const UpdatePass = () => {
    const [updatepassdata, setupdatepassdata] = useState({
        email: '',
        newpass: '',
        confirmmewpass: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setupdatepassdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleUpdatePass = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/passupdate', updatepassdata, )
            .then({

            })
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div>UpdatePass</div>
    )
}

export default UpdatePass