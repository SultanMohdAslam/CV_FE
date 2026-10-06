import React, { useState } from 'react';
import { api } from '../../services/api';
import { useCv } from '../../context/CvContext';
import { Plus, Edit2, Trash2, Save, X, Cpu, PlusCircle, MinusCircle, Star } from 'lucide-react';

const COLOR_OPTIONS = ['emerald', 'indigo', 'cyan', 'amber', 'purple', 'rose'];

export default function AdminSkills({ showToast }) {
  const { cvData, refreshCv } = useCv();
  const [editingCatId, setEditingCatId] = useState(null);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [saving, setSaving] = useState(false);

  const [catFormData, setCatFormData] = useState({
    category: '',
    color: 'emerald',
    sortOrder: 0,
    skills: []
  });

  const startAddCat = () => {
    setIsAddingCat(true);
    setEditingCatId(null);
    setCatFormData({
      category: '',
      color: 'emerald',
      sortOrder: cvData?.skillCategories?.length || 0,
      skills: [{ name: '', level: 90, highlight: false, sortOrder: 0 }]
    });
  };

  const startEditCat = (cat) => {
    setEditingCatId(cat.id);
    setIsAddingCat(false);
    setCatFormData({
      category: cat.category || '',
      color: cat.color || 'emerald',
      sortOrder: cat.sortOrder || 0,
      skills: cat.skills?.map((s, idx) => ({
        id: s.id,
        name: s.name || '',
        level: s.level ?? 90,
        highlight: !!s.highlight,
        sortOrder: s.sortOrder ?? idx
      })) || []
    });
  };

  const cancelCatForm = () => {
    setEditingCatId(null);
    setIsAddingCat(false);
  };

  const handleAddSkillItem = () => {
    setCatFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 90, highlight: false, sortOrder: prev.skills.length }]
    }));
  };

  const handleRemoveSkillItem = (idx) => {
    setCatFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx)
    }));
  };

  const handleSkillItemChange = (idx, field, val) => {
    setCatFormData(prev => {
      const updated = [...prev.skills];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, skills: updated };
    });
  };

  const handleSubmitCat = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isAddingCat) {
        await api.createSkillCategory(catFormData);
        showToast('Skill category created successfully!', 'success');
      } else {
        await api.updateSkillCategory(editingCatId, catFormData);
        showToast('Skill category updated successfully!', 'success');
      }
      cancelCatForm();
      await refreshCv();
    } catch (err) {
      showToast('Error saving skills: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this entire skill category and all its skills?')) return;
    try {
      await api.deleteSkillCategory(id);
      showToast('Category deleted', 'success');
      await refreshCv();
    } catch (err) {
      showToast('Failed to delete category: ' + err.message, 'error');
    }
  };

  const categories = cvData?.skillCategories || [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>⚡</span> Technical Skills & Domains
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Organize skills by domain, set proficiency levels (0-100%), and mark core highlight skills.
          </p>
        </div>
        {!isAddingCat && !editingCatId && (
          <button
            type="button"
            onClick={startAddCat}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Add / Edit Category Form */}
      {(isAddingCat || editingCatId) && (
        <form onSubmit={handleSubmitCat} className="mb-8 p-6 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-semibold text-emerald-400 text-sm">
              {isAddingCat ? 'Add New Skill Category' : `Edit Category: ${catFormData.category}`}
            </h3>
            <button type="button" onClick={cancelCatForm} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Category Name *</label>
              <input
                type="text"
                placeholder="Backend & Core"
                value={catFormData.category}
                onChange={e => setCatFormData({ ...catFormData, category: e.target.value })}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Accent Theme Color</label>
              <select
                value={catFormData.color}
                onChange={e => setCatFormData({ ...catFormData, color: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              >
                {COLOR_OPTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Sort Order</label>
              <input
                type="number"
                value={catFormData.sortOrder}
                onChange={e => setCatFormData({ ...catFormData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Individual Skills List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Skills in this Category
              </label>
              <button
                type="button"
                onClick={handleAddSkillItem}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="space-y-2">
              {catFormData.skills.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-lg flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    placeholder="Skill name (e.g. Java, Kafka)"
                    value={s.name}
                    onChange={e => handleSkillItemChange(idx, 'name', e.target.value)}
                    required
                    className="flex-1 min-w-[140px] bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  />
                  <div className="flex items-center gap-2 w-44">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={s.level}
                      onChange={e => handleSkillItemChange(idx, 'level', parseInt(e.target.value) || 0)}
                      className="w-28 accent-emerald-500"
                    />
                    <span className="text-xs font-mono text-emerald-400 w-8">{s.level}%</span>
                  </div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={s.highlight}
                      onChange={e => handleSkillItemChange(idx, 'highlight', e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 w-3.5 h-3.5 bg-slate-950"
                    />
                    <span className="flex items-center gap-1">
                      <Star className={`w-3 h-3 ${s.highlight ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
                      Core
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkillItem(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={cancelCatForm}
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
              <span>{saving ? 'Saving...' : 'Save Category'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-900">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full bg-${cat.color}-400`} />
                <h3 className="font-bold text-slate-100 text-sm">{cat.category}</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => startEditCat(cat)}
                  className="p-1 hover:text-emerald-400 text-slate-400 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {cat.skills?.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs">
                  <span className={`font-medium flex items-center gap-1.5 ${s.highlight ? 'text-emerald-300' : 'text-slate-300'}`}>
                    {s.highlight && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                    {s.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="font-mono text-slate-500 text-[10px] w-7 text-right">{s.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
