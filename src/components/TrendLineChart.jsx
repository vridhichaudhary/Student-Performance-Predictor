import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-bold text-surface-50 mb-1">{label}</p>
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

const TrendLineChart = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717a', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            domain={[0, 100]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717a', fontSize: 12 }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
          />
          
          <Line
            type="monotone"
            name="Actual Performance"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={4}
            dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#18181b' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={2000}
            connectNulls
          />
          
          <Line
            type="monotone"
            name="Predicted Trend"
            dataKey="predicted"
            stroke="#3b82f6"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ r: 3, fill: '#3b82f6' }}
            animationDuration={2000}
            connectNulls
          />

          {data.filter(d => d.isExam).map((d, i) => (
            <ReferenceDot 
              key={i} 
              x={d.month} 
              y={d.score || d.predicted} 
              r={6} 
              fill="#ef4444" 
              stroke="none" 
              isFront={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
