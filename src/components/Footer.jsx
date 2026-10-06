import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function Footer() {
  const { cvData } = useCv();
  const personal = cvData?.personal || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950/80 no-print text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30">
              <img 
                src={personal.avatar || '/profile.png'} 
                alt={personal.name || 'Profile'}
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div>
              <p className="font-bold text-white tracking-tight">
                {personal.name || 'Sultan Md Aslam'}
              </p>
              <p className="text-[11px] font-mono text-slate-500">
                {personal.title || 'Software Engineer II'} &bull; {personal.subtitle || 'Distributed Systems'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">Architecture</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-emerald-400 transition-colors">Education</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3 text-[11px]">
          <p>&copy; {new Date().getFullYear()} {personal.name || 'Sultan Md Aslam'}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Powered by Spring Boot 4 + Neon PostgreSQL &bull; React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
