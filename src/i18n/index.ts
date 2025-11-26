import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import fr from './locales/fr.json';

const resources = {
  fr: {
    translation: fr,
  },
};

const resolveLanguage = () => {
  const systemLocale = Localization.locale || 'fr';
  const [languageCode] = systemLocale.split('-');
  return Object.prototype.hasOwnProperty.call(resources, languageCode)
    ? languageCode
    : 'fr';
};

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: resolveLanguage(),
    fallbackLng: 'fr',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

