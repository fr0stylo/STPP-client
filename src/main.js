import './main.scss';
import 'vue-material/dist/vue-material.css';
import 'vue-material/dist/theme/default.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import { Machine } from 'xstate';

import App from './vue/App.vue';
import router from './routes';

Vue.use(VueMaterial);


const vue = new Vue({
  el: '#root',
  router,
  render: h => h(App),
});

export default vue;
