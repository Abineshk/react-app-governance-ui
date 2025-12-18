export function AlertsIssues() {
  const alerts = [
    {
      id: 1,
      title: "Critical Incident",
      description: "Database outage - investigate now",
      severity: "critical",
      icon: "🔴",
    },
    {
      id: 2,
      title: "3 Overdue Tickets",
      description: "Immediate action needed",
      severity: "high",
      icon: "🚨",
    },
    {
      id: 3,
      title: "Security Alert",
      description: "Unusual login activity detected",
      severity: "high",
      icon: "🔒",
    },
    {
      id: 4,
      title: "SLA Breach",
      description: "5 tickets exceeded response time",
      severity: "medium",
      icon: "⚠️",
    },
    {
      id: 5,
      title: "Performance Degradation",
      description: "API response time increased by 40%",
      severity: "medium",
      icon: "📉",
    },
    {
      id: 6,
      title: "Compliance Review",
      description: "2 tickets pending compliance approval",
      severity: "medium",
      icon: "📋",
    },
    {
      id: 7,
      title: "System Maintenance",
      description: "Scheduled maintenance in 2 hours",
      severity: "low",
      icon: "🔧",
    },
    {
      id: 8,
      title: "Backup Completed",
      description: "Daily backup successful",
      severity: "low",
      icon: "✅",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-red-600 bg-red-50";
      case "high":
        return "border-l-orange-600 bg-orange-50";
      case "medium":
        return "border-l-yellow-600 bg-yellow-50";
      default:
        return "border-l-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-medium text-gray-800">Alerts & Issues</h3>
      </div>
      <div className="space-y-3 p-3 flex-1 max-h-85 overflow-y-auto scroll-bar">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 ${getSeverityColor(
              alert.severity
            )} p-2 rounded-r-lg hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">{alert.icon}</span>
              <div className="flex-1">
                <h3 className="text-gray-900">{alert.title}</h3>
                <p className="text-gray-600 mt-1">{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
