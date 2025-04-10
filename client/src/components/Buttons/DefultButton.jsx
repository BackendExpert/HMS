import React from 'react'

const DefultButton = ({ text = 'Click Me', onClick, btntype }) => {
    return (
        <button
            type={btntype}
            onClick={onClick}
            className="px-8 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-extrabold rounded-full shadow-xl transform transition duration-300 hover:scale-110 hover:from-teal-600 hover:to-blue-600 hover:shadow-2xl hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
        >
            {text}
        </button>
    )
}

export default DefultButton
