export function AiInsights() {
  const insights = [
    {
      id: 1,
      type: "AI Suggestion",
      description: "12 repeated login failures detected",
      icon: "🤖",
      color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      type: "Predicted Issue",
      description: "Predicted network outage risk",
      icon: "🔮",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      type: "Smart Tip",
      description: "Prioritize security vulnerabilities",
      icon: "💡",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-medium text-gray-800">
          AI Insights & Recommendations
        </h3>
      </div>
      <div className="space-y-3 p-3 max-h-75 overflow-y-auto scroll-bar">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div
                className={`${insight.color} w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0`}
              >
                {insight.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{insight.type}</h3>
                <p className="text-gray-600 mt-1">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
