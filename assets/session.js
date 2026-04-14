// ══════════════════════════════════════════════════════
// STAGE CRONO — session.js
// Sesión persistente del piloto + config centralizada
// ══════════════════════════════════════════════════════

const SUPA_URL = 'https://sgmzacwxfuznolthyjff.supabase.co';
const SUPA_KEY = 'sb_publishable_-wDAA3WMgcrJSGA9B4Gciw_wOuM27pw';

const GravitasSession = {
  KEY: 'stageCrono_session',

  save(pilot) {
    const s = this.get() || { times: {} };
    s.pilot = pilot.trim();
    localStorage.setItem(this.KEY, JSON.stringify(s));
  },

  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)); }
    catch { return null; }
  },

  getPilot() { return this.get()?.pilot || null; },

  saveTime(seg, ms, splits) {
    const s = this.get() || { pilot: null, times: {} };
    const key = `s${seg}`;
    if (!s.times[key] || ms < s.times[key].ms) {
      s.times[key] = { ms, splits, date: new Date().toISOString() };
    }
    localStorage.setItem(this.KEY, JSON.stringify(s));
  },

  getTime(seg) { return this.get()?.times?.['s' + seg] || null; },

  getTimes() { return this.get()?.times || {}; },

  getTotal() {
    const t = this.getTimes();
    if (!t.s1 || !t.s2) return null;
    return t.s1.ms + t.s2.ms;
  },

  pin(nombre) {
    return String([...nombre.toLowerCase()]
      .reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0) >>> 0)
      .slice(-4).padStart(4, '0');
  },

  clear() { localStorage.removeItem(this.KEY); }
};
