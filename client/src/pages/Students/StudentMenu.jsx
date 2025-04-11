// StudentMenu.js
import { Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const stdmenu = [
    {
        id: 1,
        name: 'All Students',
        value: 500,
        clickvalue: 'allstd',
        icon: Users,
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
        id: 2,
        name: 'Eligible Students',
        value: 320,
        clickvalue: 'eligible',
        icon: CheckCircle,
        color: 'bg-gradient-to-r from-green-400 to-emerald-600',
    },
    {
        id: 3,
        name: 'Not Eligible Students',
        value: 150,
        clickvalue: 'noteligible',
        icon: XCircle,
        color: 'bg-gradient-to-r from-red-400 to-rose-600',
    },
    {
        id: 4,
        name: 'Add Students',
        value: '+',
        clickvalue: 'addstd',
        icon: AlertCircle, 
        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    }
];

export { stdmenu };
