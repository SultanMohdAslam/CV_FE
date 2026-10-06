import React, { useState } from 'react';
import { api } from '../../services/api';
import { useCv } from '../../context/CvContext';
import { Plus, Edit2, Trash2, Save, X, Layers, PlusCircle, MinusCircle } from 'lucide-react';

export default function AdminShowcases({ showToast }) {
  const { cvData, refreshCv } = useCv();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    sortOrder: 0,
    tags: [],
    architecture: []
  });

  const [tagInput, setTagInput] = useState('');
  const [archInput, setArchInput] = useState('');

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: '',
      company: '',
      description: '',
      sortOrder: cvData?.systemArchitectureShowcase?.length || 0,
      tags: [],
      architecture: []
    });
    setTagInput('');
    setArchInput('');
  };

  const startEdit = (sc) => {
    setEditingId(sc.id);
    setIsAdding(false);
    setFormData({
      title: sc.title || '',
      company: sc.company || '',
      description: sc.description || '',
      sortOrder: sc.sortOrder || 0,
      tags: [...(sc.tags || [])],
      architecture: [...(sc.architecture || [])]
    });
    setTagInput('');
    setArchInput('');
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !formData.tags.includes(val)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleAddArch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = archInput.trim();
      if (val) {
        setFormData(prev => ({ ...prev, architecture: [...prev.architecture, val] }));
        setArchInput('');
      }
    }
  };

  const handleRemoveArch = (idx) => {
    setFormData(prev => ({ ...prev, architecture: prev.architecture.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isAdding) {
        await api.createShowcase(formData);
        showToast('Architecture showcase added!', 'success');
      } else {
        await api.updateShowcase(editingId, formData);
        showToast('Architecture showcase updated!', 'success');
      }
      cancelForm();
      await refreshCv();
    } catch (err) {
      showToast('Error saving showcase: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this showcase?')) return;
    try {
      await api.deleteShowcase(id);
      showToast('Showcase deleted', 'success');
      await refreshCv();
    } catch (err) {
      showToast('Failed to delete showcase: ' + err.message, 'error');
    }
  };

  const showcases = cvData?.systemArchitectureShowcase || [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>🏛️</span> System Architecture Showcases
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            In-depth distributed systems case studies displaying concurrency patterns, queue relays, and real-time gateways.
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Showcase</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-emerald-400 text-sm">
              {isAdding ? 'Add System Architecture Showcase' : 'Edit Showcase'}
            </h3>
            <button type="button" onClick={cancelForm} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Architecture Title *</label>
              <input
                type="text"
                placeholder="Rideshare Real-Time Trip Orchestration"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company / Context *</label>
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
            <label className="block text-xs text-slate-400 mb-1">High-Level Description *</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-emerald-500"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-xs text-slate-400">Architecture Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. WebSocket Gateway, Kafka Idempotency"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs hover:bg-slate-700"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 rounded-md text-xs font-mono"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Points */}
          <div className="space-y-2">
            <label className="block text-xs text-slate-400">Key Architectural Highlights / Bullet Points</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Event-Driven Trip State Machine with WebSocket broadcast"
                value={archInput}
                onChange={e => setArchInput(e.target.value)}
                onKeyDown={handleAddArch}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddArch}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs hover:bg-slate-700"
              >
                Add Point
              </button>
            </div>
            <div className="space-y-1.5 pt-2">
              {formData.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 p-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200">
                  <span>&bull; {item}</span>
                  <button type="button" onClick={() => handleRemoveArch(idx)} className="text-slate-500 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
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
              <span>{saving ? 'Saving...' : 'Save Showcase'}</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {showcases.map((sc) => (
          <div
            key={sc.id}
            className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-100">{sc.title}</h3>
                  <p className="text-xs text-indigo-400 font-mono mt-0.5">{sc.company}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => startEdit(sc)}
                    className="p-1 hover:text-emerald-400 text-slate-400 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(sc.id)}
                    className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-2">{sc.description}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {sc.tags?.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-slate-900 text-slate-400 rounded text-[10px] font-mono border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-slate-400">
              {sc.architecture?.length || 0} architectural features documented
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
