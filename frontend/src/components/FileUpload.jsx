import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download, Loader2 } from 'lucide-react';
import { generateTemplateCSV } from '../utils/csvParser';

const FileUpload = ({ onUpload }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setIsAnalyzing(true);
      // Simulate AI analysis delay
      setTimeout(() => {
        onUpload(acceptedFiles[0]);
        setIsAnalyzing(false);
      }, 2500);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
    disabled: isAnalyzing
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div 
        {...getRootProps()} 
        className={`relative group cursor-pointer transition-all duration-500 overflow-hidden
          ${isDragActive ? 'border-brand-500 bg-brand-500/10' : 'border-surface-700 bg-surface-900/50'}
          ${isAnalyzing ? 'pointer-events-none opacity-80' : 'hover:border-brand-500/50 hover:bg-surface-800/50'}
          border-2 border-dashed rounded-3xl p-12 text-center`}
      >
        <input {...getInputProps()} />
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 flex flex-col items-center">
          {isAnalyzing ? (
            <div className="space-y-4 animate-pulse">
              <Loader2 className="w-16 h-16 text-brand-500 animate-spin" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-surface-50">AI Engine Analyzing Data...</h3>
                <p className="text-surface-400">Extracting patterns and training predictive models</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 p-5 bg-brand-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Upload className="w-10 h-10 text-brand-500" />
              </div>
              <h3 className="text-2xl font-bold text-surface-50 mb-2">
                {isDragActive ? 'Drop your CSV here' : 'Upload Academic Records'}
              </h3>
              <p className="text-surface-400 mb-8 max-w-sm">
                Drag and drop your marks CSV file, or click to browse. Let AI discover your performance insights.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Browse Files
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    generateTemplateCSV();
                  }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 glass-card bg-surface-900/30">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-surface-400">AI Model v4.2 Ready</span>
        </div>
        <div className="text-sm text-surface-500">
          Supports: CSV, XLSX (Soon)
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
