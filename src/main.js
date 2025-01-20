import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import "@/assets/styles/main.scss";
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    de, en, es, fr
  }
})

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.mount('#app');