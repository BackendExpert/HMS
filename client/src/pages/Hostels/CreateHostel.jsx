import React, { useState } from 'react'
import DefultInput from '../../components/Forms/DefultInput';
import Dropdown from '../../components/Forms/Dropdown';
import DefultButton from '../../components/Buttons/DefultButton';

const CreateHostel = () => {
    const [createhostel, setcreatehostel] = useState({
        hostalName: '',
        hostelLocation: '',
        hostelType: '',
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
                        <Dropdown
                            label="Hostel Type"
                            name="hostelType"
                            required
                            options={[
                                { value: "maleHostel", label: "Male Hostel" },
                                { value: "femaleHostel", label: "Female Hostel" },
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