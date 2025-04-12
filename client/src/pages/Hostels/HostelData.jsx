// StudentMenu.js
import { FaFemale, FaMale } from "react-icons/fa";
import { FaPlus, FaSchool } from "react-icons/fa6";



const hosteldata = [
    {
        id: 1,
        name: 'All Hostels',
        value: 500,
        clickvalue: 'allhostel',
        icon: FaSchool,
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
        id: 2,
        name: 'Male Hostels',
        value: 320,
        clickvalue: 'maleh',
        icon: FaMale,
        color: 'bg-gradient-to-r from-green-400 to-emerald-600',
    },
    {
        id: 3,
        name: 'Female Hostels',
        value: 150,
        clickvalue: 'femaleh',
        icon: FaFemale,
        color: 'bg-gradient-to-r from-red-400 to-rose-600',
    },
    {
        id: 4,
        name: 'Add Hostels',
        value: '+',
        clickvalue: 'createhostel',
        icon: FaSchool, 
        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    }
];

export { hosteldata };
