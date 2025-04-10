import React from 'react';

const TextAreaInput = ({
    label,
    name,
    rows = 4,
    value,
    onChange,
    placeholder = '',
    required = false,
}) => {
    return (
        <div className="mb-6">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-500 transition duration-200 resize-none"
            />
        </div>
    );
};

export default TextAreaInput;
