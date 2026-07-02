// src/Components/StudentManagement/AnalyticsCard.jsx
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);


const AREA_CHART_LINE_COLOR = 'rgba(54, 162, 235, 1)'; 
const AREA_CHART_FILL_COLOR = 'rgba(54, 162, 235, 0.4)'; 
const AREA_CHART_POINT_COLOR = 'rgba(54, 162, 235, 1)';

const BAR_CHART_FILL_COLOR = 'rgba(153, 102, 255, 0.7)'; 
const BAR_CHART_BORDER_COLOR = 'rgba(153, 102, 255, 1)'; 

const chartGridColor = 'rgba(230, 230, 230, 0.7)'; 
const chartTickColor = '#888'; 

const AnalyticsCard = ({ title, chartData, chartType = 'bar', chartHeight = '300px' }) => {

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: false, 
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 13, weight: 'bold', family: 'inherit' },
        bodyFont: { size: 12, family: 'inherit' },
        padding: 10,
        cornerRadius: 4,
        displayColors: true, 
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += context.parsed.y;
                }
                return label;
            }
        }
      },
      datalabels: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: chartTickColor,
          font: { size: 10, family: 'inherit' },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 15,
        },
        border: {
          display: true,
          color: chartGridColor,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: chartGridColor,
          drawBorder: false,
        },
        ticks: {
          color: chartTickColor,
          font: { size: 10, family: 'inherit' },
          padding: 8,
        },
      },
    },
    elements: {
        line: {
            tension: 0.3, 
            borderWidth: 2,
        },
        point: {
            radius: 4, 
            hoverRadius: 6,
            borderWidth: 1, 
        },
        bar: {
            borderWidth: 1,
        }
    }
  };

  const renderChart = () => {
    if (!chartData || !chartData.labels || !chartData.datasets || chartData.datasets.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-neutral-400 text-sm animate-pulse">
          Loading chart data...
        </div>
      );
    }

    const processedChartData = JSON.parse(JSON.stringify(chartData));

    processedChartData.datasets.forEach(dataset => {
      if (chartType === 'area' || chartType === 'line') {
        dataset.borderColor = dataset.borderColor || AREA_CHART_LINE_COLOR;
        dataset.backgroundColor = dataset.backgroundColor || (chartType === 'area' ? AREA_CHART_FILL_COLOR : 'transparent');
        dataset.pointBackgroundColor = dataset.pointBackgroundColor || AREA_CHART_POINT_COLOR;
        dataset.pointBorderColor = dataset.pointBorderColor || AREA_CHART_LINE_COLOR; // Or white for contrast: '#fff'
        dataset.pointHoverBackgroundColor = dataset.pointHoverBackgroundColor || AREA_CHART_POINT_COLOR;
        dataset.pointHoverBorderColor = dataset.pointHoverBorderColor || AREA_CHART_LINE_COLOR;
        dataset.fill = dataset.fill !== undefined ? dataset.fill : (chartType === 'area'); 
      } else if (chartType === 'bar') {
        if (processedChartData.datasets.length === 1 && chartData.labels.length > 1) {
            dataset.backgroundColor = dataset.backgroundColor || BAR_CHART_FILL_COLOR;
            dataset.borderColor = dataset.borderColor || BAR_CHART_BORDER_COLOR;

            } else { 
            dataset.backgroundColor = dataset.backgroundColor || BAR_CHART_FILL_COLOR; 
            dataset.borderColor = dataset.borderColor || BAR_CHART_BORDER_COLOR; 
            }
       }
    });

    if (chartType === 'area') { 
      return <Line options={baseOptions} data={processedChartData} />;
    }
    if (chartType === 'line') {
      return <Line options={baseOptions} data={processedChartData} />;
    }
    return <Bar options={baseOptions} data={processedChartData} />;
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
      <h3 className="text-md font-semibold text-neutral-700 mb-6 text-center">{title}</h3>
      <div className="flex-grow" style={{ height: chartHeight, width: '100%', position: 'relative' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default AnalyticsCard;