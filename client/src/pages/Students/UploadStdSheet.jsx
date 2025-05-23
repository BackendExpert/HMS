import React, { useState } from 'react';
import FileInput from '../../components/Forms/FileInput';
import DefultButton from '../../components/Buttons/DefultButton';
import axios from 'axios';

const UploadStdSheet = () => {
    const token = localStorage.getItem('login')

    const [uploadsheet, setuploadsheet] = useState({
        sheet: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setuploadsheet((prevData) => ({
                ...prevData,
                sheet: file,
            }));
        }
    };

    const headleuploadsheet = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', uploadsheet.sheet); 

            const res = await axios.post(
                import.meta.env.VITE_APP_API + '/student/uploadsheet',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )
            .then(res => {
                console.log('Response:', res);
                if(res.data.Status === "Success"){
                    alert("Uploaded Success")
                    window.location.reload()
                }
                else{
                    alert(res.data.Error)
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="my-6">
            <div className="bg-white shadow-md p-4 rounded">
                <h1 className="text-lg text-gray-500 font-semibold">Upload Student Data Sheet</h1>

                <form onSubmit={headleuploadsheet}>
                    <div className="my-4">
                        <FileInput
                            label="Enter Student Data Sheet"
                            name="sheet"
                            required
                            onChange={handleImageChange}
                        />
                    </div>

                    <DefultButton btntype="submit" text="Upload Student Data Sheet" />
                </form>
            </div>
        </div>
    );
};

export default UploadStdSheet;
