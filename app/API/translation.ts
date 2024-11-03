import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en-US.json';
import hr from './locales/hr-HR.json';
import 'intl-pluralrules';

i18n.use(initReactI18next).init(
  {
    resources: {
      en: { translation: en },
      hr: { translation: hr },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  },
  (err, t) => {
    if (err) {
      console.error('i18n initialization failed', err);
    } else {
      console.log('i18n initialized successfully');
    }
  },
);

export default i18n;
