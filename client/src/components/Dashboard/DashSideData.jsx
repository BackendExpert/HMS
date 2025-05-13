import { MdBedroomParent, MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { FaSchool, FaUserGraduate, FaGear, FaRegClipboard, FaBell, FaRegChartBar, FaRegComments } from "react-icons/fa6";
import { FaUserCog, FaUsers } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const dashsidedata = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/Dashboard/Home',
        icon: MdDashboard
    },
    {
        id: 2,
        name: 'Hostels',
        link: '/Dashboard/Hostels',
        icon: FaSchool
    },
    {
        id: 3,
        name: 'Rooms',
        link: '/Dashboard/Rooms',
        icon: MdBedroomParent
    },
    {
        id: 4,
        name: 'Students',
        link: '/Dashboard/Students',
        icon: FaUserGraduate
    },
    {
        id: 5,
        name: 'My Information',
        link: '/Dashboard/MyRoomHostel',
        icon: FaUserGraduate
    },
    {
        id: 6,
        name: 'Reallocation Requests',
        link: '/Dashboard/Reallocations',
        icon: FaRegClipboard
    },
    {
        id: 7,
        name: 'Notifications',
        link: '/Dashboard/Notifications',
        icon: FaBell
    },
    {
        id: 8,
        name: 'Reports',
        link: '/Dashboard/Reports',
        icon: FaRegChartBar
    },
    {
        id: 9,
        name: 'Feedback/Complaints',
        link: '/Dashboard/Feedback',
        icon: FaRegComments
    },
    {
        id: 10,
        name: 'Users',
        link: '/Dashboard/Users',
        icon: FaUsers
    },
    {
        id: 11,
        name: 'Settings',
        link: '/Dashboard/Settings',
        icon: IoIosSettings
    },
    {
        id: 12,
        name: 'Profile',
        link: '/Dashboard/Profile',
        icon: FaUserCog
    }
];

export { dashsidedata };
