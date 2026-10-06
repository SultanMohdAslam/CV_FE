import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Radio, 
  Terminal, 
  Search, 
  Sparkles,
  CheckCircle 
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function Skills() {
  const { cvData } = useCv();
  const skillCategories = cvData?.skillCategories || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const categoryIcons = {
    'Backend & Core': <Code2 className="w-4 h-4 text-emerald-400" />,
    'Messaging & Streaming': <Radio className="w-4 h-4 text-indigo-400" />,
    'Databases & In-Memory': <Database className="w-4 h-4 text-cyan-400" />,
    'DevOps, Cloud & Testing': <Terminal className="w-4 h-4 text-amber-400" />
  };

  const allCategories = ['All', ...skillCategories.map(c => c.category)];

  const filteredCategories = skillCategories
    .filter(cat => activeTab === 'All' || cat.category === activeTab)
    .map(cat => ({
      ...cat,
      skills: (cat.skills || []).filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(cat => cat.skills.length > 0);

  if (!skillCategories || skillCategories.length === 0) return null;

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Skills & Expertise Matrix
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Battle-tested tools, frameworks, and patterns refined through 5+ years of enterprise production software.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g., Kafka, ScyllaDB)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === cat
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-md font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div 
              key={category.id || category.category}
              className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 shadow-lg hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  {categoryIcons[category.category] || <Code2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {category.category}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {category.skills.length} competencies listed
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-3.5">
                {category.skills.map((skill) => (
                  <div key={skill.id || skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200 flex items-center gap-1.5">
                        {skill.name}
                        {skill.highlight && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                            Core
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-slate-400">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          category.category.includes('Backend')
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : category.category.includes('Messaging')
                            ? 'bg-gradient-to-r from-indigo-500 to-violet-400'
                            : category.category.includes('Databases')
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                            : 'bg-gradient-to-r from-amber-500 to-orange-400'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
