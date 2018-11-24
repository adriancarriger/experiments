// search for something in Slack
const messages = [];
let waitTime = 1500;
let longWait = 4000;

function saveItems() {
  const list = document.querySelector('.c-search_focus_managed_list');
  const next = document.querySelector('.c-search__pager__button_forward');

  if (list.length === 0) {
    console.log('Could not find items! 😢');
    setTimeout(() => {
      saveItems();
    }, longWait);

    return;
  }

  for (const item of list.childNodes) {
    const sender = item.querySelector('.c-message__sender_link');
    const textNode = item.querySelector('.c-search_message__body span');
    if (textNode) {
      messages.push({ user: sender.innerText, text: textNode.innerText });
    }
  }

  if (next) {
    next.click();

    setTimeout(() => {
      saveItems();
    }, waitTime);
  } else {
    console.log('\n\n\n\n\n\nDONE!');
    console.log('🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉');
    console.log('\n\n');
    messages.forEach(message => {
      console.log(`\n${message.user}:`);
      console.log(message.text);
    });
  }
}
