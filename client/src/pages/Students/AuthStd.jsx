import React, { useState } from 'react';
import StudentTable from './StudentTable';
import CreateStds from './CreateStds';
import StudentData from './StudentData';
import EligibleStds from './EligibleStds';
import NotEligibleStds from './NotEligibleStds';
import EligibleHostel from './EligibleHostel';

const AuthStd = () => {

    const [valueclick, setvalueclick] = useState('allstd')

    const headleClick = (value) => {
        setvalueclick(value)
    }

    return (
        <div className="">
            <StudentData btnclickvalue={headleClick}/>

            <div className="mt-4">
                {
                    (() => {
                        if (valueclick === "allstd") {
                            return (
                                <div className="mt-4">
                                    <StudentTable />
                                </div>
                            )
                        }
                        if (valueclick === "eligible") {
                            return (
                                <div className="mt-4">
                                    <EligibleStds />
                                </div>
                            )
                        }
                        if (valueclick === "noteligible") {
                            return (
                                <div className="mt-4">
                                    <NotEligibleStds />
                                </div>
                            )
                        }
                        if (valueclick === "createstd") {
                            return (
                                <div className="mt-4">
                                    <CreateStds />
                                </div>
                            )
                        }
                        if (valueclick === "eligiblehostel"){
                            return (
                                <div className="">
                                    <EligibleHostel />
                                </div>
                            )
                        }
                    })()
                }
            </div>

        </div>
    );
};

export default AuthStd;
