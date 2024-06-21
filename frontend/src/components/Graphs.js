
import React, { useState } from 'react';
import { Chart } from 'chart.js/auto';

const Graphs = () => {
const [barChart, setBarChart] = useState(null);
const [lineChart, setLineChart] = useState(null);

  
const handleClick = async () => 
{

  const response = await fetch(`https://effortlessops-backend.onrender.com/api/signup/getImage`, {
    method: 'GET',
    headers: {
      // "Content-Type": "application/json",
      "emp_id": 'emp-details',
    },
  });
  let result = await response.json();

  let dates = []
  let times = []

  let finalDates = [];
  let finalTimes = [];


  for (let i = 0; i < result.length; i++) {
    dates.push((result[i].date).split("T")[0]);
  }

  for (let i = 0; i < result.length; i++) {
    times.push((result[i].time));
  }

  let netTime = 0;
  for (let i = 0; i < dates.length - 1; i++) {
    if (dates[i] === dates[i + 1]) 
    {
      let t1=times[i].split(":");
      let t2=times[i+1].split(":");
      netTime = netTime + Math.abs((t2[0]*3600 + t2[1]*60 + t2[2]*1) - (t1[0]*3600 + t1[1]*60 + t1[2]*1))
    }
    else {
      finalDates.push(dates[i]);
      finalTimes.push(netTime/60);
      netTime = 0;
    }
  }
  finalDates.push(dates[dates.length - 1]);
  finalTimes.push(netTime/60);

  console.log(finalDates);
  console.log(finalTimes);


  const data = {
    labels: finalDates,
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Bar Chart',
        data: finalTimes,
        // data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Line Chart',
        data: [5, 10, 12, 8, 6, 7, 9],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        type: 'line',
      },
    ],
  };


  if (barChart && lineChart) {
    barChart.destroy();
    lineChart.destroy();
  }

  const barCanvas = document.getElementById('barChart');
  const lineCanvas = document.getElementById('lineChart');

  const newBarChart = new Chart(barCanvas, {
    type: 'bar',
    data,
  });

  const newLineChart = new Chart(lineCanvas, {
    type: 'line',
    data,
  });

  setBarChart(newBarChart);
  setLineChart(newLineChart);
};

  return (
    <div>
      <button onClick={handleClick}>Generate Graphs</button>
      <canvas id="barChart"></canvas>
      <canvas id="lineChart"></canvas>
    </div>
  );
};

export default Graphs;
