import React from 'react';
import { Briefcase, Building2, Cpu, Zap } from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function StatsBar() {
  const { cvData } = useCv();
  const stats = cvData?.stats || [];

  const icons = [
    <Briefcase className="w-5 h-5 text-emerald-400" />,
    <Building2 className="w-5 h-5 text-blue-400" />,
    <Zap className="w-5 h-5 text-amber-400" />,
    <Cpu className="w-5 h-5 text-indigo-400" />
  ];

  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-6 border-y border-slate-800/80 bg-slate-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={stat.id || stat.label}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700/80 transition-all flex items-center gap-3.5"
            >
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50 shrink-0">
                {icons[idx % icons.length]}
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 font-medium truncate">
                  {stat.label} {stat.detail && <>&bull; <span className="text-slate-500">{stat.detail}</span></>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
