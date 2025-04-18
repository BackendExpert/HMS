import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllRooms = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 10;
    const [roomData, setRoomData] = useState([]);

    // Fetch token
    const token = localStorage.getItem('login');

    // Fetch rooms
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/room/allrooms`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => setRoomData(res.data.Result || []))
        .catch(err => console.error('Error fetching rooms:', err));
    }, []);

    // Filter rooms
    const filteredRooms = roomData.filter(room =>
        room?.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room?.hostel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room?.gender?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    return (
        <div className="my-8 px-4">
            {/* Search */}
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">All Rooms</h2>
                <input
                    type="text"
                    placeholder="Search by Room / Hostel / Gender"
                    className="border rounded px-3 py-2 text-sm w-72"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Table */}
            <div className="overflow-auto shadow-md bg-white rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {["Room Number", "Hostel", "Students Count", "Room Gender", "Action"].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 h-12 font-semibold whitespace-nowrap">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.length > 0 ? currentRooms.map((room, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{room?.roomNumber}</td>
                                <td className="px-4 py-2">{room?.hostel}</td>
                                <td className="px-4 py-2">{room?.currentOccupants}</td>
                                <td className="px-4 py-2">{room?.gender}</td>
                                <td className="px-4 py-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
                                        View
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">No rooms found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllRooms;
