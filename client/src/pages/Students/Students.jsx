import React, { useState } from 'react';
import { stdmenu } from './StudentMenu';
import StudentTable from './StudentTable';
import CreateStds from './CreateStds';

const Students = () => {
    const totalStudents = stdmenu.find((item) => item.id === 1)?.value || 0;
    const eligibleCount = stdmenu.find((item) => item.clickvalue === 'eligible')?.value || 0;
    const notEligibleCount = stdmenu.find((item) => item.clickvalue === 'noteligible')?.value || 0;

    const getPercentage = (count) => {
        if (!totalStudents) return '0%';
        return `${((count / totalStudents) * 100).toFixed(1)}%`;
    };

    const [valueclick, setvalueclick] = useState('allstd')

    const headleClick = (value) => {
        setvalueclick(value)
    }

    return (
        <div className="">
            <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {stdmenu.map((data) => {
                    const Icon = data.icon;
                    let extraInfo = null;

                    if (data.clickvalue === 'eligible') {
                        extraInfo = (
                            <p className="text-sm mt-1 text-white/90">
                                {getPercentage(data.value)} eligible
                            </p>
                        );
                    }

                    if (data.clickvalue === 'noteligible') {
                        extraInfo = (
                            <p className="text-sm mt-1 text-white/90">
                                {getPercentage(data.value)} not eligible
                            </p>
                        );
                    }

                    return (
                        <div
                            key={data.id}
                            className={`rounded-2xl p-5 text-white shadow-lg transform transition-all hover:scale-105 hover:shadow-xl ${data.color}`}
                            onClick={() => headleClick(data.clickvalue)}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Icon className="w-10 h-10 opacity-90" />
                                <span className="text-3xl font-bold">{data.value}</span>
                            </div>
                            <h2 className="text-lg font-semibold tracking-wide">{data.name}</h2>
                            {extraInfo}
                        </div>
                    );
                })}
            </div>

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
                                    eligible
                                </div>
                            )
                        }
                        if (valueclick === "noteligible") {
                            return (
                                <div className="mt-4">
                                    noteligible
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
                    })()
                }
            </div>

        </div>
    );
};

export default Students;
