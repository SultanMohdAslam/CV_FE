import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  FileText,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useCv } from '../context/CvContext';
import { api } from '../services/api';

export default function ContactSection({ onPrint }) {
  const { cvData } = useCv();
  const personal = cvData?.personal || {};

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Save directly to Neon PostgreSQL database
      await api.submitContact({
        name: formState.name,
        email: formState.email,
        subject: formState.subject || `Inquiry from ${formState.name}`,
        message: formState.message
      });

      // Also open user's mail client as fallback
      const subject = encodeURIComponent(formState.subject || `Inquiry from ${formState.name || 'Recruiter'}`);
      const body = encodeURIComponent(
        `Hello ${personal.name || 'Sultan Md Aslam'},\n\n${formState.message}\n\nBest regards,\n${formState.name} (${formState.email})`
      );
      if (personal.email) {
        window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      }

      setSuccessMessage(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccessMessage(false), 6000);
    } catch (err) {
      console.error('Contact submission error:', err);
      // If server error, still launch mailto
      if (personal.email) {
        window.location.href = `mailto:${personal.email}?subject=Inquiry&body=${encodeURIComponent(formState.message)}`;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Looking for a Senior / Lead Backend Engineer with proven distributed systems experience? Let's discuss high-scale engineering opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Details & Badges */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Contact Info Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Direct Communication Channels
              </h3>

              {/* Email */}
              {personal.email && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-mono text-slate-400">Email Address</p>
                      <a href={`mailto:${personal.email}`} className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors font-mono truncate block">
                        {personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personal.email, 'email')}
                    className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 shrink-0"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Phone */}
              {personal.phone && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-mono text-slate-400">Phone / WhatsApp</p>
                      <a href={`tel:${personal.phone}`} className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-indigo-400 transition-colors font-mono truncate block">
                        {personal.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personal.phone, 'phone')}
                    className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 shrink-0"
                    title="Copy phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Location */}
              {personal.location && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono text-slate-400">Current Residence</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-200">
                      {personal.location}
                    </p>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              {personal.linkedin && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-mono text-slate-400">Professional Network</p>
                      <a 
                        href={personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors font-mono truncate block"
                      >
                        {personal.linkedinDisplay || 'LinkedIn Profile'}
                      </a>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Actions Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                  Official PDF Resume
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Grab the verified document copy.
                </p>
              </div>
              <a
                href="/Sultan_Md_Aslam_cv.pdf"
                download="Sultan_Md_Aslam_cv.pdf"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>

          </div>

          {/* Quick Message / Email Composer Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Send Direct Inquiry
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Delivers to Neon DB & Email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Tech Recruiter"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email / Company *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Subject (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Backend Engineer role interview invitation"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Message / Opportunity Details *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="We came across your distributed systems experience at Foodi and would love to discuss a Senior Backend position..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  {successMessage && (
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Inquiry delivered to Neon DB & Email!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
