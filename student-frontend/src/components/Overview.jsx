import React from 'react';

function Overview({kpis}) {
  
  return (
    <>
        {/* KPI Cards without CircularProgressbar */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-6" role="region" aria-label="Key Performance Indicators">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className={`bg-white p-6 rounded-2xl shadow text-center`}
              aria-label={kpi.label}
            >
              <p className={`text-sm font-medium mb-2 ${kpi.textColor}`}>{kpi.label}</p>
              <p className={`text-3xl font-bold ${kpi.textColor}`}>{kpi.value}</p>
            </div>
          ))}
        </section>
    </>
  );
}
export default Overview;