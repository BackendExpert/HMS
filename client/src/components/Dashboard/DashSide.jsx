import React, { useEffect, useState } from 'react';
import { dashsidedata } from './DashSideData';
import { Link } from 'react-router-dom';

const DashSide = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const savedMenu = localStorage.getItem('dashmenuID');
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const handleMenuClick = (id) => {
    localStorage.setItem('dashmenuID', id);
    setActiveMenu(id);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-extrabold text-gradient bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500">
          HMS
        </h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center mb-6 p-4 bg-gray-700 rounded-xl shadow-md">
        <img
          src="https://avatars.githubusercontent.com/u/138636749?v=4"
          alt="User"
          className="h-14 w-14 rounded-full border-4 border-white"
        />
        <div className="ml-4">
          <h1 className="text-lg font-medium">s956465465</h1>
          <p className="text-sm text-gray-400 uppercase">Admin</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4"> {/* Adjusted gap here */}
      {dashsidedata.map((data, index) => (
        <Link to={data.link} key={index} className="block"> {/* 'block' helps ensure spacing applies cleanly */}
          <div
            className={`flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-all duration-300 
            ${activeMenu === data.id ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
            onClick={() => handleMenuClick(data.id)}
          >
            <data.icon className="h-6 w-6 text-gray-300" />
            <h1 className="text-lg font-medium text-white">{data.name}</h1>
          </div>
        </Link>
      ))}
    </div>

    </div>
  );
};

export default DashSide;
