import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const useRoleGuard = (allowedRoles = []) => {
    const role = secureLocalStorage.getItem('loginR');

    useEffect(() => {
        if (!allowedRoles.includes(role)) {
            localStorage.clear();
            window.location.reload();
        }
    }, [role]);

    return allowedRoles.includes(role);
};

export default useRoleGuard;