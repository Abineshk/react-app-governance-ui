import { useMemo, useState } from "react";
import { SeverityChart } from "../charts/SeverityChart";
import { StatusBarChart } from "../charts/StatusBarChart";
import { AiInsights } from "../components/AiInsights";
import { AlertsIssues } from "../components/AlertsIssues";
import { DashboardFilters } from "../components/DashboardFilter";
import ChartContainer from "../components/reusable/ChartContainer";
import { StatCard } from "../components/StatCard";
import { TicketsTrendOverview } from "../components/TicketsTrendOverview";
import { mockAlerts, mockInsights, mockTickets } from "../data/mockData";

export const Dashboard = () => {
  const [category, setCategory] = useState("all");
  const [owner, setOwner] = useState("all");
  const [timeline, setTimeline] = useState("7");

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    const now = new Date();
    const days = parseInt(timeline);
    const timelineLimit = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return mockTickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);
      const matchesTimeline = ticketDate >= timelineLimit;
      const matchesCategory = category === "all" || ticket.category === category;
      const matchesOwner = owner === "all" || ticket.owner === owner;
      return matchesTimeline && matchesCategory && matchesOwner;
    });
  }, [category, owner, timeline]);

  // Stats Calculation
  const stats = useMemo(() => {
    const total = filteredTickets.length;
    const open = filteredTickets.filter(t => t.status === 'Open').length;
    const closed = filteredTickets.filter(t => t.status === 'Closed').length;
    const inProgress = filteredTickets.filter(t => t.status === 'In Progress').length;
    const pending = filteredTickets.filter(t => t.status === 'Pending').length;
    const waiting = filteredTickets.filter(t => t.status === 'Waiting for Evidence').length;
    const recentIssues = filteredTickets.filter(t => t.status === 'Recent Issues').length;

    return [
      { title: "Total", count: total, gradient: "from-[#1e3a8a] to-[#1e40af]", icon: "📊", percentageChange: 12.5, isIncrease: true },
      { title: "Open", count: open, gradient: "from-[#0891b2] to-[#0e7490]", icon: "📬", percentageChange: 8.3, isIncrease: true },
      { title: "Closed", count: closed, gradient: "from-[#059669] to-[#047857]", icon: "✅", percentageChange: 15.2, isIncrease: true },
      { title: "In Progress", count: inProgress, gradient: "from-[#4f46e5] to-[#4338ca]", icon: "⚙️", percentageChange: 5.7, isIncrease: false },
      { title: "Pending", count: pending, gradient: "from-[#d97706] to-[#b45309]", icon: "⏳", percentageChange: 3.2, isIncrease: false },
      { title: "Waiting for Evidence", count: waiting, gradient: "from-[#7c3aed] to-[#6d28d9]", icon: "🔍", percentageChange: 2.1, isIncrease: true },
      {
        title: 'Recent Issues',
        count: recentIssues,
        gradient: 'from-red-500 to-red-700',
        icon: '⚡',
        percentageChange: 18.5,
        isIncrease: true
      }
    ];
  }, [filteredTickets]);

  // Severity Data for Pie Chart
  const severityData = useMemo(() => {
    const counts = {
      Critical: filteredTickets.filter(t => t.priority === 'Critical').length,
      High: filteredTickets.filter(t => t.priority === 'High').length,
      Medium: filteredTickets.filter(t => t.priority === 'Medium').length,
      Low: filteredTickets.filter(t => t.priority === 'Low').length,
    };

    return [
      { name: "Critical", value: counts.Critical, fill: "#dc2626" },
      { name: "High", value: counts.High, fill: "#ea580c" },
      { name: "Medium", value: counts.Medium, fill: "#d97706" },
      { name: "Low", value: counts.Low, fill: "#059669" },
    ];
  }, [filteredTickets]);

  // Category Data for Bar Chart (Percentages - based on ticket type)
  const categoryData = useMemo(() => {
    const types: Record<string, number> = {};
    filteredTickets.forEach(t => {
      types[t.type] = (types[t.type] || 0) + 1;
    });

    const total = filteredTickets.length || 1; // Avoid division by zero

    return [
      { name: "Bug", value: Math.round(((types['bug'] || 0) / total) * 100), fill: "#dc2626" },
      { name: "Security", value: Math.round(((types['security'] || 0) / total) * 100), fill: "#d97706" },
      { name: "Service request", value: Math.round(((types['serviceRequest'] || 0) / total) * 100), fill: "#0891b2" },
      { name: "Performance", value: Math.round(((types['performance'] || 0) / total) * 100), fill: "#4f46e5" },
    ];
  }, [filteredTickets]);

  // Filtered Alerts & Insights
  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter(a => {
      const matchesCategory = category === "all" || a.category === category;
      const matchesOwner = owner === "all" || a.owner === owner;
      return matchesCategory && matchesOwner;
    });
  }, [category, owner]);

  const filteredInsights = useMemo(() => {
    return mockInsights.filter(i => {
      const matchesCategory = category === "all" || i.category === category;
      const matchesOwner = owner === "all" || i.owner === owner;
      return matchesCategory && matchesOwner;
    });
  }, [category, owner]);

  const timelineDays = parseInt(timeline);

  return (
    <div className="py-3">
      <div className="bg-white rounded-xl p-4 shadow mb-3 flex flex-wrap justify-between">
        <div className="mb-5">
          <h1 className="mb-2 text-2xl font-medium text-gray-800">Ticket Assignment Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your support tickets</p>
        </div>
        <DashboardFilters
          category={category}
          setCategory={setCategory}
          owner={owner}
          setOwner={setOwner}
          timeline={timeline}
          setTimeline={setTimeline}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <TicketsTrendOverview timeline={timelineDays} tickets={filteredTickets} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
        <div className="bg-white rounded-xl p-4 shadow h-full">
          <AlertsIssues alerts={filteredAlerts} />
        </div>
        <div className="h-full">
          <ChartContainer
            title="Tickets By Priority"
            subtitle={`Showing data for last ${timelineDays} days`}
          >
            <SeverityChart severityData={severityData} />
            <div className="mt-auto pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {timelineDays === 7
                    ? "Critical tickets decreased by"
                    : "High priority tickets increased by"}
                </span>
                <span
                  className={`flex items-center gap-1 font-semibold ${timelineDays === 7 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {timelineDays === 7 ? "↓ 8.5%" : "↑ 12.3%"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {timelineDays === 7
                  ? "Improved response time contributing to reduction"
                  : "Increased workload from new security audit"}
              </p>
            </div>
          </ChartContainer>
        </div>
        <div className="h-full">
          <ChartContainer
            title="Tickets By Category"
            subtitle={`Showing data for last ${timelineDays} days`}
          >
            <StatusBarChart data={categoryData} />
            <div className="mt-auto pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {timelineDays === 7
                    ? "Bug reports trending down"
                    : "Service requests increased"}
                </span>
                <span
                  className={`flex items-center gap-1 font-semibold ${timelineDays === 7 ? "text-green-600" : "text-blue-600"
                    }`}
                >
                  {timelineDays === 7 ? "↓ 15.2%" : "↑ 24.7%"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {timelineDays === 7
                  ? "Recent bug fixes showing positive impact"
                  : "New feature rollout driving support requests"}
              </p>
            </div>
          </ChartContainer>
        </div>
        <div className="bg-white rounded-xl p-4 shadow h-full">
          <AiInsights insights={filteredInsights} />
        </div>
      </div>
    </div>
  );
};
