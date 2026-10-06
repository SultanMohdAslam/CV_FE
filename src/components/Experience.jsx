import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Building, 
  CheckCircle2, 
  ChevronRight, 
  Code2,
  Sparkles
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function Experience() {
  const { cvData } = useCv();
  const experiences = cvData?.experiences || [];
  const [filter, setFilter] = useState('all'); // 'all', 'current', 'past'
  const [expandedId, setExpandedId] = useState(null);

  // default expand first role if not set
  const currentExpanded = expandedId !== null ? expandedId : (experiences[0]?.id || null);

  const filtered = experiences.filter(exp => {
    if (filter === 'current') return exp.isCurrent;
    if (filter === 'past') return !exp.isCurrent;
    return true;
  });

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Professional Experience
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              5+ years of designing, building, and operating high-throughput backend services and distributed real-time systems.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Roles ({experiences.length})
            </button>
            <button
              onClick={() => setFilter('current')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'current' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Current
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'past' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Past Roles
            </button>
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/80 before:via-slate-800 before:to-transparent">
          {filtered.map((exp) => {
            const isExpanded = currentExpanded === exp.id;

            return (
              <div 
                key={exp.id}
                className="relative pl-10 md:pl-16 group transition-all"
              >
                {/* Timeline node icon */}
                <div 
                  className={`absolute left-2 md:left-6 -translate-x-1/2 top-6 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    exp.isCurrent 
                      ? 'border-emerald-400 bg-emerald-950 ring-4 ring-emerald-500/20 shadow-lg shadow-emerald-500/50' 
                      : 'border-slate-600 bg-slate-900 group-hover:border-emerald-400'
                  }`}
                >
                  {exp.isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>

                {/* Card Container */}
                <div 
                  className={`rounded-2xl transition-all border ${
                    exp.isCurrent 
                      ? 'bg-slate-900/80 border-emerald-500/40 shadow-xl shadow-emerald-950/20' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80'
                  }`}
                >
                  {/* Card Header */}
                  <div 
                    onClick={() => setExpandedId(isExpanded ? false : exp.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </span>
                        
                        <span className="text-slate-400 font-medium">@</span>

                        <span className="text-lg font-bold text-emerald-400">
                          {exp.company}
                        </span>

                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Building className="w-3.5 h-3.5 text-slate-500" />
                          {exp.department}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Expand details'}
                      </span>
                      <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 transition-transform ${isExpanded ? 'rotate-90 text-emerald-400' : ''}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Summary Line */}
                  <div className="px-5 sm:px-6 pb-4">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Expanded Content: Key Highlights & Details */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-in fade-in duration-200">
                      
                      {/* Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            Key Engineering Deliverables & Impact
                          </h4>

                          <div className="grid grid-cols-1 gap-2.5">
                            {exp.highlights.map((h, i) => (
                              <div 
                                key={h.id || i}
                                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 transition-all flex items-start gap-3"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                  <p className="text-sm font-semibold text-slate-200">
                                    {h.title}
                                  </p>
                                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    {h.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Chips */}
                      {exp.techStack && exp.techStack.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
