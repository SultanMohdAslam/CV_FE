import React, { useState } from 'react';
import { useCv } from '../../context/CvContext';
import { api } from '../../services/api';
import AdminPersonalInfo from './AdminPersonalInfo';
import AdminStats from './AdminStats';
import AdminExperience from './AdminExperience';
import AdminShowcases from './AdminShowcases';
import AdminSkills from './AdminSkills';
import AdminEducation from './AdminEducation';
import AdminMessages from './AdminMessages';
import {
  User,
  BarChart3,
  Briefcase,
  Layers,
  Cpu,
  GraduationCap,
  Mail,
  Eye,
  RotateCcw,
  Database,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

const TABS = [
  { id: 'personal', label: 'Profile & Contact', icon: User },
  { id: 'stats', label: 'Stats & Metrics', icon: BarChart3 },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'showcases', label: 'Architecture Showcases', icon: Layers },
  { id: 'skills', label: 'Skills & Proficiencies', icon: Cpu },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'messages', label: 'Inbox Inquiries', icon: Mail }
];

export default function AdminDashboard() {
  const { cvData, setIsAdminOpen, refreshCv } = useCv();
  const [activeTab, setActiveTab] = useState('personal');
  const [toast, setToast] = useState(null);
  const [isReseeding, setIsReseeding] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleReseed = async () => {
    if (!window.confirm('Reset all CV data to the default Sultan Md Aslam dataset in Neon PostgreSQL? Any custom edits will be re-initialized.')) {
      return;
    }
    try {
      setIsReseeding(true);
      await api.seedCv(true);
      await refreshCv();
      showToast('Database successfully re-seeded with defaults!', 'success');
    } catch (err) {
      showToast('Reseed failed: ' + err.message, 'error');
    } finally {
      setIsReseeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border transition-all animate-bounce ${
          toast.type === 'success'
            ? 'bg-slate-900 border-emerald-500/50 text-emerald-300'
            : 'bg-slate-900 border-rose-500/50 text-rose-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-emerald-500/20">
            CV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-100">
                Dynamic CV Admin Portal
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Database className="w-2.5 h-2.5" /> NEON POSTGRESQL LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Connected to PostgreSQL Database &bull; All changes persist immediately to database
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleReseed}
            disabled={isReseeding}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100 text-xs font-semibold transition-colors disabled:opacity-50"
            title="Reset database to default seed data"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReseeding ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isReseeding ? 'Resetting...' : 'Reset Defaults'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            <Eye className="w-4 h-4" />
            <span>View Live CV</span>
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar Tabs */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 backdrop-blur-sm sticky top-20">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Management Sections
            </div>
            <nav className="space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats overview */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 px-3 text-xs text-slate-500 space-y-1 font-mono">
              <div>Roles: {cvData?.experiences?.length || 0}</div>
              <div>Skill Domains: {cvData?.skillCategories?.length || 0}</div>
              <div>Showcases: {cvData?.systemArchitectureShowcase?.length || 0}</div>
              <div>Metrics: {cvData?.stats?.length || 0}</div>
            </div>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'personal' && <AdminPersonalInfo showToast={showToast} />}
          {activeTab === 'stats' && <AdminStats showToast={showToast} />}
          {activeTab === 'experience' && <AdminExperience showToast={showToast} />}
          {activeTab === 'showcases' && <AdminShowcases showToast={showToast} />}
          {activeTab === 'skills' && <AdminSkills showToast={showToast} />}
          {activeTab === 'education' && <AdminEducation showToast={showToast} />}
          {activeTab === 'messages' && <AdminMessages showToast={showToast} />}
        </main>
      </div>
    </div>
  );
}
