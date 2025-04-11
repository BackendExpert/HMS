import React from 'react';

const StudentTable = () => {
    return (
        <div className="w-full px-4 py-6">
            <div className="hidden md:block overflow-hidden shadow-md bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 h-12 font-semibold">Enrolment No</th>
                            <th className="border px-4 py-2 h-12 font-semibold">NIC</th>
                            <th className="border px-4 py-2 h-12 font-semibold">First Name</th>
                            <th className="border px-4 py-2 h-12 font-semibold">Gender</th>
                            <th className="border px-4 py-2 h-12 font-semibold">Email</th>
                            <th className="border px-4 py-2 h-12 font-semibold">Phone No 1</th>
                            <th className="border px-4 py-2 h-12 font-semibold">Intake</th>
                            <th className="border px-4 py-2 h-12 font-semibold">Date of Enrolment</th>
                            <th className="border px-4 py-2 h-12 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="even:bg-gray-50 h-16">
                            <td className="border px-4 py-2">ENR001</td>
                            <td className="border px-4 py-2">200012345678</td>
                            <td className="border px-4 py-2">Nimal</td>
                            <td className="border px-4 py-2">Male</td>
                            <td className="border px-4 py-2">nimal@example.com</td>
                            <td className="border px-4 py-2">0771234567</td>
                            <td className="border px-4 py-2">2022</td>
                            <td className="border px-4 py-2">2022-03-01</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500 hover:underline">
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                <div className="bg-white shadow-md rounded-xl p-4 border">
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Enrolment No:</span>
                        <span className="text-right">ENR001</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">NIC:</span>
                        <span className="text-right">200012345678</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">First Name:</span>
                        <span className="text-right">Nimal</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Gender:</span>
                        <span className="text-right">Male</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Email:</span>
                        <span className="text-right">nimal@example.com</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Phone No 1:</span>
                        <span className="text-right">0771234567</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Intake:</span>
                        <span className="text-right">2022</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Date of Enrolment:</span>
                        <span className="text-right">2022-03-01</span>
                    </div>
                    <div className="flex justify-between py-1 text-sm text-gray-700">
                        <span className="font-medium">Action:</span>
                        <span className="text-right">
                            <button className="text-blue-500 hover:underline">
                                View
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentTable;
