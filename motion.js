// Both diagrams share one selection model. They animate once on entry;
// stage changes are always controlled by the visitor.
for (const system of document.querySelectorAll('.motion-system')) {
  const buttons = [...system.querySelectorAll('.motion-step')];
  const choices = [...system.querySelectorAll('.orbit-choice')];
  const marks = [...system.querySelectorAll('.orbit-mark')];
  for (const button of [...buttons, ...choices]) button.addEventListener('click', () => {
    const stage = button.dataset.stage;
    for (const item of buttons) {
      const selected = item.dataset.stage === stage;
      item.setAttribute('aria-expanded', String(selected));
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    }
    for (const choice of choices) choice.setAttribute('aria-pressed', String(choice.dataset.stage === stage));
    for (const mark of marks) mark.classList.toggle('is-active', mark.dataset.stage === stage);
    system.dataset.activeStage = stage;
  });
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    system.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        system.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(system);
  }
}
