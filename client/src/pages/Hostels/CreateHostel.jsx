import React, { useEffect, useState } from 'react'
import DefultInput from '../../components/Forms/DefultInput';
import Dropdown from '../../components/Forms/Dropdown';
import DefultButton from '../../components/Buttons/DefultButton';
import axios from 'axios'

const CreateHostel = () => {
    const [getwarden, setgetwarden] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/hostel/getwardens', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => setgetwarden(res.data.Result))
        .catch(err => console.log(err))
    })
    
    const [createhostel, setcreatehostel] = useState({
        hostalName: '',
        hostelLocation: '',
        hostelType: '',
        hostelwarden: '',
        roomCapacity: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcreatehostel((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/hostel/createhostel', createhostel)
                .then(res => {
                    if (res.data.Status === "Success") {
                        alert("Hostel Created Success")
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
        <div className=''>
            <div className="my-4 bg-white p-4 rounded-lg shadow-xl">
                <form onSubmit={headleSubmit} method="post">
                    <div className="my-2">
                        <DefultInput
                            type={'text'}
                            label={'Hostel Name'}
                            name={'hostalName'}
                            value={createhostel.hostalName}
                            required
                            placeholder={"Hostel Name"}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <DefultInput
                            type={'link'}
                            label={'Hostel Location'}
                            name={'hostelLocation'}
                            value={createhostel.hostelLocation}
                            required
                            placeholder={"Hostel Location (Add Google Map Link)"}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <DefultInput
                            type={'number'}
                            label={'Room Capacity'}
                            name={'roomCapacity'}
                            value={createhostel.roomCapacity}
                            required
                            placeholder={"Room Capacity of Hostel"}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <Dropdown
                            label="Hostel Type"
                            name="hostelType"
                            required
                            options={[
                                { value: "Male", label: "Male Hostel" },
                                { value: "Female", label: "Female Hostel" },
                            ]}
                        />
                    </div>

                    <div className="my-2">
                        <DefultButton 
                            btntype={'submit'}
                            text='Create New Hostel'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateHostel