import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="font-bold text-surface-50 mb-1">{data.subject}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-surface-400">Score:</span>
            <span className="text-surface-50 font-bold">{data.score}%</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-surface-400">Class Avg:</span>
            <span className="text-surface-400">{data.classAvg}%</span>
          </div>
          <div className="mt-2 pt-2 border-t border-surface-800 text-[10px] text-surface-500 italic">
            Improvement needed: {data.improvementNeeded}%
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const WeakAreaChart = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'needs-attention': return '#f59e0b';
      case 'doing-well': return '#10b981';
      default: return '#8b5cf6';
    }
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#27272a" />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="subject" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#a1a1aa', fontSize: 11 }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar 
            dataKey="score" 
            radius={[0, 4, 4, 0]} 
            barSize={20}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeakAreaChart;
