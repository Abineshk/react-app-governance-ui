import { useState } from "react";
import { SeverityChart } from "../charts/SeverityChart";
import { StatusBarChart } from "../charts/StatusBarChart";
import { TrendLineChart } from "../charts/TrendLineChart";
import { AiInsights } from "../components/AiInsights";
import { AlertsIssues } from "../components/AlertsIssues";
import { Issues } from "../components/Issues";
import ChartContainer from "../components/reusable/ChartContainer";
import { StatCard } from "../components/StatCard";

const stats = [
  {
    title: "Total",
    count: 248,
    gradient: "from-blue-400 to-blue-600",
    icon: "📊",
    percentageChange: 12.5,
    isIncrease: true,
  },
  {
    title: "Open",
    count: 42,
    gradient: "from-cyan-400 to-cyan-600",
    icon: "📬",
    percentageChange: 8.3,
    isIncrease: true,
  },
  {
    title: "Closed",
    count: 156,
    gradient: "from-green-400 to-green-600",
    icon: "✅",
    percentageChange: 15.2,
    isIncrease: true,
  },
  {
    title: "In Progress",
    count: 28,
    gradient: "from-orange-400 to-orange-600",
    icon: "⚙️",
    percentageChange: 5.7,
    isIncrease: false,
  },
  {
    title: "Pending",
    count: 15,
    gradient: "from-yellow-400 to-yellow-600",
    icon: "⏳",
    percentageChange: 3.2,
    isIncrease: false,
  },
  {
    title: "Waiting for Evidence",
    count: 7,
    gradient: "from-purple-400 to-purple-600",
    icon: "🔍",
    percentageChange: 2.1,
    isIncrease: true,
  },
];

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

const weeklyData = [
  { name: "Opened", value: 169 },
  { name: "Closed", value: 142 },
  { name: "Backlog", value: 133 },
];

const ticketTypeData = [
  {
    name: "Bug",
    value: 35,
    fill: "#fd5c63", // light red
  },
  {
    name: "Security",
    value: 25,
    fill: "#fbbf24", // pending / amber
  },
  {
    name: "Service request",
    value: 25,
    fill: "#338fd9", // light blue
  },
  {
    name: "Performance",
    value: 15,
    fill: "#bf8bff", // violet
  },
];

const severityData = [
  { name: "Critical", value: 12, fill: "#ef4444" }, // red
  { name: "High", value: 24, fill: "#f97316" }, // orange
  { name: "Medium", value: 36, fill: "#facc15" }, // yellow
  { name: "Low", value: 18, fill: "#22c55e" }, // green
];

export const Dashboard = () => {
  const [selectedTrend, setSelectedTrend] = useState(7);
  return (
    <div className="py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-2">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="mt-4">
        <ChartContainer
          title="Tickets Trend Overview"
          actions={
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-md text-sm font-mediu transition cursor-pointer ${
                  selectedTrend === 7
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedTrend(7)}
              >
                Last 7 Days
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-mediu transition cursor-pointer ${
                  selectedTrend === 30
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedTrend(30)}
              >
                Last 30 Days
              </button>
            </div>
          }
        >
          <TrendLineChart
            ticketData={selectedTrend === 30 ? monthTicketData : weekTicketData}
          />
        </ChartContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 h-80">
        <div className="bg-white rounded-xl p-4 shadow">
          <AlertsIssues />
        </div>
        <div>
          <ChartContainer title="Tickets By Priority">
            <SeverityChart severityData={severityData} />
          </ChartContainer>
        </div>
        <div>
          <ChartContainer title="Tickets By Category">
            <StatusBarChart data={ticketTypeData} />
          </ChartContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-4 h-95">
        <div className="bg-white rounded-xl p-4 shadow">
          <AiInsights />
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <Issues />
        </div>
      </div>
    </div>
  );
};
