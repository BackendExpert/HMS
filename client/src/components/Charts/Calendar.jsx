import React, { useState } from "react";

const Calendar = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDaysInMonth = (year, month) =>
        new Date(year, month + 1, 0).getDate();

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = getDaysInMonth(year, month);
        const calendarDays = [];

        // Empty slots before the first day
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(null);
        }

        // Days of the current month
        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(i);
        }

        return calendarDays;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const calendarDays = generateCalendar();

    return (
        <div className="p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    className="text-xl font-bold text-gray-600 hover:text-gray-900"
                >
                    &lt;
                </button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button
                    onClick={nextMonth}
                    className="text-xl font-bold text-gray-600 hover:text-gray-900"
                >
                    &gt;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-xs font-medium text-gray-500 uppercase">
                        {day}
                    </div>
                ))}
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm ${day === today.getDate() &&
                                currentDate.getMonth() === today.getMonth() &&
                                currentDate.getFullYear() === today.getFullYear()
                                ? "bg-yellow-500 text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        {day || ""}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
