import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { FaGlobe } from "react-icons/fa";

// Define common chart options here or import from a utils file
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

const GuestCountryChart = ({ guestCountries }) => {
  const dataLabelStyle = "font-medium text-gray-700";
  const dataValueStyle = "text-gray-700";

  const guestCountriesChartData = {
    labels: guestCountries.map((country) => country.name),
    datasets: [
      {
        label: "Guests",
        data: guestCountries.map((country) => country.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)", "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)", "rgba(255, 159, 64, 0.8)",
          "rgba(199, 199, 199, 0.8)", "rgba(83, 102, 255, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const guestCountriesChartOptions = {
    ...commonChartOptions,
    // Specific overrides if needed
  };

  const hasData = guestCountries.length > 0;

  return (
    <ChartCard
      title="Guests by Country"
      icon={FaGlobe}
      iconClassName="text-indigo-500"
      noDataMessage="No country data available."
      hasData={hasData}
    >
       {/* Chart Container */}
       <div className="mb-4 h-80">
         <Doughnut data={guestCountriesChartData} options={guestCountriesChartOptions} />
       </div>
       {/* List Container */}
       <ul className="max-h-48 overflow-y-auto mt-4 border-t pt-2 flex-shrink-0"> {/* Prevent list from growing indefinitely */}
         {guestCountries.map((country) => (
           <li key={country.name} className="py-2 border-b border-gray-100 last:border-b-0">
             <div className="flex justify-between items-center">
               <span className={dataLabelStyle}>{country.name}</span>
               <span className={dataValueStyle}>{country.value} Guest{country.value !== 1 ? 's' : ''}</span>
             </div>
           </li>
         ))}
       </ul>
    </ChartCard>
  );
};

export default GuestCountryChart;