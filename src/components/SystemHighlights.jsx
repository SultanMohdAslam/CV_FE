import React from 'react';
import { 
  Cpu, 
  Workflow, 
  Radio, 
  Layers,
  ShieldAlert
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function SystemHighlights() {
  const { cvData } = useCv();
  const showcases = cvData?.systemArchitectureShowcase || [];

  if (!showcases || showcases.length === 0) return null;

  return (
    <section id="architecture" className="py-20 bg-slate-900/40 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Engineering Depth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Flagship Systems Architecture
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Deep dive into complex distributed problem-solving, high-concurrency event pipelines, and resilient state machines.
          </p>
        </div>

        {/* Dynamic System Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {showcases.map((sc, index) => {
            const isEmerald = index % 2 === 0;
            const accentColor = isEmerald ? 'emerald' : 'indigo';

            return (
              <div 
                key={sc.id || sc.title}
                className="rounded-2xl bg-gradient-to-b from-slate-800/70 to-slate-900/90 border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group"
              >
                <div 
                  className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-2xl pointer-events-none transition-colors ${
                    isEmerald 
                      ? 'bg-emerald-500/5 group-hover:bg-emerald-500/10' 
                      : 'bg-indigo-500/5 group-hover:bg-indigo-500/10'
                  }`} 
                />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span 
                      className={`px-3 py-1 rounded-md text-xs font-mono font-semibold border ${
                        isEmerald 
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' 
                          : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30'
                      }`}
                    >
                      {sc.company}
                    </span>
                    <span 
                      className={`flex items-center gap-1.5 text-xs font-mono ${
                        isEmerald ? 'text-emerald-400' : 'text-indigo-400'
                      }`}
                    >
                      {isEmerald ? (
                        <>
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          Real-Time Engine
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5" />
                          System Reliability
                        </>
                      )}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {sc.title}
                    </h3>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                      {sc.description}
                    </p>
                  </div>

                  {/* Architecture Blueprint Pills */}
                  {sc.architecture && sc.architecture.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Workflow className={`w-3.5 h-3.5 ${isEmerald ? 'text-emerald-400' : 'text-indigo-400'}`} />
                        Key Architectural Patterns & Mechanisms
                      </p>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {sc.architecture.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span 
                              className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                isEmerald ? 'bg-emerald-400' : 'bg-indigo-400'
                              }`} 
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {sc.tags && sc.tags.length > 0 && (
                  <div className="pt-6 border-t border-slate-800/80 mt-6 flex flex-wrap items-center gap-2">
                    {sc.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 rounded bg-slate-800/90 text-slate-300 text-xs font-mono border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
