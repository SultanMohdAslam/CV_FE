import React, { useState } from 'react';
import { api } from '../../services/api';
import { useCv } from '../../context/CvContext';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AdminStats({ showToast }) {
  const { cvData, refreshCv } = useCv();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ label: '', value: '', detail: '', sortOrder: 0 });
  const [saving, setSaving] = useState(false);

  const startEdit = (stat) => {
    setEditingId(stat.id);
    setIsAdding(false);
    setFormData({
      label: stat.label || '',
      value: stat.value || '',
      detail: stat.detail || '',
      sortOrder: stat.sortOrder || 0
    });
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      label: '',
      value: '',
      detail: '',
      sortOrder: cvData?.stats?.length || 0
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
        await api.createStat(formData);
        showToast('New stat added successfully!', 'success');
      } else {
        await api.updateStat(editingId, formData);
        showToast('Stat updated successfully!', 'success');
      }
      cancelForm();
      await refreshCv();
    } catch (err) {
      showToast('Error saving stat: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this stat metric?')) return;
    try {
      await api.deleteStat(id);
      showToast('Stat deleted', 'success');
      await refreshCv();
    } catch (err) {
      showToast('Failed to delete stat: ' + err.message, 'error');
    }
  };

  const stats = cvData?.stats || [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>📊</span> Quick Stats & Key Metrics
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Highlighted counters displayed in the stats bar under the hero section.
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Metric</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal/Panel */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 p-5 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-emerald-400 text-sm">
              {isAdding ? 'Add New Metric Card' : 'Edit Metric Card'}
            </h3>
            <button type="button" onClick={cancelForm} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Metric Label *</label>
              <input
                type="text"
                placeholder="e.g. Experience"
                value={formData.label}
                onChange={e => setFormData({ ...formData, label: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Value *</label>
              <input
                type="text"
                placeholder="e.g. 5+ Years"
                value={formData.value}
                onChange={e => setFormData({ ...formData, value: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Subtext / Detail</label>
              <input
                type="text"
                placeholder="e.g. High-scale engineering"
                value={formData.detail}
                onChange={e => setFormData({ ...formData, detail: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Order</label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={cancelForm}
              className="px-4 py-1.5 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-sm hover:bg-emerald-400"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.id} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-start justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-mono font-medium">{s.label}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(s)}
                    className="p-1 hover:text-emerald-400 text-slate-400 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-100 mt-2 font-mono">{s.value}</div>
              <p className="text-xs text-slate-400 mt-1">{s.detail}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-600 font-mono">
              Order: {s.sortOrder}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
