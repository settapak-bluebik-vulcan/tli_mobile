/* eslint-disable @typescript-eslint/no-shadow */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { th } from './th';

enum LangCode {
  th = 'th',
}

const resources = {
  th: {
    translation: th,
  },
};

const initalizeI18Next = async () => {
  await i18n.use(initReactI18next).init({
    debug: false,
    resources,
    lng: LangCode.th,
    fallbackLng: LangCode.th,
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
  });
};

export default { initalizeI18Next };
