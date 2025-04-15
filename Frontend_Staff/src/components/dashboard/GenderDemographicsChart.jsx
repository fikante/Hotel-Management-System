import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { FaVenusMars } from "react-icons/fa";

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

const GenderDemographicsChart = ({ genderDemographics }) => {
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";

  const genderDemographicsChartData = {
    labels: Object.keys(genderDemographics || {}),
    datasets: [
      {
        label: "Count",
        data: Object.values(genderDemographics || {}),
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)", // Blue for Male (assuming order)
          "rgba(255, 99, 132, 0.8)", // Pink/Red for Female
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const genderDemographicsChartOptions = {
    ...commonChartOptions,
    cutout: '60%',
    // Specific overrides if needed
  };

  const hasData = genderDemographics && (genderDemographics.Male > 0 || genderDemographics.Female > 0);

  return (
    <ChartCard
      title="Gender Demographics"
      icon={FaVenusMars}
      iconClassName="text-pink-500"
      noDataMessage="No gender data available."
      hasData={hasData}
    >
      {/* Chart Container */}
      <div className="mb-4 h-80">
         <Doughnut data={genderDemographicsChartData} options={genderDemographicsChartOptions} />
      </div>
      {/* List Container */}
      <ul className="mt-4 border-t pt-2 flex-shrink-0"> {/* Prevent list from growing */}
         {Object.entries(genderDemographics).map(([gender, count]) => (
           <li key={gender} className="py-2 border-b border-gray-100 last:border-b-0">
             <div className="flex justify-between items-center">
               <span className={dataLabelStyle}>{gender}</span>
               <span className={dataValueStyle}>{count}</span>
             </div>
           </li>
         ))}
      </ul>
    </ChartCard>
  );
};

export default GenderDemographicsChart;