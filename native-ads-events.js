/* Only palm transitions request interstitials; Android owns all SDK calls. */
(function () {
  'use strict';
  const bridge = window.GalimgilAds;
  const privacy = document.getElementById('adPrivacyEntry');
  const privacyButton = document.getElementById('adPrivacyButton');
  let connected = false, palmSupported = false, pending = null;
  function send(message) {
    if (!bridge || typeof bridge.postMessage !== 'function') return false;
    try { bridge.postMessage(JSON.stringify(message)); return true; } catch (_) { return false; }
  }
  function updatePrivacy(required) { if (privacy) privacy.hidden = !(connected && required === true); }
  function finish() {
    if (!pending) return;
    const next = pending.next;
    clearTimeout(pending.timeout);
    pending = null;
    next();
  }
  function beforePalm(next) {
    if (pending) return;
    if (!connected || !palmSupported || document.hidden) { next(); return; }
    const request = String(Date.now()) + '-' + Math.random().toString(36).slice(2);
    pending = {request, next, accepted:false};
    pending.timeout = setTimeout(() => { send({type:'cancelPalm', request}); finish(); }, 500);
    if (!send({type:'preparePalm', request, id:request})) finish();
  }
  window.GalimgilAdsEvents = {resultShown() {}, nextQuestion(next) { next(); }, beforePalm, updatePrivacy};
  if (privacyButton) privacyButton.addEventListener('click', () => { if (connected) send({type:'privacy'}); });
  if (!bridge || typeof bridge.postMessage !== 'function') return;
  bridge.onmessage = event => {
    let message;
    try { message = JSON.parse(event.data); } catch (_) { return; }
    if (message.type === 'config') {
      connected = true;
      palmSupported = message.palmAds === true;
      updatePrivacy(message.privacyRequired);
      return;
    }
    if (!pending || message.request !== pending.request) return;
    if (message.type === 'next') finish();
    else if (message.type === 'offer' && !pending.accepted) {
      if (document.hidden) { send({type:'cancelPalm'}); finish(); return; }
      pending.accepted = true;
      clearTimeout(pending.timeout);
      if (!send({type:'acceptPalm', request:pending.request, id:pending.request})) finish();
    }
  };
  window.addEventListener('pagehide', () => { send({type:'cancelPalm'}); finish(); });
  send({type:'ready'});
})();
