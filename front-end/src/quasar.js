import Vue from 'vue';

import './styles/quasar.scss';
import lang from 'quasar/lang/ru.js';
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar } from 'quasar';

Vue.use(Quasar, {
  config: {},
  plugins: {},
  lang: lang,
});
