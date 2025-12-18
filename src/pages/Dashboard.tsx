import React from "react";
import { SeverityChart } from "../charts/SeverityChart";
import { StatusBarChart } from "../charts/StatusBarChart";
import { AiInsights } from "../components/AiInsights";
import { AlertsIssues } from "../components/AlertsIssues";
import { Issues } from "../components/Issues";
import ChartContainer from "../components/reusable/ChartContainer";
import { StatCard } from "../components/StatCard";
import { TicketsTrendOverview } from "../components/TicketsTrendOverview";

const stats = [
  {
    title: "Total",
    count: 248,
    gradient: "from-[#1e3a8a] to-[#1e40af]", // Navy blue - trustworthy
    icon: "📊",
    percentageChange: 12.5,
    isIncrease: true,
  },
  {
    title: "Open",
    count: 42,
    gradient: "from-[#0891b2] to-[#0e7490]", // Teal - professional
    icon: "📬",
    percentageChange: 8.3,
    isIncrease: true,
  },
  {
    title: "Closed",
    count: 156,
    gradient: "from-[#059669] to-[#047857]", // Emerald green - success
    icon: "✅",
    percentageChange: 15.2,
    isIncrease: true,
  },
  {
    title: "In Progress",
    count: 28,
    gradient: "from-[#4f46e5] to-[#4338ca]", // Indigo - in progress
    icon: "⚙️",
    percentageChange: 5.7,
    isIncrease: false,
  },
  {
    title: "Pending",
    count: 15,
    gradient: "from-[#d97706] to-[#b45309]", // Amber - attention
    icon: "⏳",
    percentageChange: 3.2,
    isIncrease: false,
  },
  {
    title: "Waiting for Evidence",
    count: 7,
    gradient: "from-[#7c3aed] to-[#6d28d9]", // Purple - waiting
    icon: "🔍",
    percentageChange: 2.1,
    isIncrease: true,
  },
];

// Ticket Type Data - 7 Days
const ticketTypeData7Days = [
  { name: "Bug", value: 30, fill: "#dc2626" },
  { name: "Security", value: 20, fill: "#d97706" },
  { name: "Service request", value: 28, fill: "#0891b2" },
  { name: "Performance", value: 22, fill: "#4f46e5" },
];

// Ticket Type Data - 30 Days
const ticketTypeData30Days = [
  { name: "Bug", value: 35, fill: "#dc2626" },
  { name: "Security", value: 25, fill: "#d97706" },
  { name: "Service request", value: 25, fill: "#0891b2" },
  { name: "Performance", value: 30, fill: "#4f46e5" },
];

// Severity Data - 7 Days
const severityData7Days = [
  { name: "Critical", value: 10, fill: "#dc2626" },
  { name: "High", value: 22, fill: "#ea580c" },
  { name: "Medium", value: 38, fill: "#d97706" },
  { name: "Low", value: 30, fill: "#059669" },
];

// Severity Data - 30 Days
const severityData30Days = [
  { name: "Critical", value: 15, fill: "#dc2626" },
  { name: "High", value: 27, fill: "#ea580c" },
  { name: "Medium", value: 35, fill: "#d97706" },
  { name: "Low", value: 23, fill: "#059669" },
];

export const Dashboard = () => {
  const [priorityTimeRange, setPriorityTimeRange] = React.useState(7);
  const [categoryTimeRange, setCategoryTimeRange] = React.useState(7);

  return (
    <div className="py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-2">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <TicketsTrendOverview />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="h-full">
          <ChartContainer
            title="Tickets By Priority"
            subtitle={`Showing data for last ${priorityTimeRange} days`}
            actions={
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    priorityTimeRange === 7
                      ? "bg-white text-[#1e40af] shadow-sm"
                      : "text-gray-600 hover:text-[#1e40af]"
                  }`}
                  onClick={() => setPriorityTimeRange(7)}
                >
                  7D
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    priorityTimeRange === 30
                      ? "bg-white text-[#1e40af] shadow-sm"
                      : "text-gray-600 hover:text-[#1e40af]"
                  }`}
                  onClick={() => setPriorityTimeRange(30)}
                >
                  30D
                </button>
              </div>
            }
          >
            <SeverityChart 
              severityData={priorityTimeRange === 7 ? severityData7Days : severityData30Days} 
            />
            <div className="mt-auto pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {priorityTimeRange === 7
                    ? "Critical tickets decreased by"
                    : "High priority tickets increased by"}
                </span>
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    priorityTimeRange === 7 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {priorityTimeRange === 7 ? "↓ 8.5%" : "↑ 12.3%"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {priorityTimeRange === 7
                  ? "Improved response time contributing to reduction"
                  : "Increased workload from new security audit"}
              </p>
            </div>
          </ChartContainer>
        </div>
        <div className="h-full">
          <ChartContainer
            title="Tickets By Category"
            subtitle={`Showing data for last ${categoryTimeRange} days`}
            actions={
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    categoryTimeRange === 7
                      ? "bg-white text-[#1e40af] shadow-sm"
                      : "text-gray-600 hover:text-[#1e40af]"
                  }`}
                  onClick={() => setCategoryTimeRange(7)}
                >
                  7D
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    categoryTimeRange === 30
                      ? "bg-white text-[#1e40af] shadow-sm"
                      : "text-gray-600 hover:text-[#1e40af]"
                  }`}
                  onClick={() => setCategoryTimeRange(30)}
                >
                  30D
                </button>
              </div>
            }
          >
            <StatusBarChart 
              data={categoryTimeRange === 7 ? ticketTypeData7Days : ticketTypeData30Days} 
            />
            <div className="mt-auto pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {categoryTimeRange === 7
                    ? "Bug reports trending down"
                    : "Service requests increased"}
                </span>
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    categoryTimeRange === 7 ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {categoryTimeRange === 7 ? "↓ 15.2%" : "↑ 24.7%"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {categoryTimeRange === 7
                  ? "Recent bug fixes showing positive impact"
                  : "New feature rollout driving support requests"}
              </p>
            </div>
          </ChartContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow h-full">
          <AlertsIssues />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
