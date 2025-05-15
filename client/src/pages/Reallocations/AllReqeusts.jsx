import React from 'react'
import useRoleGuard from '../../hooks/useRoleGuard'

const AllReqeusts = () => {
    const isAllowed = useRoleGuard(['admin', 'director'])
    if (!isAllowed) return null


    return (
        <div>
            
        </div>
    )
}

export default AllReqeusts