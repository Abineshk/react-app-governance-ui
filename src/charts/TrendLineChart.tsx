import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const TrendLineChart = ({ ticketData }: any) => {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer>
        <LineChart
          data={ticketData}
          margin={{ top: 16, right: 16, bottom: 8, left: 16 }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            strokeDasharray="3 3" // optional dashed lines
          />
          <XAxis
            dataKey="date"
            padding={{ left: 20, right: 10 }}
            tick={{ fill: "#6b7280", fontSize: 14 }}
            axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
          />

          <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />

          <Line
            type="linear"
            dataKey="opened"
            stroke="#3b82f6" // blue
            strokeWidth={2}
            activeDot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={5000} // 1 second
            // animationBegin={0}
          />
          <Line
            type="linear"
            dataKey="closed"
            stroke="#22c55e" // green
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={5000} // 1 second
            animationBegin={500}
          />
          <Line
            type="linear"
            dataKey="backlog"
            stroke="#f97316" // orange
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={5000} // 1 second
            animationBegin={1000}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff", // white background
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // proper shadow
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#6b7280", fontWeight: 500 }} // label color
            itemStyle={{ color: "#111827" }} // value color
          />

          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
