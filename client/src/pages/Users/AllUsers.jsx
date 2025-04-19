import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

const AllUsers = () => {
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    const emailUser = secureLocalStorage.getItem('loginE');
    const token = localStorage.getItem('login');

    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/auth/allusers', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setAllUsers(res.data.Result);
                setFilteredUsers(res.data.Result);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = allUsers.filter(user =>
            user.username.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch) ||
            user.role.toLowerCase().includes(lowerSearch)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [search, allUsers]);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const toggleUserStatus = async (userId, newStatus) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_APP_API}/auth/togglestatus/${userId}`,
                { isActive: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.Status === "Success") {
                alert("User account updated");
                window.location.reload()
            } else {
                alert(res.data.Error || "Failed to update user status");
            }
        } catch (error) {
            console.error('Error updating user status:', error);
            alert('Failed to update user status');
        }
    };



    return (
        <div className="p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">All Users</h2>

            <input
                type="text"
                placeholder="Search by name, email or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-full max-w-md mb-4"
            />

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Join Date</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <span className={`px-2 py-1 rounded text-white ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {user.isActive ? 'Active User' : 'Deactivated User'}
                                </span>
                            </td>
                            <td className="border p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="border p-2">
                                {user.email === emailUser ? (
                                    <span className="text-gray-500 italic">Current User</span>
                                ) : role === 'director' ? (
                                    <button
                                        className={`px-3 py-1 rounded text-white ${user.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                        onClick={() => toggleUserStatus(user._id, !user.isActive)}
                                    >
                                        {user.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                ) : (
                                    <span className="text-gray-400 italic">No permission</span>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
