import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { FaBed } from "react-icons/fa";

// Reuse or import commonChartOptions
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 14 }, color: "#555" },
      },
      title: { display: false }, // Title is handled by ChartCard
      tooltip: {
        callbacks: {
          label: function (context) {
            let datasetLabel = context.dataset.label || "";
            let dataLabel = context.label || "";
            let value = context.parsed || 0;
            let finalLabel = datasetLabel ? `${datasetLabel}: ` : "";
            finalLabel += `${dataLabel}: ${value}`;
            return finalLabel;
          },
        },
      },
    },
  };

const RoomTypeChart = ({ roomTypeData }) => {
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";

  const roomTypesChartData = {
    labels: roomTypeData.map((room) => room.type),
    datasets: [
      {
        label: "Rooms",
        data: roomTypeData.map((room) => room.count),
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)", "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)",
          "rgba(100, 220, 150, 0.8)", "rgba(200, 200, 200, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const roomTypesChartOptions = {
    ...commonChartOptions,
    cutout: '60%',
    // Specific overrides if needed
  };

  const hasData = roomTypeData.length > 0;

  return (
    <ChartCard
      title="Room Types"
      icon={FaBed}
      iconClassName="text-green-500"
      noDataMessage="No room type data available."
      hasData={hasData}
    >
      {/* Chart Container */}
      <div className="mb-4 h-80">
         <Doughnut data={roomTypesChartData} options={roomTypesChartOptions} />
      </div>
      {/* List Container */}
      <ul className="max-h-48 overflow-y-auto mt-4 border-t pt-2 flex-shrink-0"> {/* Prevent list from growing */}
         {roomTypeData.map((room) => (
           <li key={room.type} className="py-2 border-b border-gray-100 last:border-b-0">
             <div className="flex justify-between items-center">
               <span className={dataLabelStyle}>{room.type}</span>
               <span className={dataValueStyle}>{room.count} Room{room.count !== 1 ? 's' : ''}</span>
             </div>
           </li>
         ))}
      </ul>
    </ChartCard>
  );
};

export default RoomTypeChart;