import { createApp } from 'vue';
import './styles.scss';
import App from './app/App.vue';
import router from './routes';
import { svgSpritePlugin } from "vue-svg-sprite";
import "./api/instance"

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.min.css'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';


const vuetify = createVuetify({
  components,
  directives,
});

const svgSpriteBasePath = "/@fs/C:/Users/Степан/Desktop/pet/vue-stores/libs/src/lib/assets/sprite/svg-sprite.svg";

createApp(App).use(svgSpritePlugin, {
  url: svgSpriteBasePath,
  class: "svg-image",
}).use(vuetify).use(router).use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions).mount('#root')
