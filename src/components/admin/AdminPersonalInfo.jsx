import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useCv } from '../../context/CvContext';
import { Save, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminPersonalInfo({ showToast }) {
  const { cvData, refreshCv } = useCv();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    experienceYears: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    linkedinDisplay: '',
    github: '',
    avatar: '',
    bio: '',
    availability: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cvData?.personal) {
      setFormData({
        name: cvData.personal.name || '',
        title: cvData.personal.title || '',
        subtitle: cvData.personal.subtitle || '',
        experienceYears: cvData.personal.experienceYears || '',
        email: cvData.personal.email || '',
        phone: cvData.personal.phone || '',
        location: cvData.personal.location || '',
        linkedin: cvData.personal.linkedin || '',
        linkedinDisplay: cvData.personal.linkedinDisplay || '',
        github: cvData.personal.github || '',
        avatar: cvData.personal.avatar || '',
        bio: cvData.personal.bio || '',
        availability: cvData.personal.availability || ''
      });
    }
  }, [cvData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.updatePersonalInfo(formData);
      await refreshCv();
      showToast('Personal profile updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update profile: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>👤</span> Personal Information & Profile
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Update your public persona, titles, contact details, bio, and career status.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Primary Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Software Engineer II"
              required
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Specialization Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Backend & Distributed Systems Specialist"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Experience Years Tag
            </label>
            <input
              type="text"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="5+ Years"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Location / City
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              LinkedIn Display Text
            </label>
            <input
              type="text"
              name="linkedinDisplay"
              value={formData.linkedinDisplay}
              onChange={handleChange}
              placeholder="linkedin.com/in/sultan-md-aslam..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              GitHub Profile URL (Optional)
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Avatar Image URL / Path
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="/profile.png"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Availability Badge Status
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Available for Senior / Lead Backend Engineering roles"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Professional Bio & Summary *
          </label>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl p-4 text-slate-100 placeholder-slate-600 outline-none transition-all leading-relaxed"
          />
        </div>
      </form>
    </div>
  );
}
