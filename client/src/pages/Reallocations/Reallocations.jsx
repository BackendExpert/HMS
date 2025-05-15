import React from 'react'
import AllocationData from './AllocationData'
import useRoleGuard from '../../hooks/useRoleGuard'

const Reallocations = () => {
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
                            <div className=""></div>
                        )
                    }
                    else if (valueclick === "accepetd") {
                        return (
                            <div className=""></div>
                        )
                    }
                    else if (valueclick === "rejected") {
                        return (
                            <div className=""></div>
                        )
                    }
                    else if (valueclick === "pending") {
                        return (
                            <div className=""></div>
                        )
                    }
                })()
            }
        </div>
    )
}

export default Reallocations