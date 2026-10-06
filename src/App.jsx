import React from 'react';
import { CvProvider, useCv } from './context/CvContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Experience from './components/Experience';
import SystemHighlights from './components/SystemHighlights';
import Skills from './components/Skills';
import Education from './components/Education';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PrintableCV from './components/PrintableCV';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAuthModal from './components/admin/AdminAuthModal';
import { RefreshCw, AlertTriangle } from 'lucide-react';

function MainAppContent() {
  const { cvData, loading, error, refreshCv, isAdminOpen } = useCv();

  const handlePrint = () => {
    window.print();
  };

  // If Admin panel is open, render AdminDashboard
  if (isAdminOpen) {
    return <AdminDashboard />;
  }

  // Loading state
  if (loading && !cvData) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-slate-100 gap-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        </div>
        <p className="text-sm font-mono text-emerald-400">Loading dynamic CV from Neon PostgreSQL...</p>
      </div>
    );
  }

  // Error state
  if (error && !cvData) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-slate-100 p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4">
          <AlertTriangle className="w-10 h-10 mx-auto mb-2" />
          <h2 className="text-lg font-bold">Failed to load dynamic CV data</h2>
          <p className="text-xs text-rose-300 mt-1 max-w-md">{error}</p>
        </div>
        <button
          onClick={refreshCv}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Interactive Web Portfolio View (hidden on print) */}
      <div className="no-print flex-1 flex flex-col">
        <Navbar onPrint={handlePrint} />
        
        <main className="flex-1">
          <Hero onPrint={handlePrint} />
          <StatsBar />
          <Experience />
          <SystemHighlights />
          <Skills />
          <Education />
          <ContactSection onPrint={handlePrint} />
        </main>

        <Footer />
      </div>

      {/* Clean Printable Resume (only visible during print / PDF export) */}
      <PrintableCV />

      {/* Admin Passcode Gatekeeper Modal */}
      <AdminAuthModal />
    </div>
  );
}

export default function App() {
  return (
    <CvProvider>
      <MainAppContent />
    </CvProvider>
  );
}
