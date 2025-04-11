import { MdBedroomParent, MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { FaSchool, FaUserGraduate , FaGear } from "react-icons/fa6";
import { FaUserCog, FaUsers } from "react-icons/fa";


const dashsidedata = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/Dashboard/Home',
        icon: MdDashboard
    },
    {
        id: 2,
        name: 'Hostel',
        link: '#',
        icon: FaSchool
    },
    {
        id: 3,
        name: 'My Hostel',
        link: '#',
        icon: FaSchool
    },
    {
        id: 4,
        name: 'Rooms',
        link: '#',
        icon: MdBedroomParent
    },
    {
        id: 5,
        name: 'Students',
        link: '/Dashboard/Students',
        icon: FaUserGraduate
    },
    {
        id: 6,
        name: 'Warden',
        link: '#',
        icon: MdAdminPanelSettings
    },
    {
        id: 7,
        name: 'Profile',
        link: '#',
        icon: FaUserCog,
    },
    {
        id: 8,
        name: 'Users',
        link: '#',
        icon: FaUsers
    },
    {
        id: 9,
        name: 'Settings',
        link: '#',
        icon: FaGear
    },
]

export { dashsidedata }