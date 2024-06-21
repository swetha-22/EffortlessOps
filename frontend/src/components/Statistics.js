import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Chart from "react-apexcharts";

function Statistics() {
    const [xItems, setXItems] = useState([1, 2]);
    const [yItems, setYItems] = useState([3, 4]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://effortlessops-backend.onrender.com/api/signup/getImage", {
                method: "GET",
                headers: {
                    "emp_id": "emp-details",
                },
            });

            const result = await response.json();

            const dates = [];
            const times = [];
            let netTime = 0;

            for (let i = 0; i < result.length; i++) {
                dates.push(result[i].date.split("T")[0]);
                times.push(result[i].time);
            }

            const finalDates = [];
            const finalTimes = [];

            for (let i = 0; i < dates.length - 1; i++) {
                if (dates[i] === dates[i + 1]) {
                    const t1 = times[i].split(":");
                    const t2 = times[i + 1].split(":");
                    netTime += Math.abs(t2[0] * 3600 + t2[1] * 60 + t2[2] * 1 - (t1[0] * 3600 + t1[1] * 60 + t1[2] * 1));
                } else {
                    finalDates.push(dates[i]);
                    finalTimes.push(netTime / 60);
                    netTime = 0;
                }
            }

            finalDates.push(dates[dates.length - 1]);
            finalTimes.push(netTime / 60);

            setXItems(finalDates);
            setYItems(finalTimes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: xItems,
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
    };

    const series = [
        {
            name: "series-1",
            data: yItems,
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
    ];

    const mainStyle = {
        width: "100%",
        position: "relative",
        border: "1px solid",
        left: "10px",
        height:"1135px",
        padding:"30px",
        background: "linear-gradient(0deg, rgba(186,246,250,1) 30%, rgba(189,254,184,1) 83%)",
    };

    let chart1={
        position:"relative",
        backgroundColor:"white"
        
    }
    let chart2={
        position:"relative",
        left:"50px",
        backgroundColor:"white"
        
    }
    let chart3={
        position:"relative",
        backgroundColor:"white",
        top:"50px"
        
    }
    let chart4={
        position:"relative",
        left:"50px",
        backgroundColor:"white",
        top:"50px"
    }
    let chart5={
        position:"relative",
        backgroundColor:"white",
        top:"100px"
        
    }
    let chart6={
        position:"relative",
        left:"50px",
        backgroundColor:"white",
        top:"100px"
    }

    return (
        <div>
            <Navbar />
            <div className="d-flex">
                <Sidebar />
                <div style={mainStyle}>
                    <div className="d-flex">
                        <Chart options={options} series={series} type="bar" style={chart1} width="500" />
                        <Chart options={options} series={series} type="line" style={chart2} width="500" />
                    </div>
                    <div className="d-flex">
                        <Chart options={options} series={series} type="area" style={chart3} width="500" />
                        <Chart options={options} series={series} type="radar" style={chart4} width="500" />
                    </div>
                    <div className="d-flex">
                        <Chart options={options} series={series} type="heatmap" style={chart5} width="500" />
                        <Chart options={options} series={series} type="scatter" style={chart6} width="500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
