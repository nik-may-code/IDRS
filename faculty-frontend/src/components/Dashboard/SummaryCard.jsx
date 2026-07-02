import React from "react";

export default function SummaryCard({ title, value }) {
  return (
    <div className="w-[340px] h-[160px] border border-gray-300 rounded-xl p-6 flex flex-col justify-between">
      <h3 className="text-lg text-gray-800">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
