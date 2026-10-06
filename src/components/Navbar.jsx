import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useCv } from '../context/CvContext';

export default function Navbar({ onPrint }) {
  const { cvData, requestOpenAdmin } = useCv();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const personal = cvData?.personal || {};

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        scrolled 
          ? 'bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 bg-slate-900 group-hover:border-emerald-400 transition-colors">
              <img 
                src={personal.avatar || '/profile.png'} 
                alt={personal.name || 'Profile'}
                className="w-full h-full object-cover object-top" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {personal.name || 'Sultan Md Aslam'}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 opacity-80" />
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {personal.title || 'Software Engineer II'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={requestOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-lg transition-all shadow-sm"
              title="Open Admin Control Center"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print / PDF</span>
            </button>

            <a
              href="/Sultan_Md_Aslam_cv.pdf"
              download="Sultan_Md_Aslam_cv.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={requestOpenAdmin}
              className="p-2 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onPrint}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-lg"
              aria-label="Print CV"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#0e1424] border-b border-slate-800 shadow-xl space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white bg-slate-900/50 rounded-lg text-center"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                requestOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Control Center</span>
            </button>

            <a
              href="/Sultan_Md_Aslam_cv.pdf"
              download="Sultan_Md_Aslam_cv.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-300 bg-slate-900/50 border border-slate-800 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Download PDF CV</span>
            </a>

            {personal.linkedin && (
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-300 bg-slate-800/80 rounded-lg"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
