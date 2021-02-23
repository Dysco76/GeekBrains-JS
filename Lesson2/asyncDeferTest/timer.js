[
  'last',
  'async',
  'defer',
  'DOMContentLoaded',
  'load'
].forEach(title => console.time(title));
document.addEventListener('DOMContentLoaded', () => {
  console.timeEnd('DOMContentLoaded');
});
window.addEventListener('load', () => {
  console.timeEnd('load');
});