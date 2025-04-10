import React from 'react'

const DateInput = ({ label, name, ...props }) => {
    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="date"
                id={name}
                name={name}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-500 transition duration-200 text-gray-800"
                {...props}
            />
        </div>
    )
}

export default DateInput