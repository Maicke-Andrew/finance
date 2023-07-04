import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './translations/en.json';
import translationPT from './translations/pt.json';

let lng = window.localStorage.getItem('language') || 'pt';

i18n
    .use(initReactI18next)
    .init({
        lng: lng,
        fallbackLng: "pt",
        debug: true,
        resources: {
            pt: {
                translation: translationPT,
            },
            en: {
                translation: translationEN,
            }
        },
    });

export default i18n;