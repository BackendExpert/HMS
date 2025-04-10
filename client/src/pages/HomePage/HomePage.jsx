import React from 'react'
import DefultInput from '../../components/Forms/DefultInput'
import TextAreaInput from '../../components/Forms/TextAreaInput'
import Dropdown from '../../components/Forms/Dropdown'
import FileInput from '../../components/Forms/FileInput'
import DefultButton from '../../components/Buttons/DefultButton'


const HomePage = () => {
    return (
        <div className='p-16'>
            <DefultInput
                label={"Enter Number"}
                type='number'
            />

            <TextAreaInput
                label={"Enter Number"}
            />

            <Dropdown
                label="Faculty"
                name="faculty"
                options={[
                    { value: "", label: "Select Faculty" },
                    { value: "arts", label: "Faculty of Arts" },
                    { value: "science", label: "Faculty of Science" },
                    { value: "eng", label: "Faculty of Engineering" },
                ]}
            />

            <FileInput
                label="Upload Transcript"
            />

            <DefultButton />
        </div>
    )
}

export default HomePage