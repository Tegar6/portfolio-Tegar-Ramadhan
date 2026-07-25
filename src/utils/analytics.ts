import { AnalyticsEvent } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const STORAGE_KEY = 'dev_portfolio_ga_events';
const GA_MEASUREMENT_ID_KEY = 'dev_portfolio_ga_id';

export const getStoredGaId = (): string => {
  return localStorage.getItem(GA_MEASUREMENT_ID_KEY) || 'G-DEVFRONTEND';
};

export const setStoredGaId = (measurementId: string) => {
  localStorage.setItem(GA_MEASUREMENT_ID_KEY, measurementId);
  initGoogleAnalytics(measurementId);
};

export const initGoogleAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Remove existing gtag script if present
  const existingScript = document.getElementById('ga-gtag-script');
  if (existingScript) existingScript.remove();

  if (!measurementId || measurementId === 'G-DISABLED') return;

  // Inject Google Analytics gtag.js
  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    (window.dataLayer as any).push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: true,
    page_title: document.title,
    page_location: window.location.href,
  });

  logEvent('page_view', 'engagement', { path: window.location.pathname });
};

export const logEvent = (eventName: string, category: string = 'general', details: Record<string, any> = {}) => {
  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    eventName,
    category,
    details,
  };

  // Push to window.gtag if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, {
        event_category: category,
        ...details,
      });
    } catch (e) {
      console.warn('Google Analytics event dispatch failed', e);
    }
  }

  // Save to local logs for live dashboard view
  const logs = getAnalyticsLogs();
  const updatedLogs = [newEvent, ...logs].slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));

  // Dispatch custom event so UI components can listen in real-time
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ga-event-logged', { detail: newEvent }));
  }
};

export const getAnalyticsLogs = (): AnalyticsEvent[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getInitialMockLogs();
  } catch {
    return getInitialMockLogs();
  }
};

export const clearAnalyticsLogs = () => {
  localStorage.removeItem(STORAGE_KEY);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ga-event-logged'));
  }
};

function getInitialMockLogs(): AnalyticsEvent[] {
  return [
    {
      id: 'evt_init_01',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
      eventName: 'page_view',
      category: 'acquisition',
      details: { page: '/#hero', referrer: 'direct' },
    },
    {
      id: 'evt_init_02',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
      eventName: 'theme_toggle',
      category: 'interaction',
      details: { theme: 'dark' },
    },
  ];
}
