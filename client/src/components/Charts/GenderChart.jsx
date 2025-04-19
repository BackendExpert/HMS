import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import axios from 'axios'


ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = () => {
    const token = localStorage.getItem('login');
    const [getallstudent, setgetallstudent] = useState([]);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/student/allstudents`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setgetallstudent(res.data.Result);
            })
            .catch(err => console.log(err));
    }, []);

    const malestds = getallstudent.filter(std => std.gender === "Male").length;
    const femalestds = getallstudent.filter(std => std.gender === "Female").length;


    const data = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Students",
                data: [malestds, femalestds],
                backgroundColor: ["#36A2EB", "#FF6384"],
                borderColor: ["#fff", "#fff", "#fff"],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.raw;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
            <Pie data={data} options={options} />
        </div>
    );
};

export default GenderChart;
