import React from 'react';
import { Sparkles, Target, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';

const InsightsPanel = ({ insights, recommendations, gpa }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* GPA Summary Card */}
        <div className="glass-card p-6 border-brand-500/30 bg-brand-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={80} />
          </div>
          <div className="relative z-10">
            <span className="text-sm font-medium text-brand-400 uppercase tracking-wider">Projected GPA</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-4xl font-bold text-surface-50">{gpa}</h2>
              <span className="text-green-500 text-sm font-medium">↑ 0.12</span>
            </div>
            <p className="text-surface-400 text-sm mt-2">Top 5% of class trajectory</p>
          </div>
        </div>

        {/* Quick Recommendation */}
        <div className="glass-card p-6 border-surface-700 hover:border-surface-600 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-surface-50">Next Target</h3>
          </div>
          <p className="text-sm text-surface-400">Increase Mathematics score to 92% to achieve overall Dean's List status.</p>
        </div>

        {/* Priority Area */}
        <div className="glass-card p-6 border-red-500/20 bg-red-500/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="font-semibold text-surface-50">Focus Area</h3>
          </div>
          <p className="text-sm text-surface-400">Geography fundamentals show a 15% deviation from historical performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Key Findings */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-brand-500" />
            <h3 className="text-xl font-bold text-surface-50">AI Key Findings</h3>
          </div>
          <ul className="space-y-4">
            {insights.map((insight, i) => (
              <li key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                </div>
                <p className="text-surface-300 text-sm leading-relaxed">{insight}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Study Recommendations */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold text-surface-50">Personalized Study Plan</h3>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all cursor-default">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{rec.subject}</span>
                  <ArrowRight className="w-4 h-4 text-surface-600" />
                </div>
                <p className="text-surface-200 text-sm">{rec.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
