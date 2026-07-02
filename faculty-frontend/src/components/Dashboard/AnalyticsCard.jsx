
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";


const getBarColor = (name) => {
  switch (name) {
    case "Approved":
      return "#228B22"; 
    case "Pending":
      return "#4169E1"; 
    case "Rejected":
      return "#B22222"; 
    default:
      return "#3B82F6"; 
  }
}


export default function AnalyticsCard({
  title,
  value,
  subtitle,
  chartData,
  chartType,
}) {
  return (
    <div
      className="bg-gray border border-gray-200 rounded-xl p-6 flex flex-col justify-between"
      style={{ width: "525px", height: "475px" }}
    >
      <div>
        <h3 className="text-lg text-gray-800">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="mt-6 flex-grow">
        <ResponsiveContainer width="100%" height={250}>
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#4B5563" }}
                interval={0}
                padding={{ left: 10, right: 10 }}
              />
              {/* <Tooltip
                contentStyle={{ backgroundColor: "white", border: "none" }}
                cursor={{ stroke: "#e5e7eb", strokeWidth: 2 }}
              /> */}
              <Tooltip
  contentStyle={{ backgroundColor: "white", border: "none", color: "#000000" }}
  labelStyle={{ color: "#000000" }}
  itemStyle={{ color: "#000000" }}
  cursor={{ stroke: "#e5e7eb", strokeWidth: 2 }}
/>

              <Line
                type="monotone"
                dataKey="value"
                stroke="#4169E1"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#4B5563" }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "white", border: "none" }}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                barSize={70}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
