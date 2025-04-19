import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaRegCalendarCheck } from 'react-icons/fa';

const CommenPart = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');

    // Function to get current time, date and day of the week
    const getDateTime = () => {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();
        const day = now.toLocaleString('en-US', { weekday: 'long' });

        setCurrentTime(time);
        setCurrentDate(date);
        setDayOfWeek(day);
    };

    // Update the time, date and day every second
    useEffect(() => {
        getDateTime(); // Set current time, date, and day on mount

        const timeInterval = setInterval(() => {
            getDateTime(); // Update every second
        }, 1000); // Update time every second

        return () => {
            clearInterval(timeInterval); // Clean up on unmount
        };
    }, []);

    const commandata = [
        {
            id: 1,
            name: 'Current Time',
            value: currentTime,
            icon: <FaClock />,
            color: 'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600',
        },
        {
            id: 2,
            name: 'Current Date',
            value: currentDate,
            icon: <FaCalendarAlt />,
            color: 'bg-gradient-to-r from-blue-400 via-teal-500 to-green-600',
        },
        {
            id: 3,
            name: 'Day of the Week',
            value: dayOfWeek,
            icon: <FaRegCalendarCheck />,
            color: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600',
        },
    ];

    return (
        <div className="py-6 px-2 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {commandata.map(item => (
                    <div
                        key={item.id}
                        className={`rounded-2xl p-6 shadow-lg text-white transform transition-all hover:scale-105 hover:shadow-2xl ${item.color}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-white text-gray-800 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <span className="text-3xl font-bold">{item.value}</span>
                        </div>
                        <h2 className="text-xl font-semibold tracking-wide">{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommenPart;
