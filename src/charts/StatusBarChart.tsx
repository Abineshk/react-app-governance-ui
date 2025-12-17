import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartVisible } from "../hooks/useChartVisible";

interface StatusItem {
  name: string;
  value: number;
  fill: string;
}

interface StatusBarChartProps {
  data: StatusItem[];
}

const StatusBarChart: React.FC<StatusBarChartProps> = ({ data }) => {
  const { ref, visible } = useChartVisible(0.4);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="backdrop-blur-md bg-white/90 text-gray-800 px-3 py-2 rounded-xl shadow-lg border border-white/40">
        <div className="flex items-center">
          <p className="text-lg font-semibold">{payload[0].value + "%"}</p>
          <p className="text-sm font-medium ml-2">{label}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-60  relative" ref={ref}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 15, right: 10, left: 10, bottom: 20 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />

          <Tooltip cursor={{ fill: "#f1f5f9" }} content={<CustomTooltip />} />

          <Bar
            dataKey="value"
            barSize={30}
            radius={[0, 10, 10, 0]}
            isAnimationActive={visible} // enable animation
            animationDuration={5000}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={item.fill} />
            ))}
            {/* <LabelList position="center" fill="#fff" fontSize={12} /> */}
            {/* Name inside bar (left) */}
            <LabelList
              dataKey="name"
              content={(props) => {
                const { x = 0, y = 0, height = 0, value } = props as any;
                return (
                  <text
                    x={x + 12}
                    y={y + height / 2}
                    fill="#ffffff"
                    fontSize={15}
                    fontWeight={500}
                    dominantBaseline="middle"
                  >
                    {value}
                  </text>
                );
              }}
            />

            {/* Value + % at end of bar */}
            <LabelList
              dataKey="value"
              content={(props) => {
                const {
                  x = 0,
                  y = 0,
                  width = 0,
                  height = 0,
                  value,
                } = props as any;
                return (
                  <text
                    x={x + width - 12}
                    y={y + height / 2}
                    fill="#ffffff"
                    fontSize={15}
                    fontWeight={600}
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {value}%
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { StatusBarChart };
