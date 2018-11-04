export function html(literals, ...stuff) {
  return literals.raw.reduce((result, literal) => {
    return result + literal + (stuff.length ? escapeHtml(stuff.shift()) : '');
  }, '');
}

const UNSAFE_RX = /[&<>"'`]/g;
const ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

function escapeHtml(input) {
  return `${input}`.replace(UNSAFE_RX, x => ENTITIES[x]);
}
