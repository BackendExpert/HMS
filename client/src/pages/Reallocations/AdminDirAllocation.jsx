import React, { useState } from 'react'
import AllocationData from './AllocationData'
import useRoleGuard from '../../hooks/useRoleGuard'

const AdminDirAllocation = () => {
    const isAllowed = useRoleGuard(['admin', 'director'])
    if (!isAllowed) return null

    const [valueclick, setvalueclick] = useState('allreqeusts')

    const headleClick = (value) => {
        setvalueclick(value)
    }
    return (
        <div>
            <AllocationData btnclickvalue={headleClick} />

            {
                (() => {
                    if (valueclick === 'allreqeusts') {
                        return (
                            <div className="">all</div>
                        )
                    }
                    else if (valueclick === "accepetd") {
                        return (
                            <div className="">accepetd</div>
                        )
                    }
                    else if (valueclick === "rejected") {
                        return (
                            <div className="">rejected</div>
                        )
                    }
                    else if (valueclick === "pending") {
                        return (
                            <div className="">pending</div>
                        )
                    }
                })()
            }
        </div>
    )
}

export default AdminDirAllocation