import 'react-i18next';

import fr from '../i18n/locales/fr.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof fr;
  }
}

