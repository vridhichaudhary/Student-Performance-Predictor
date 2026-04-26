import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-bold text-surface-50 mb-2">{payload[0].payload.subject}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-surface-400">{entry.name}:</span>
            <span className="text-surface-50 font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const RadarChart = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#3f3f46" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#a1a1aa', fontSize: 12 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#71717a', fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Current Semester"
            dataKey="current"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
            animationBegin={0}
            animationDuration={1500}
          />
          <Radar
            name="Previous Semester"
            dataKey="previous"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.4}
            animationBegin={200}
            animationDuration={1500}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
