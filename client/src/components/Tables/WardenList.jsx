import React from 'react';

const WardenList = () => {
    const wardens = [
        {
            name: "Dr. Ayesha Khan",
            block: "Block A",
            contact: "ayesha.khan@campus.edu",
            phone: "+91 9876543210",
        },
        {
            name: "Mr. Rajeev Mehta",
            block: "Block B",
            contact: "rajeev.mehta@campus.edu",
            phone: "+91 9123456780",
        },
        {
            name: "Ms. Sneha Rao",
            block: "Block C",
            contact: "sneha.rao@campus.edu",
            phone: "+91 9988776655",
        },
        {
            name: "Ms. Sneha Rao",
            block: "Block C",
            contact: "sneha.rao@campus.edu",
            phone: "+91 9988776655",
        },
    ];

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">🏢 Wardens List</h2>
            <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Block
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Phone
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {wardens.map((warden, index) => (
                        <tr
                            key={index}
                            className="hover:bg-blue-50 transition-colors duration-150"
                        >
                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-gray-800 font-medium">
                                {warden.name}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-gray-700">
                                {warden.block}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-blue-600">
                                {warden.contact}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-gray-700">
                                {warden.phone}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WardenList;
