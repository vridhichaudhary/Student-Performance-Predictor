import React from 'react';
import RadarChart from './RadarChart';
import TrendLineChart from './TrendLineChart';
import WeakAreaChart from './WeakAreaChart';
import InsightsPanel from './InsightsPanel';
import { Download, Share2, RefreshCw, GraduationCap } from 'lucide-react';

const Dashboard = ({ data, onReset }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-brand-400 font-semibold tracking-wider uppercase text-sm">
            <GraduationCap className="w-5 h-5" />
            Performance Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-surface-50 tracking-tight">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">{data.studentName}</span>
          </h1>
          <p className="text-surface-400 text-lg">Here's your comprehensive academic performance analysis.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Generating PDF Report...")}
            className="btn-secondary flex items-center gap-2"
          >
            <Download size={18} />
            Export Report
          </button>
          <button 
            onClick={onReset}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Analyze New File
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Section: Insights Panel */}
        <InsightsPanel 
          insights={data.insights} 
          recommendations={data.recommendations} 
          gpa={data.gpa}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trend Line */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-surface-50">Performance Trend</h3>
                <p className="text-sm text-surface-500">Actual vs Predicted scores (next 3 months)</p>
              </div>
            </div>
            <TrendLineChart data={data.trendData} />
          </div>

          {/* Radar Chart */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-surface-50">Subject Proficiency</h3>
                <p className="text-sm text-surface-500">Current vs Previous Semester Comparison</p>
              </div>
            </div>
            <RadarChart data={data.radarData} />
          </div>

          {/* Weak Area Bar Chart */}
          <div className="glass-card lg:col-span-2 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-surface-50">Improvement Index</h3>
                <p className="text-sm text-surface-500">Subjects ranked by gap from class average</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-surface-400">Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-surface-400">Stable</span>
                </div>
              </div>
            </div>
            <div className="h-[400px]">
              <WeakAreaChart data={data.weakAreaData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
