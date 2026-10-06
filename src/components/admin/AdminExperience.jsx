import React, { useState } from 'react';
import { api } from '../../services/api';
import { useCv } from '../../context/CvContext';
import { Plus, Edit2, Trash2, Save, X, Briefcase, PlusCircle, MinusCircle } from 'lucide-react';

export default function AdminExperience({ showToast }) {
  const { cvData, refreshCv } = useCv();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    expSlug: '',
    role: '',
    company: '',
    period: '',
    isCurrent: false,
    department: '',
    summary: '',
    sortOrder: 0,
    highlights: [],
    techStack: []
  });

  const [techInput, setTechInput] = useState('');

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      expSlug: '',
      role: '',
      company: '',
      period: '',
      isCurrent: false,
      department: '',
      summary: '',
      sortOrder: cvData?.experiences?.length || 0,
      highlights: [{ title: '', desc: '', sortOrder: 0 }],
      techStack: []
    });
    setTechInput('');
  };

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setIsAdding(false);
    setFormData({
      expSlug: exp.expSlug || '',
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      isCurrent: !!exp.isCurrent,
      department: exp.department || '',
      summary: exp.summary || '',
      sortOrder: exp.sortOrder || 0,
      highlights: exp.highlights?.map((h, i) => ({
        title: h.title || '',
        desc: h.desc || '',
        sortOrder: h.sortOrder ?? i
      })) || [],
      techStack: [...(exp.techStack || [])]
    });
    setTechInput('');
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleAddHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, { title: '', desc: '', sortOrder: prev.highlights.length }]
    }));
  };

  const handleRemoveHighlight = (idx) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx)
    }));
  };

  const handleHighlightChange = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.highlights];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, highlights: updated };
    });
  };

  const handleAddTech = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const trimmed = techInput.trim();
      if (trimmed && !formData.techStack.includes(trimmed)) {
        setFormData(prev => ({ ...prev, techStack: [...prev.techStack, trimmed] }));
        setTechInput('');
      }
    }
  };

  const handleRemoveTech = (tag) => {
    setFormData(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isAdding) {
        await api.createExperience(formData);
        showToast('Work experience created successfully!', 'success');
      } else {
        await api.updateExperience(editingId, formData);
        showToast('Work experience updated successfully!', 'success');
      }
      cancelForm();
      await refreshCv();
    } catch (err) {
      showToast('Error saving experience: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this work experience?')) return;
    try {
      await api.deleteExperience(id);
      showToast('Experience deleted', 'success');
      await refreshCv();
    } catch (err) {
      showToast('Failed to delete experience: ' + err.message, 'error');
    }
  };

  const experiences = cvData?.experiences || [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>💼</span> Work Experience & Roles
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your past and present engineering roles, architectural achievements, and tech stacks.
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-emerald-400 text-sm">
              {isAdding ? 'Add New Career Role' : `Edit Role: ${formData.role} @ ${formData.company}`}
            </h3>
            <button type="button" onClick={cancelForm} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Role / Job Title *</label>
              <input
                type="text"
                placeholder="Software Engineer II"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company Name *</label>
              <input
                type="text"
                placeholder="Foodi"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Employment Period *</label>
              <input
                type="text"
                placeholder="May 2025 – Present"
                value={formData.period}
                onChange={e => setFormData({ ...formData, period: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Department / Project Focus</label>
              <input
                type="text"
                placeholder="Ridesharing Core Engine"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Order Index</label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={e => setFormData({ ...formData, isCurrent: e.target.checked })}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4 bg-slate-900"
                />
                <span className="text-sm text-slate-200">Currently Employed Here</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Executive Summary *</label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-emerald-500"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Key Deliverables & Architectural Highlights
              </label>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Highlight</span>
              </button>
            </div>
            {formData.highlights.map((h, idx) => (
              <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Highlight Title (e.g. Trip Orchestration State Machine)"
                    value={h.title}
                    onChange={e => handleHighlightChange(idx, 'title', e.target.value)}
                    required
                    className="flex-1 bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Remove"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="Detailed description of what you designed, tuned, or delivered..."
                  value={h.desc}
                  onChange={e => handleHighlightChange(idx, 'desc', e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-slate-200 outline-none focus:border-emerald-500"
                />
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <label className="block text-xs text-slate-400">Tech Stack Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type technology (e.g. Spring Boot, Kafka) and press Enter"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs hover:bg-slate-700"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {formData.techStack.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-md text-xs font-mono"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTech(tag)} className="hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={cancelForm}
              className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-sm hover:bg-emerald-400"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Role'}</span>
            </button>
          </div>
        </form>
      )}

      {/* List of Experiences */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-slate-100">{exp.role}</h3>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-emerald-400 font-semibold">{exp.company}</span>
                  {exp.isCurrent && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono rounded-full font-bold">
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{exp.period} | {exp.department}</p>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2">{exp.summary}</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => startEdit(exp)}
                  className="p-1.5 hover:text-emerald-400 text-slate-400 rounded hover:bg-slate-800 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-1.5 hover:text-rose-400 text-slate-400 rounded hover:bg-slate-800 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Highlights Count & Tech summary */}
            <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <span>{exp.highlights?.length || 0} Key Highlights</span>
              <div className="flex flex-wrap gap-1">
                {exp.techStack?.slice(0, 5).map(t => (
                  <span key={t} className="px-2 py-0.5 bg-slate-900 text-slate-400 rounded text-[10px] font-mono">
                    {t}
                  </span>
                ))}
                {exp.techStack?.length > 5 && (
                  <span className="text-[10px] text-slate-500 font-mono self-center">
                    +{exp.techStack.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
