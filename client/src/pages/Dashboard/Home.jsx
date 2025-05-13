import React from 'react'
import secureLocalStorage from 'react-secure-storage'
import AdminDashboard from './AdminDashboard';
import DirDashbaord from './DirDashbaord';
import WardenDashboard from './WardenDashboard';
import StudentDash from './StudentDash';

const Home = () => {
    const token = localStorage.getItem('login');
    const username = secureLocalStorage.getItem('loginU')
    const role = secureLocalStorage.getItem('loginR')
  return (
    <div>
        {
            (() => {
                if(role === "admin"){
                    return (
                        <AdminDashboard />
                    )
                }
                else if(role === "director"){
                    return (
                        <DirDashbaord />
                    )
                }
                else if(role === "warden"){
                    return (
                        <WardenDashboard />
                    )
                }
                else if(role === "student"){
                    return (
                        <StudentDash />
                    )
                }
            })()
        }
    </div>
  )
}

export default Home