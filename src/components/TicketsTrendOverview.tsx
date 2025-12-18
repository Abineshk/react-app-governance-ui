import { useState } from "react";
import { TrendAreaChart } from "../charts/TrendAreaChart";
import { TrendBarChart } from "../charts/TrendBarChart";
import { TrendLineChart } from "../charts/TrendLineChart";
import ChartContainer from "./reusable/ChartContainer";

const weekTicketData = [
  { date: "10/12", opened: 24, closed: 18, backlog: 6 },
  { date: "11/12", opened: 30, closed: 22, backlog: 10 },
  { date: "13/12", opened: 18, closed: 26, backlog: 15 },
  { date: "14/12", opened: 35, closed: 20, backlog: 8 },
  { date: "15/12", opened: 28, closed: 30, backlog: 12 },
  { date: "16/12", opened: 14, closed: 10, backlog: 20 },
  { date: "17/12", opened: 20, closed: 16, backlog: 10 },
];

const monthTicketData = [
  { date: "01/12", opened: 22, closed: 18, backlog: 8 },
  { date: "02/12", opened: 26, closed: 20, backlog: 10 },
  { date: "03/12", opened: 30, closed: 22, backlog: 12 },
  { date: "04/12", opened: 28, closed: 24, backlog: 14 },
  { date: "05/12", opened: 35, closed: 26, backlog: 18 },
  { date: "06/12", opened: 18, closed: 15, backlog: 20 },
  { date: "07/12", opened: 20, closed: 18, backlog: 22 },

  { date: "08/12", opened: 24, closed: 20, backlog: 24 },
  { date: "09/12", opened: 27, closed: 22, backlog: 26 },
  { date: "10/12", opened: 32, closed: 24, backlog: 28 },
  { date: "11/12", opened: 30, closed: 26, backlog: 30 },
  { date: "12/12", opened: 25, closed: 28, backlog: 27 },
  { date: "13/12", opened: 22, closed: 24, backlog: 25 },
  { date: "14/12", opened: 18, closed: 20, backlog: 23 },

  { date: "15/12", opened: 20, closed: 18, backlog: 25 },
  { date: "16/12", opened: 26, closed: 22, backlog: 27 },
  { date: "17/12", opened: 28, closed: 24, backlog: 29 },
  { date: "18/12", opened: 34, closed: 26, backlog: 32 },
  { date: "19/12", opened: 36, closed: 28, backlog: 34 },
  { date: "20/12", opened: 30, closed: 30, backlog: 34 },
  { date: "21/12", opened: 22, closed: 24, backlog: 32 },

  { date: "22/12", opened: 24, closed: 22, backlog: 34 },
  { date: "23/12", opened: 28, closed: 24, backlog: 36 },
  { date: "24/12", opened: 32, closed: 26, backlog: 38 },
  { date: "25/12", opened: 20, closed: 18, backlog: 40 },
  { date: "26/12", opened: 26, closed: 22, backlog: 42 },
  { date: "27/12", opened: 30, closed: 24, backlog: 44 },
  { date: "28/12", opened: 34, closed: 26, backlog: 46 },
  { date: "29/12", opened: 28, closed: 30, backlog: 44 },
  { date: "30/12", opened: 22, closed: 26, backlog: 40 },
];

export const TicketsTrendOverview = () => {
  const [selectedTrend, setSelectedTrend] = useState(7);
  const [chartType, setChartType] = useState<"area" | "line" | "bar">("area");

  return (
    <div className="mt-4">
      <ChartContainer
        title="Tickets Trend Overview"
        subtitle={`Showing data for last ${selectedTrend} days`}
        actions={
          <div className="flex gap-3">
            {/* Chart Type Selection */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                  chartType === "area"
                    ? "bg-white text-[#1e40af] shadow-sm"
                    : "text-gray-600 hover:text-[#1e40af]"
                }`}
                onClick={() => setChartType("area")}
                title="Area Chart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12l3-3 3 3 4-4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l3-3 3 3 4-4 6 2v2H4v-2z"
                    fill="currentColor"
                    fillOpacity="0.3"
                  />
                </svg>
              </button>
              <button
                className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                  chartType === "line"
                    ? "bg-white text-[#1e40af] shadow-sm"
                    : "text-gray-600 hover:text-[#1e40af]"
                }`}
                onClick={() => setChartType("line")}
                title="Line Chart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </button>
              <button
                className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                  chartType === "bar"
                    ? "bg-white text-[#1e40af] shadow-sm"
                    : "text-gray-600 hover:text-[#1e40af]"
                }`}
                onClick={() => setChartType("bar")}
                title="Bar Chart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </button>
            </div>


            {/* Time Range Selection */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedTrend === 7
                    ? "bg-white text-[#1e40af] shadow-sm"
                    : "text-gray-600 hover:text-[#1e40af]"
                }`}
                onClick={() => setSelectedTrend(7)}
              >
                7D
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedTrend === 30
                    ? "bg-white text-[#1e40af] shadow-sm"
                    : "text-gray-600 hover:text-[#1e40af]"
                }`}
                onClick={() => setSelectedTrend(30)}
              >
                30D
              </button>
            </div>
          </div>
        }
      >        
        {chartType === "area" && (
          <TrendAreaChart
            ticketData={selectedTrend === 30 ? monthTicketData : weekTicketData}
          />
        )}
        {chartType === "line" && (
          <TrendLineChart
            ticketData={selectedTrend === 30 ? monthTicketData : weekTicketData}
          />
        )}
        {chartType === "bar" && (
          <TrendBarChart
            ticketData={selectedTrend === 30 ? monthTicketData : weekTicketData}
          />
        )}
        
        {/* Trend Indicators */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {/* Opened Tickets Trend */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Opened</span>
                <span className={`flex items-center gap-1 font-semibold ${
                  selectedTrend === 7 ? "text-red-600" : "text-blue-600"
                }`}>
                  {selectedTrend === 7 ? "↑ 18.5%" : "↑ 22.3%"}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {selectedTrend === 7 
                  ? "Spike in new feature requests" 
                  : "Seasonal increase in support volume"}
              </p>
            </div>

            {/* Closed Tickets Trend */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Closed</span>
                <span className={`flex items-center gap-1 font-semibold ${
                  selectedTrend === 7 ? "text-green-600" : "text-green-600"
                }`}>
                  {selectedTrend === 7 ? "↑ 24.2%" : "↑ 19.8%"}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {selectedTrend === 7 
                  ? "Team efficiency improved" 
                  : "Consistent resolution rate"}
              </p>
            </div>

            {/* Backlog Trend */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Backlog</span>
                <span className={`flex items-center gap-1 font-semibold ${
                  selectedTrend === 7 ? "text-green-600" : "text-red-600"
                }`}>
                  {selectedTrend === 7 ? "↓ 12.7%" : "↑ 8.4%"}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {selectedTrend === 7 
                  ? "Backlog reduction in progress" 
                  : "Needs attention - growing backlog"}
              </p>
            </div>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
};
