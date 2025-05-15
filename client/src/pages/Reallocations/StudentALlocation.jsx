import React, { useState } from 'react'
import StudentReallocationdata from './StudentReallocationdata'
import CreateREallocation from './CreateREallocation'
import useRoleGuard from '../../hooks/useRoleGuard'


const StudentALlocation = () => {
    const isAllowed = useRoleGuard(['admin', 'director', 'student'])
    if (!isAllowed) return null

    const [valueclick, setvalueclick] = useState('mystdreqsut')

    const headleClick = (value) => {
        setvalueclick(value)
    }

    return (
        <div>
            <StudentReallocationdata btnclickvalue={headleClick} />
            {valueclick === 'mystdreqsut' && (
                <div>
                    All Requests
                </div>
            )}

            {valueclick === 'createstdrequest' && (
                <div>
                    <CreateREallocation />
                </div>
            )}
        </div>
    )
}

export default StudentALlocation