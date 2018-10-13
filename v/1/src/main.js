import Madagascar from './framework/Madagascar.js';

import App from './App.js';
import store from './store.js'
import UserCard from './components/UserCard.js'

Madagascar.component('user-card', UserCard)

new Madagascar({
  store,
  render: App
}).$mount('#app');
