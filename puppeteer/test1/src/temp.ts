// in:#country-corners from:@John Lubke
const messages = [];

setInterval(() => {
  printItems();
}, 1000);

function printItems() {
  const list = document.querySelector('.c-search_focus_managed_list');
  const next = document.querySelector('.c-search__pager__button_forward');

  if (!list) {
    console.log('DONE!');
    return;
  }

  for (var item of list.childNodes) {
    const textNode = item.querySelector('.c-search_message__body span');
    if (textNode) {
      messages.unshift(textNode.innerText);
    }
  }

  next.click();
}
