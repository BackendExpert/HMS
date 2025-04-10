import React from 'react'

const TextAreaInput = ({ label, name, rows = 4, ...props }) => {
    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                {...props}
            />
        </div>
    )
}

export default TextAreaInput