import React from 'react';

const ViewMyData = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="w-full bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">📌 My Personal Information</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <tbody>
                            {[
                                ['Index No', 'ENP001'],
                                ['Email', 'jehan@123.com'],
                                ['NIC No', '200105101033'],
                                ['Title', 'Mr.'],
                                ['First Name', 'Jehan'],
                                ['Surname', 'Weerasuriya'],
                                ['Initials', 'W.A.A'],
                                ['Gender', 'Male'],
                                ['Phone', '0711758851 / 0711758851'],
                                ['Live in', 'Kandy'],
                                ['Distance', '7 Km'],
                            ].map(([label, value], i) => (
                                <tr
                                    key={i}
                                    className={`border-b ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                    <td className="px-4 py-3 font-medium text-gray-600 w-1/3">{label}:</td>
                                    <td className="px-4 py-3 text-gray-800">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Column (for future use) */}
            <div className="w-full bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">🗂️ Additional Info (Coming Soon)</h1>
                <p className="text-gray-500 text-sm">
                    This space can be used to show room history, complaint status, or upcoming payments.
                </p>
            </div>
        </div>
    );
};

export default ViewMyData;
