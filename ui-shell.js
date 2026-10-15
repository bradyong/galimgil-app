/* Presentation only: the existing app owns tab events, forms, storage and ads. */
(() => {
  globalThis.lucide?.createIcons();
  const palmInput = document.getElementById('palmInput');
  const cameraButton = document.getElementById('palmCameraButton');
  const bridge = globalThis.GalimgilAndroid;
  const androidWebView = Boolean(bridge) || /Android.*(?:; wv\)|Version\/4\.0)/i.test(navigator.userAgent);
  let cameraSupported = !androidWebView;
  if (androidWebView) {
    try { cameraSupported = bridge?.supportsPalmCamera?.() === true; }
    catch (_) { cameraSupported = false; }
  }
  cameraButton.hidden = !cameraSupported;
  if (androidWebView && !cameraSupported) {
    const note = document.createElement('p');
    note.className = 'muted';
    note.id = 'palmCameraCompatibility';
    note.textContent = '앨범에서 사진을 선택해주세요. 직접 촬영은 최신 앱과 카메라 지원 기기에서 사용할 수 있어요. Play 스토어에서 앱 업데이트를 확인해주세요.';
    cameraButton.parentElement.after(note);
  }
  cameraButton.addEventListener('click', () => {
    if (!cameraSupported) return;
    palmInput.setAttribute('capture', 'environment');
    palmInput.click();
  });
  document.getElementById('palmAlbumButton').addEventListener('click', () => {
    palmInput.removeAttribute('capture');
    palmInput.click();
  });
  const tabs = document.querySelectorAll('.tabbar .tab');
  const update = () => tabs.forEach(tab => {
    if (tab.classList.contains('active')) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  tabs.forEach(tab => new MutationObserver(update).observe(tab, {attributes:true, attributeFilter:['class']}));
  update();
})();
