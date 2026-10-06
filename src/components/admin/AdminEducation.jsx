import React, { useState } from 'react';
import { api } from '../../services/api';
import { useCv } from '../../context/CvContext';
import { Plus, Edit2, Trash2, Save, X, GraduationCap } from 'lucide-react';

export default function AdminEducation({ showToast }) {
  const { cvData, refreshCv } = useCv();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    cgpa: '',
    description: '',
    sortOrder: 0
  });

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      degree: '',
      institution: '',
      period: '',
      cgpa: '',
      description: '',
      sortOrder: cvData?.education?.length || 0
    });
  };

  const startEdit = (edu) => {
    setEditingId(edu.id);
    setIsAdding(false);
    setFormData({
      degree: edu.degree || '',
      institution: edu.institution || '',
      period: edu.period || '',
      cgpa: edu.cgpa || '',
      description: edu.description || '',
      sortOrder: edu.sortOrder || 0
    });
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isAdding) {
        await api.createEducation(formData);
        showToast('Education record added!', 'success');
      } else {
        await api.updateEducation(editingId, formData);
        showToast('Education record updated!', 'success');
      }
      cancelForm();
      await refreshCv();
    } catch (err) {
      showToast('Error saving education: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      await api.deleteEducation(id);
      showToast('Education deleted', 'success');
      await refreshCv();
    } catch (err) {
      showToast('Failed to delete education: ' + err.message, 'error');
    }
  };

  const education = cvData?.education || [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>🎓</span> Academic Background & Qualifications
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your university degrees, colleges, GPAs, and core coursework.
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Qualification</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-emerald-400 text-sm">
              {isAdding ? 'Add Academic Qualification' : 'Edit Academic Record'}
            </h3>
            <button type="button" onClick={cancelForm} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Degree / Certificate Name *</label>
              <input
                type="text"
                placeholder="B.Sc. in Computer Science and Engineering"
                value={formData.degree}
                onChange={e => setFormData({ ...formData, degree: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Institution / University *</label>
              <input
                type="text"
                placeholder="Premier University Chittagong"
                value={formData.institution}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Graduation Period *</label>
              <input
                type="text"
                placeholder="Graduated 2019"
                value={formData.period}
                onChange={e => setFormData({ ...formData, period: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">CGPA / Grade</label>
              <input
                type="text"
                placeholder="3.02 / 4.00"
                value={formData.cgpa}
                onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Sort Order</label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Description / Coursework Details</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
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
              <span>{saving ? 'Saving...' : 'Save Record'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">{edu.degree}</h3>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">{edu.institution}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
                <span>{edu.period}</span>
                {edu.cgpa && <span>&bull; CGPA: {edu.cgpa}</span>}
              </div>
              {edu.description && (
                <p className="text-xs text-slate-300 mt-2">{edu.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(edu)}
                className="p-1 hover:text-emerald-400 text-slate-400 transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
                className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
