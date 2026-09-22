/* Native Android owns all ad SDK calls. Browsers and older apps remain ad-free. */
(function () {
  "use strict";
  const bridge = window.GalimgilAds;
  const privacy = document.getElementById("adPrivacyEntry");
  const privacyButton = document.getElementById("adPrivacyButton");
  let connected = false;
  let minimumViewMs = 8000;
  let current = null;
  let pending = null;
  let observer = null;
  let timer = null;

  function send(message) {
    if (!bridge || typeof bridge.postMessage !== "function") return false;
    try { bridge.postMessage(JSON.stringify(message)); return true; } catch (_) { return false; }
  }

  function updatePrivacy(required) {
    if (privacy) privacy.hidden = !(connected && required === true);
  }

  function finishNext() {
    if (!pending) return;
    const next = pending.next;
    clearTimeout(pending.timeout);
    pending = null;
    clearResult();
    next();
  }

  function clearResult() {
    if (observer) observer.disconnect();
    observer = null;
    clearInterval(timer);
    timer = null;
    current = null;
    if (connected) send({ type: "leaveResult" });
  }

  function resultShown(id, fresh) {
    clearResult();
    if (!connected || !fresh || !id) return;
    const result = document.getElementById("choiceResult");
    const end = result && result.querySelector("[data-ad-result-end]");
    if (!result || !end || typeof IntersectionObserver !== "function") return;
    current = { id: String(id), elapsed: 0, last: performance.now(), endSeen: false, counted: false };
    send({ type: "resultStarted", id: current.id });
    observer = new IntersectionObserver(entries => {
      if (current && !document.hidden && entries.some(e => e.isIntersecting && e.intersectionRatio >= 0.5)) current.endSeen = true;
    }, { threshold: 0.5 });
    observer.observe(end);
    timer = setInterval(() => {
      if (!current || current.counted) return;
      const now = performance.now();
      const rect = result.getBoundingClientRect();
      const visible = !document.hidden && result.getClientRects().length > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) current.elapsed += Math.min(now - current.last, 500);
      current.last = now;
      if (visible && current.endSeen && current.elapsed >= minimumViewMs) {
        send({ type: "resultViewed", id: current.id });
      }
    }, 250);
  }

  function nextQuestion(next) {
    if (pending) return;
    if (!connected || !current || !current.counted) { clearResult(); next(); return; }
    const request = String(Date.now()) + "-" + Math.random().toString(36).slice(2);
    pending = { request, next, accepted: false };
    // Only the offer handshake is timed. Never navigate underneath a displayed ad.
    pending.timeout = setTimeout(() => {
      send({ type: "cancelNext", request });
      finishNext();
    }, 500);
    if (!send({ type: "prepareNext", request, id: current.id })) finishNext();
  }

  window.GalimgilAdsEvents = { resultShown, nextQuestion, updatePrivacy };
  if (privacyButton) privacyButton.addEventListener("click", () => { if (connected) send({ type: "privacy" }); });
  if (!bridge || typeof bridge.postMessage !== "function") return;
  bridge.onmessage = event => {
    let message;
    try { message = JSON.parse(event.data); } catch (_) { return; }
    if (message.type === "config") {
      connected = true;
      minimumViewMs = Math.max(8000, Number(message.minimumViewMs) || 8000);
      updatePrivacy(message.privacyRequired);
      return;
    }
    if (message.type === "viewed") {
      if (current && message.id === current.id) current.counted = true;
      return;
    }
    if (!pending || message.request !== pending.request) return;
    if (message.type === "next") finishNext();
    else if (message.type === "offer" && !pending.accepted) {
      if (document.hidden || !current) { send({ type: "cancelNext" }); finishNext(); return; }
      pending.accepted = true;
      clearTimeout(pending.timeout);
      if (!send({ type: "acceptNext", request: pending.request, id: current.id })) finishNext();
    }
  };
  window.addEventListener("pagehide", () => { send({ type: "cancelNext" }); clearResult(); });
  send({ type: "ready" });
})();
