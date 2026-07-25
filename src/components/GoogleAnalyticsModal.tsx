import React, { useState, useEffect } from 'react';
import { AnalyticsEvent, ThemeMode } from '../types';
import {
  getAnalyticsLogs,
  clearAnalyticsLogs,
  getStoredGaId,
  setStoredGaId,
  logEvent,
} from '../utils/analytics';
import {
  BarChart2,
  Activity,
  CheckCircle2,
  Globe,
  RefreshCw,
  Trash2,
  X,
  TrendingUp,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface GoogleAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const GoogleAnalyticsModal: React.FC<GoogleAnalyticsModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const [gaId, setGaId] = useState(getStoredGaId());
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setEvents(getAnalyticsLogs());

    const handleNewEvent = () => {
      setEvents(getAnalyticsLogs());
    };

    window.addEventListener('ga-event-logged', handleNewEvent);
    return () => window.removeEventListener('ga-event-logged', handleNewEvent);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveGaId = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredGaId(gaId);
    setIsSaved(true);
    logEvent('update_ga_id', 'configuration', { newId: gaId });
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSimulateEvent = (eventName: string, category: string) => {
    logEvent(eventName, category, { simulated: true, timestamp: Date.now() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`w-full max-w-3xl rounded-2xl border p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto ${
          theme === 'dark'
            ? 'bg-[#0B1017] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-[#00E5FF]/20 text-[#00E5FF]">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading">Google Analytics (GA4) Manager</h3>
            <p className="text-xs text-slate-400">
              Pelacakan Data Pengunjung & Analisis Event Interaksi Real-Time
            </p>
          </div>
        </div>

        {/* GA Measurement ID Settings Form */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Konfigurasi Tag Measurement ID GA4</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
              gtag.js Loaded
            </span>
          </div>

          <form onSubmit={handleSaveGaId} className="flex gap-2">
            <input
              type="text"
              value={gaId}
              onChange={(e) => setGaId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono outline-none focus:border-[#00E5FF]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#00E5FF] text-slate-950 font-bold text-xs hover:bg-[#00cbe4] transition-colors"
            >
              Simpan Tag
            </button>
          </form>
          {isSaved && (
            <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Measurement ID berhasil diatur & script gtag.js diperbarui!</span>
            </p>
          )}
        </div>

        {/* Quick Analytics Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Total Event</p>
            <p className="text-xl font-extrabold text-[#00E5FF] font-heading mt-0.5">
              {events.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Page Views</p>
            <p className="text-xl font-extrabold text-cyan-300 font-heading mt-0.5">
              {events.filter((e) => e.eventName === 'page_view').length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Nav Click</p>
            <p className="text-xl font-extrabold text-emerald-400 font-heading mt-0.5">
              {events.filter((e) => e.eventName === 'nav_click').length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Status Script</p>
            <p className="text-xs font-bold text-emerald-400 mt-2">Active GA4</p>
          </div>
        </div>

        {/* Test Event Simulator */}
        <div className="mt-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Uji Coba Event Pelacakan Google Analytics</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSimulateEvent('page_view', 'engagement')}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300"
            >
              + Simulate Page View
            </button>
            <button
              onClick={() => handleSimulateEvent('download_cv', 'engagement')}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300"
            >
              + Simulate CV Download
            </button>
            <button
              onClick={() => handleSimulateEvent('click_cta', 'lead_generation')}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300"
            >
              + Simulate Contact CTA
            </button>
          </div>
        </div>

        {/* Live Event Log Stream */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              <span>Log Event Pengunjung Real-Time</span>
            </h4>

            <button
              onClick={clearAnalyticsLogs}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Log</span>
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
            {events.length === 0 ? (
              <p className="text-center py-6 text-slate-500">Belum ada event pengunjung tercatat.</p>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#00E5FF]/20 text-[#00E5FF] font-bold">
                        {evt.eventName}
                      </span>
                      <span className="text-slate-400 text-[11px] font-sans">
                        Category: <strong className="text-slate-200">{evt.category}</strong>
                      </span>
                    </div>
                    {evt.details && (
                      <p className="text-[11px] text-slate-500 truncate">
                        {JSON.stringify(evt.details)}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{evt.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
