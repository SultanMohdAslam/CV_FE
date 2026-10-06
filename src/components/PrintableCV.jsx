import React from 'react';
import { useCv } from '../context/CvContext';

export default function PrintableCV() {
  const { cvData } = useCv();
  const personal = cvData?.personal || {};
  const experiences = cvData?.experiences || [];
  const education = cvData?.education || [];
  const skillCategories = cvData?.skillCategories || [];

  return (
    <div className="print-only max-w-4xl mx-auto p-8 bg-white text-slate-900 font-sans leading-relaxed text-sm">
      {/* Resume Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold text-slate-950 uppercase tracking-tight">
          {personal.name || 'Sultan Md Aslam'}
        </h1>
        <p className="text-base font-semibold text-emerald-800 tracking-wide mt-0.5">
          {personal.title} &bull; {personal.subtitle} ({personal.experienceYears})
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 mt-2 font-mono">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>&bull;</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>&bull;</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedinDisplay && <span>&bull;</span>}
          {personal.linkedinDisplay && <span>{personal.linkedinDisplay}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.bio && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2 font-mono">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-normal">
            {personal.bio}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="mb-6 space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-3 font-mono">
            Professional Experience
          </h2>

          {experiences.map((exp) => (
            <div key={exp.id} className="print-break-inside-avoid space-y-1.5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-slate-950">
                  {exp.role} &mdash; <span className="font-semibold text-emerald-900">{exp.company}</span>
                  {exp.department && <span className="text-xs font-normal text-slate-600"> ({exp.department})</span>}
                </h3>
                <span className="text-xs font-mono font-medium text-slate-700 whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
                  {exp.highlights.map((h, i) => (
                    <li key={h.id || i}>
                      <strong>{h.title}:</strong> {h.desc}
                    </li>
                  ))}
                </ul>
              )}

              {exp.techStack && exp.techStack.length > 0 && (
                <p className="text-[11px] font-mono text-slate-600 pt-0.5">
                  <strong>Tech Stack:</strong> {exp.techStack.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6 print-break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2 font-mono">
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="flex justify-between items-baseline text-xs mb-1.5">
              <div>
                <p className="font-bold text-slate-950">{edu.degree}</p>
                <p className="text-slate-700">{edu.institution} {edu.cgpa && <>&bull; CGPA: {edu.cgpa}</>}</p>
              </div>
              <span className="font-mono text-slate-700">{edu.period}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills Summary */}
      {skillCategories.length > 0 && (
        <div className="print-break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2 font-mono">
            Technical Skills
          </h2>
          <div className="space-y-1 text-xs text-slate-800">
            {skillCategories.map((cat) => (
              <p key={cat.id || cat.category}>
                <strong>{cat.category}:</strong> {(cat.skills || []).map(s => s.name).join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
