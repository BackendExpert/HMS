import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10;
    const token = localStorage.getItem('login');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/student/allstudents`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(res => {
                setStudents(res.data.Result);
                setFilteredStudents(res.data.Result);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const filtered = students.filter(student =>
            student.enrolmentNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.nic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudents(filtered);
        setCurrentPage(1);
    }, [searchQuery, students]);

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="w-full px-4 py-6 space-y-4">
            <input
                type="text"
                placeholder="Search by Enrolment No, NIC, Name or Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />

            {/* Desktop Table */}
            <div className="hidden md:block overflow-auto shadow-md bg-white rounded-lg">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            {["Enrolment No", "NIC", "Full Name", "Gender", "Email", "Phone No 1", "Intake", "Date of Enrolment", "Distance (Km)", "Action"].map((heading, i) => (
                                <th key={i} className="border px-4 py-2 h-12 font-semibold">{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((data, index) => (
                            <tr className="even:bg-gray-50 h-16" key={index}>
                                <td className="border px-4 py-2">{data.enrolmentNo}</td>
                                <td className="border px-4 py-2">{data.nic}</td>
                                <td className="border px-4 py-2">{data.fullName || '-'}</td>
                                <td className="border px-4 py-2">{data.sex}</td>
                                <td className="border px-4 py-2">{data.email}</td>
                                <td className="border px-4 py-2">{data.phone1}</td>
                                <td className="border px-4 py-2">{data.intake}</td>
                                <td className="border px-4 py-2">{formatDate(data.dateOfEnrolment)}</td>
                                <td className="border px-4 py-2">{data.distance ?? '-'}</td>
                                <td className="border px-4 py-2">
                                    <Link to={`/Dashboard/StudentView/${data._id}`}>
                                        <button className="text-blue-500 hover:underline">View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {currentStudents.map((student, index) => (
                    <div key={index} className="bg-white shadow-md rounded-xl p-4 border space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between"><span className="font-medium">Enrolment No:</span><span>{student.enrolmentNo}</span></div>
                        <div className="flex justify-between"><span className="font-medium">NIC:</span><span>{student.nic}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Full Name:</span><span>{student.fullName || '-'}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Gender:</span><span>{student.sex}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Email:</span><span>{student.email}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Phone No 1:</span><span>{student.phone1}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Intake:</span><span>{student.intake}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Date of Enrolment:</span><span>{formatDate(student.dateOfEnrolment)}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Distance:</span><span>{student.distance ?? '-'}</span></div>
                        <div className="flex justify-between"><span className="font-medium">Action:</span>
                            <Link to={`/Dashboard/StudentView/${student._id}`}>
                                <button className="text-blue-500 hover:underline">View</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded-lg border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudentTable;
