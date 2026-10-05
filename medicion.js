(function () {
  'use strict';
  var TT_PIXEL_ID = '';
  var API = 'https://api.trackai.party';
  var SRC_KEY = 'ta_src', SID_KEY = 'ta_sid';
  var FIELDS = { utm_source: 'source', utm_medium: 'medium', utm_campaign: 'campaign', utm_content: 'content', ttclid: 'ttclid' };

  function read(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }

  function sessionId() {
    var sid = read(SID_KEY);
    if (!sid) { sid = 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); write(SID_KEY, sid); }
    return sid;
  }

  function fromUrl() {
    var out = {}, found = false;
    try {
      var q = new URLSearchParams(window.location.search);
      Object.keys(FIELDS).forEach(function (k) {
        var v = q.get(k);
        if (v) { out[FIELDS[k]] = v.slice(0, 120); found = true; }
      });
    } catch (_) {}
    return found ? out : null;
  }

  function stored() {
    try { return JSON.parse(read(SRC_KEY) || 'null'); } catch (_) { return null; }
  }

  var current = fromUrl();
  if (current) {
    current.landing = window.location.pathname;
    current.ts = new Date().toISOString();
    write(SRC_KEY, JSON.stringify(current));
  } else {
    current = stored();
  }

  function source() {
    var s = current || {};
    return { source: s.source || null, medium: s.medium || null, campaign: s.campaign || null, content: s.content || null, ttclid: s.ttclid || null };
  }

  var TT_EVENTS = { page_view: null, download_click: 'ClickButton', checkout_start: 'InitiateCheckout', payment_ok: 'CompletePayment' };

  function pixel(name, data) {
    if (!TT_PIXEL_ID || !window.ttq) return;
    try {
      var tt = TT_EVENTS[name];
      if (tt) window.ttq.track(tt, name === 'payment_ok' ? { value: Number(data && data.amount) || 30, currency: 'USD', content_type: 'product', content_id: 'trackai_pro_anual' } : {});
    } catch (_) {}
  }

  function track(event, data) {
    data = data || {};
    var body = { event: event, sid: sessionId(), page: window.location.pathname, source: source(), data: data };
    try {
      fetch(API + '/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(function () {});
    } catch (_) {}
    pixel(event, data);
  }

  function loadPixel() {
    if (!TT_PIXEL_ID) return;
    (function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
      ttq.setAndDefer = function (o, e) { o[e] = function () { o.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e) {
        var u = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
        var o = d.createElement('script'); o.type = 'text/javascript'; o.async = true; o.src = u + '?sdkid=' + e + '&lib=' + t;
        var a = d.getElementsByTagName('script')[0]; a.parentNode.insertBefore(o, a);
      };
      ttq.load(TT_PIXEL_ID);
      ttq.page();
    })(window, document, 'ttq');
  }

  function os() { return /Windows/i.test(navigator.userAgent) ? 'windows' : /Mac/i.test(navigator.userAgent) ? 'mac' : 'otro'; }

  function bindClicks() {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var k = a.getAttribute('data-k');
      if (k) { track('download_click', { os: k }); return; }
      var href = a.getAttribute('href') || '';
      if (/^\/download\/?(\?|$)/.test(href)) track('download_cta', { os: os() });
    }, true);
  }

  loadPixel();
  bindClicks();
  track('page_view');

  window.TA = { track: track, pixel: pixel, source: source, sid: sessionId };
})();
