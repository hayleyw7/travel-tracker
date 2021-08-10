// SHOW & HHIDE

export function hide(elements) {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
}

export function show(elements) {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
}