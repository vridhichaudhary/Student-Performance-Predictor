import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import { generateMockAnalysis } from './utils/mockDataGenerator';
import { parseCSV } from './utils/csvParser';
import { Sparkles, BrainCircuit, BarChart3, ShieldCheck } from 'lucide-react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const handleFileUpload = async (file) => {
    try {
      const csvData = await parseCSV(file);
      const studentName = csvData[0]?.["Student Name"] || "Student";
      const mockData = generateMockAnalysis(studentName);
      setAnalysisData(mockData);
    } catch (error) {
      console.error("Error parsing CSV:", error);
      alert("Failed to parse CSV. Please use the template provided.");
    }
  };

  const handleDemo = () => {
    setAnalysisData(generateMockAnalysis("Demo Student"));
    setIsDemo(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-brand-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
      </div>

      {!analysisData ? (
        <div className="pt-20 pb-32 px-6">
          <header className="max-w-7xl mx-auto flex justify-between items-center mb-24">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
                <BrainCircuit className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-surface-50 tracking-tight">Insight<span className="text-brand-500">Graph</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-surface-400">
              <a href="#" className="hover:text-surface-50 transition-colors">How it works</a>
              <a href="#" className="hover:text-surface-50 transition-colors">Features</a>
              <button onClick={handleDemo} className="btn-secondary py-2">Try Demo</button>
            </nav>
          </header>

          <main className="max-w-5xl mx-auto text-center space-y-12">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium">
                <Sparkles size={16} />
                <span>Now with Predictive AI Agents</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-surface-50 tracking-tighter leading-[0.9]">
                Predict Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-500 to-indigo-500">Academic Future.</span>
              </h1>
              <p className="text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed">
                Upload your marks CSV and let our specialized AI agents identify patterns, predict exam scores, and create personalized study roadmaps.
              </p>
            </div>

            <div className="pt-8 animate-fade-in [animation-delay:400ms]">
              <FileUpload onUpload={handleFileUpload} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-surface-900 rounded-2xl flex items-center justify-center mx-auto border border-surface-800">
                  <BarChart3 className="text-brand-400" size={24} />
                </div>
                <h3 className="font-bold text-surface-50">Trend Analysis</h3>
                <p className="text-sm text-surface-500 text-pretty">Visualizing GPA fluctuations and subject performance over time.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-surface-900 rounded-2xl flex items-center justify-center mx-auto border border-surface-800">
                  <BrainCircuit className="text-purple-400" size={24} />
                </div>
                <h3 className="font-bold text-surface-50">Predictive Engine</h3>
                <p className="text-sm text-surface-500">Forecasting future scores using advanced regression models.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-surface-900 rounded-2xl flex items-center justify-center mx-auto border border-surface-800">
                  <ShieldCheck className="text-emerald-400" size={24} />
                </div>
                <h3 className="font-bold text-surface-50">Secure & Private</h3>
                <p className="text-sm text-surface-500">Your academic data is processed securely and never shared.</p>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <>
          <Dashboard data={analysisData} onReset={() => setAnalysisData(null)} />
          <ChatBot />
        </>
      )}

      {/* Footer */}
      {!analysisData && (
        <footer className="py-12 border-t border-surface-900/50 text-center">
          <p className="text-surface-600 text-sm">© 2024 Student Performance Predictor. Powered by LangGraph.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
