import React from 'react'

const FileInput = ({ label, name, ...props }) => {
    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="file"
                name={name}
                id={name}
                className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-2xl shadow-sm file:px-4 file:py-2 file:mr-4 file:border-0 file:bg-blue-50 file:text-blue-700 file:rounded-xl hover:file:bg-blue-100 transition duration-200"
                {...props}
            />
        </div>
    )
}

export default FileInput