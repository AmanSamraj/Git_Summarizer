
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityData = [
  { day: "Mon", commits: 12 },
  { day: "Tue", commits: 19 },
  { day: "Wed", commits: 8 },
  { day: "Thu", commits: 24 },
  { day: "Fri", commits: 16 },
  { day: "Sat", commits: 6 },
  { day: "Sun", commits: 10 },
];

export default function ActivityChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={activityData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="commitFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#527A62" stopOpacity={0.16} />
              <stop offset="95%" stopColor="#527A62" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#EAE8E1" vertical={false} />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#92958E", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#92958E", fontSize: 11 }}
          />

          <Tooltip
            cursor={{ stroke: "#AABBAA", strokeDasharray: "4 4" }}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E4E2DA",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="commits"
            stroke="#527A62"
            strokeWidth={2}
            fill="url(#commitFill)"
            activeDot={{ r: 4, fill: "#527A62" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
