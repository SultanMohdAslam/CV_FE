import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Download, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck, 
  Zap, 
  Layers,
  Server
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function Hero({ onPrint }) {
  const { cvData } = useCv();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const personal = cvData?.personal || {};

  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Accolades */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>{personal.title || 'Software Engineer'} &bull; {personal.experienceYears || '5+ Years'}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  {personal.name || 'Sultan Md Aslam'}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                {personal.title || 'Software Engineer II'} &mdash;{' '}
                <span className="text-emerald-400 font-mono text-base sm:text-lg">
                  {personal.subtitle || 'Backend & Distributed Systems'}
                </span>
              </p>
            </div>

            {/* Professional Summary */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personal.bio}
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              {/* Email with copy */}
              {personal.email && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`mailto:${personal.email}`} className="hover:text-emerald-300 transition-colors font-mono">
                    {personal.email}
                  </a>
                  <button 
                    onClick={() => copyToClipboard(personal.email, 'email')}
                    className="ml-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}

              {/* Phone with copy */}
              {personal.phone && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:border-slate-700 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <a href={`tel:${personal.phone}`} className="hover:text-indigo-300 transition-colors font-mono">
                    {personal.phone}
                  </a>
                  <button 
                    onClick={() => copyToClipboard(personal.phone, 'phone')}
                    className="ml-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}

              {/* Location */}
              {personal.location && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{personal.location}</span>
                </div>
              )}

              {/* LinkedIn */}
              {personal.linkedin && (
                <a 
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{personal.linkedinDisplay || 'LinkedIn'}</span>
                </a>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/Sultan_Md_Aslam_cv.pdf"
                download="Sultan_Md_Aslam_cv.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download CV (PDF)</span>
              </a>
            </div>

            {/* Highlighted Technology Tickers */}
            <div className="pt-6 border-t border-slate-800/80">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-mono mb-3">
                Core Specialization & Production Tooling
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                {['Java 17+', 'Spring Boot', 'Kafka', 'RabbitMQ', 'ScyllaDB', 'PostgreSQL', 'Redis', 'Docker & K8s', 'WebSocket Gateway'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/50 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: High-tech Visual & Portrait Photo */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Outer Frame with Glowing Backdrop */}
            <div className="relative w-72 sm:w-80 md:w-96">
              
              {/* Animated Backdrop Rings */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-indigo-500/20 rounded-3xl blur-2xl transform -rotate-2 scale-105 pointer-events-none" />
              
              {/* Glass Card Container */}
              <div className="relative z-10 rounded-3xl p-3 bg-gradient-to-b from-slate-800/70 via-slate-900/80 to-[#0b0f19] border border-slate-700/70 shadow-2xl backdrop-blur-xl">
                
                {/* Photo Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    aslam.core.engine
                  </span>
                </div>

                {/* Profile Image Viewport */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800/40 via-emerald-950/20 to-slate-950 aspect-[4/5] flex items-end justify-center">
                  
                  {/* Subtle Grid in background */}
                  <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Profile Image */}
                  <img
                    src={personal.avatar || '/profile.png'}
                    alt={personal.name || 'Profile'}
                    className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] filter contrast-105"
                  />

                  {/* Overlay gradient at bottom for smooth blending */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-20 pointer-events-none" />
                </div>

                {/* Floating Badge 1: Top Right */}
                <div className="absolute -top-3 -right-3 z-30 bg-slate-900/90 border border-emerald-500/40 shadow-xl rounded-xl p-2.5 flex items-center gap-2 backdrop-blur-md">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Trip Orchestration</p>
                    <p className="text-xs font-bold text-white">Foodi Ridesharing</p>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Left */}
                <div className="absolute -bottom-4 -left-4 z-30 bg-slate-900/90 border border-indigo-500/40 shadow-xl rounded-xl p-2.5 flex items-center gap-2 backdrop-blur-md">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Architecture</p>
                    <p className="text-xs font-bold text-white">Kafka & ScyllaDB</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
