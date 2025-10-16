import { I18n } from 'i18n-js';
import en from './locales/en.json';
import es from './locales/es.json';

const i18n = new I18n({
    en,
    es,
});

i18n.defaultLocale = 'en';
i18n.locale = 'en';

i18n.enableFallback = true;


export const changeLanguage = (languageCode) => {
    i18n.locale = languageCode;
};

export default i18n;

