import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function Education() {
  const { cvData } = useCv();
  const education = cvData?.education || [];

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 bg-slate-900/30 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Education
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Formal engineering foundations in computer science and software systems.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-3xl space-y-4">
          {education.map((edu, idx) => (
            <div 
              key={edu.id || idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl hover:border-slate-700/80 transition-all flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-emerald-400 font-medium text-sm">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {edu.period && (
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700/60 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {edu.period}
                      </span>
                    )}
                    {edu.cgpa && (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 font-mono text-xs border border-amber-500/30 font-semibold flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                </div>

                {edu.description && (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}

                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  {['Data Structures & Algorithms', 'Distributed Systems', 'Database Management', 'Object-Oriented Programming', 'Software Engineering'].map((course) => (
                    <span key={course} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
