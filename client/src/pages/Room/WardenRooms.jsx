import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { MdBedroomParent } from "react-icons/md";

const WardenRooms = () => {
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    const token = localStorage.getItem('login');

    const [vardenrooms, setvardenrooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/room/vardenrooms', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setvardenrooms(res.data.Result || []))
            .catch(err => console.log(err));
    }, [token]);

    const filteredRooms = vardenrooms.filter(room =>
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.hostel?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
    const displayedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            {/* Card */}
            <div className="mb-6">
                <div className="rounded-2xl p-5 text-white shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition-transform w-full max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <MdBedroomParent className="w-10 h-10 opacity-90" />
                        <span className="text-3xl font-bold">{vardenrooms.length}</span>
                    </div>
                    <h2 className="text-lg font-semibold tracking-wide">All Rooms</h2>
                </div>
            </div>

            {/* Search box */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by room number or hostel name..."
                    className="w-full p-3 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Table */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {["Room Number", "Hostel", "Students Count", "Room Gender"].map((heading, i) => (
                                <th key={i} className="h-12 border px-4 py-2 font-semibold whitespace-nowrap">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedRooms.map((data, index) => (
                            <tr key={index} className="h-12 even:bg-gray-50">
                                <td className="border px-4 py-2">{data.roomNumber}</td>
                                <td className="border px-4 py-2">{data.hostel?.name}</td>
                                <td className="border px-4 py-2">{data.currentOccupants} / {data.capacity} ({data.status})</td>
                                <td className="border px-4 py-2">{data.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handlePageChange(idx + 1)}
                            className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WardenRooms;
