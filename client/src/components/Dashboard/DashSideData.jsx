import { MdBedroomParent, MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { FaSchool, FaUserGraduate , FaGear } from "react-icons/fa6";
import { FaUserCog, FaUsers } from "react-icons/fa";


const dashsidedata = [
    {
        id: 1,
        name: 'Dashboard',
        link: '#',
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
        name: 'Rooms',
        link: '#',
        icon: MdBedroomParent
    },
    {
        id: 4,
        name: 'Students',
        link: '#',
        icon: FaUserGraduate
    },
    {
        id: 5,
        name: 'Warden',
        link: '#',
        icon: MdAdminPanelSettings
    },
    {
        id: 6,
        name: 'Profile',
        link: '#',
        icon: FaUserCog,
    },
    {
        id: 7,
        name: 'Users',
        link: '#',
        icon: FaUsers
    },
    {
        id: 8,
        name: 'Settings',
        link: '#',
        icon: FaGear
    },
]

export { dashsidedata }