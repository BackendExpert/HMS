import React from 'react'
import useRoleGuard from '../../hooks/useRoleGuard'


const Reallocations = () => {
    const isAllowed = useRoleGuard(['admin', 'director', 'student'])
    if (!isAllowed) return null

    return (
        <div>

        </div>
    )
}

export default Reallocations