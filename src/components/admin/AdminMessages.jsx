import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Mail, Check, Trash2, RefreshCw, Clock } from 'lucide-react';

export default function AdminMessages({ showToast }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await api.getContactMessages();
      setMessages(data || []);
    } catch (err) {
      showToast('Failed to fetch inquiries: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.markContactAsRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
      showToast('Marked as read', 'success');
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await api.deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      showToast('Message deleted', 'success');
    } catch (err) {
      showToast('Error: ' + err.message, 'error');
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>📬</span> Inquiries & Contact Messages
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time messages submitted by recruiters, founders, and visitors through your portfolio contact form.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading messages from Neon DB...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Mail className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No inquiries in your inbox yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-xl border transition-colors ${
                msg.isRead
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-emerald-950/20 border-emerald-500/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">{msg.name}</span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-emerald-400 hover:underline font-mono"
                    >
                      &lt;{msg.email}&gt;
                    </a>
                  </div>
                  {msg.subject && (
                    <div className="text-xs font-semibold text-slate-300 mt-0.5">
                      Subject: {msg.subject}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="p-1 hover:text-emerald-400 text-slate-400 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1 hover:text-rose-400 text-slate-400 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                {msg.message}
              </div>

              <div className="mt-3 pt-2 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Your inquiry')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
