import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function LineGraph() {
  // Sample data
  const feedIntakeData = {
    labels: ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7"], // Dates
    feedIntake: [0, 50, 28, 35, 25, 37,20, 60], // Feed intake quantity
    standardFeed: [30, 30, 30, 30, 30, 30,30], // Standard feed intake
    deadPigs: [1, 0, 2, 1, 0], // Number of dead pigs
  };

  // Calculate the total loss (number of dead pigs)
  const totalLoss = feedIntakeData.deadPigs.reduce(
    (total, current) => total + current,
    0
  );

  // Get today's date in the format "Month Day"
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Get the index of today's date in the labels array
  const todayIndex = feedIntakeData.labels.indexOf(today);

  // Define a custom plugin to add a dark blue vertical line
  const customPlugin = {
    id: "customVerticalLine",
    afterDraw: (chart, args, options) => {
      const { ctx, scales, chartArea } = chart;
      const xScale = scales.x;
      const { left, right } = chartArea;

      const todayPixel = xScale.getPixelForValue(todayIndex);

      console.log("Today Pixel:", todayPixel); // Add this line to log the pixel position

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(todayPixel, chartArea.top);
      ctx.strokeStyle = "darkblue";
      ctx.lineWidth = 2;
      ctx.lineTo(todayPixel, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    },
  };

  // Add the custom plugin to the plugins list
  const plugins = [customPlugin];

  // Create the chart data
  const chartData = {
    labels: feedIntakeData.labels,
    datasets: [
      {
        label: "Feed Intake",
        data: feedIntakeData.feedIntake,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
      {
        label: "Standard Feed Intake",
        data: feedIntakeData.standardFeed,
        borderColor: "green",
        borderDash: [5, 5], // Dashed line for standard
      },
      {
        label: "Dead Pigs",
        data: feedIntakeData.deadPigs,
        backgroundColor: "red",
        pointStyle: "rectRot", // Use pig icon as a point
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date/Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Feed Intake (K.G.)",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      customPlugin: {
        // Use the custom plugin defined above
      },
    },
  };

  return (
    <div>
      <h2>Pig Feed Intake Graph</h2>
      {/* Add date range selection here */}
      {/* Display total loss */}
      <p>Total Loss: {totalLoss} pigs</p>
      <div>
        <Line data={chartData} options={chartOptions} plugins={plugins} />
      </div>
    </div>
  );
}

export default LineGraph;
