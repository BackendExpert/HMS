import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { Users } from 'lucide-react';
import axios from 'axios';

const WardenStd = () => {
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
    const token = localStorage.getItem('login');

    const [getvardenstd, setgetvardenstd] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/student/vardenstd', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setgetvardenstd(res.data.Result))
            .catch(err => console.log(err))
    }, [token]);

    const filteredStudents = getvardenstd.filter((student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.enrolmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);

    const stdmenu = [
        {
            id: 1,
            name: 'All Students',
            value: getvardenstd.length,
            icon: Users,
            color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        },
    ];

    const handlePageChange = (pageNum) => {
        if (pageNum > 0 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };

    return (
        <div>
            {/* Dashboard Card */}
            <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                {stdmenu.map((data) => {
                    const Icon = data.icon;
                    return (
                        <div
                            key={data.id}
                            className={`rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl ${data.color}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Icon className="w-10 h-10 opacity-90" />
                                <span className="text-3xl font-bold">{data.value}</span>
                            </div>
                            <h2 className="text-lg font-semibold tracking-wide">{data.name}</h2>
                        </div>
                    );
                })}
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by Name, NIC or Enrolment No"
                className="w-full p-2 mb-4 border rounded shadow"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset to page 1 on search
                }}
            />

            {/* Table */}
            <div className="bg-white p-4 overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                "Enrolment No", "NIC", "First Name", "Gender",
                                "Email", "Phone No 1", "Intake", "Date of Enrolment", "Eligible"
                            ].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 h-12 font-semibold">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((data, index) => (
                            <tr className="even:bg-gray-50 h-16" key={index}>
                                <td className="border px-4 py-2">{data.enrolmentNo}</td>
                                <td className="border px-4 py-2">{data.nic}</td>
                                <td className="border px-4 py-2">{data.firstName}</td>
                                <td className="border px-4 py-2">{data.gender}</td>
                                <td className="border px-4 py-2">{data.email}</td>
                                <td className="border px-4 py-2">{data.phone1}</td>
                                <td className="border px-4 py-2">{data.intake}</td>
                                <td className="border px-4 py-2">{new Date(data.dateOfEnrolment).toLocaleDateString()}</td>
                                <td className="border px-4 py-2 text-center">
                                    {
                                        data.eligible ?
                                            <div className="bg-green-500 text-white py-1 px-2 rounded">Eligible</div> :
                                            <div className="bg-red-500 text-white py-1 px-2 rounded">Not Eligible</div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WardenStd
