(function () {
  const question = document.getElementById('questionInput');
  const a = document.getElementById('choiceA'), b = document.getElementById('choiceB');
  const manual = document.getElementById('manualChoices');
  const preview = document.getElementById('extractedChoices');
  const hint = document.getElementById('extractionHint');
  const edit = document.getElementById('editChoices');
  let extraction = null;
  let manualOverride = false;
  function render() {
    document.getElementById('extractedA').textContent = a.value;
    document.getElementById('extractedB').textContent = b.value;
    preview.hidden = !a.value || !b.value;
  }
  function sync() {
    manualOverride = false;
    manual.hidden = true;
    extraction = ChoiceExtraction.extract(question.value);
    a.value = extraction.ok ? extraction.a : '';
    b.value = extraction.ok ? extraction.b : '';
    hint.textContent = '';
    render();
  }
  question.addEventListener('input', sync);
  edit.addEventListener('click', () => {
    manual.hidden = false;
    manualOverride = true;
    a.focus();
  });
  [a,b].forEach(input => input.addEventListener('input', () => { manualOverride = true; render(); }));
  window.GalimgilChoiceEntry = {
    reset: sync,
    category: () => !manualOverride && extraction?.ok ? extraction.category : '',
    validate: () => {
      if (a.value.trim() && b.value.trim()) { hint.textContent = ''; return true; }
      hint.textContent = '어떤 두 가지인가요? 고민에 대상을 적거나 선택지를 수정해주세요.';
      edit.focus({preventScroll:true});
      return false;
    }
  };
})();
