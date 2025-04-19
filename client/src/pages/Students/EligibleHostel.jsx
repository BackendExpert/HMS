import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EligibleHostel = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [allocationData, setAllocationData] = useState([]);
    const [filteredAllocations, setFilteredAllocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const studentsPerPage = 10;
    const token = localStorage.getItem('login');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/student/allstudents`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStudents(res.data.Result || []);
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };

        const fetchAllocationData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/room/roomallocationData`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllocationData(res.data.Result || []);
                setFilteredAllocations(res.data.Result || []);
            } catch (err) {
                console.error('Error fetching allocation data:', err);
            }
        };

        fetchStudents();
        fetchAllocationData();
    }, []);

    useEffect(() => {
        const filtered = allocationData.filter(({ studentId }) =>
            studentId?.enrolmentNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            studentId?.nic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            studentId?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            studentId?.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAllocations(filtered);
        setCurrentPage(1);
    }, [searchQuery, allocationData]);

    const indexOfLast = currentPage * studentsPerPage;
    const indexOfFirst = indexOfLast - studentsPerPage;
    const currentAllocations = filteredAllocations.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredAllocations.length / studentsPerPage);

    const handleRoomAllocation = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/room/roomallocation`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.Status === "Success") {
                alert("Room Allocation Successful");
                window.location.reload();
            } else {
                alert(res.data.error || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Please try again later.");
        }
    };

    const eligibleCount = students.filter(std => std.eligible).length;

    return (
        <div className="w-full px-4 py-6 space-y-4">
            {/* Room Allocation Button */}
            <div>
                {allocationData.length !== eligibleCount ? (
                    <button
                        onClick={handleRoomAllocation}
                        className='bg-blue-600 py-2 px-4 rounded text-white hover:bg-blue-700 transition'
                    >
                        Create Room Allocation
                    </button>
                ) : (
                    <div className="text-red-500">Allocation is Up-to-Date</div>
                )}
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by Enrolment No, NIC, Name or Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />

            {/* Table View (Desktop) */}
            <div className="hidden md:block overflow-auto shadow-md bg-white rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {["Enrolment No", "NIC", "First Name", "Gender", "Email", "Hostel", "Room", "Status", "Action"].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 font-semibold">{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentAllocations.map((allocation, index) => (
                            <tr key={index} className="even:bg-gray-50 h-12">
                                <td className="border px-4 py-2">{allocation.studentId?.enrolmentNo}</td>
                                <td className="border px-4 py-2">{allocation.studentId?.nic}</td>
                                <td className="border px-4 py-2">{allocation.studentId?.firstName}</td>
                                <td className="border px-4 py-2">{allocation.studentId?.gender}</td>
                                <td className="border px-4 py-2">{allocation.studentId?.email}</td>
                                <td className="border px-4 py-2">{allocation.roomId?.hostel?.name}</td>
                                <td className="border px-4 py-2">{allocation.roomId?.roomNumber}</td>
                                <td className="border px-4 py-2 text-center">
                                    <span className="bg-green-500 text-white py-1 px-2 rounded">Allocated</span>
                                </td>
                                <td className="border px-4 py-2">
                                    <button className="text-blue-500 hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {currentAllocations.map((allocation, index) => (
                    <div key={index} className="bg-white shadow-md rounded-xl p-4 border space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between"><span className="font-medium">Enrolment No:</span><span>{allocation.studentId?.enrolmentNo}</span></div>
                        <div className="flex justify-between"><span className="font-medium">NIC:</span><span>{allocation.studentId?.nic}</span></div>
                        <div className="flex justify-between"><span className="font-medium">First Name:</span><span>{allocation.studentId?.firstName}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Gender:</span><span>{allocation.studentId?.gender}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Email:</span><span>{allocation.studentId?.email}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Hostel:</span><span>{allocation.roomId?.hostel?.name}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Room No:</span><span>{allocation.roomId?.roomNumber}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Status:</span><span className="text-green-600">Allocated</span></div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EligibleHostel;
