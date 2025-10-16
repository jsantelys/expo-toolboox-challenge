import React, { createContext, useState, useContext, useCallback } from 'react';
import i18n from './index';

const I18nContext = createContext(undefined);

export function I18nProvider({ children }) {
    const [locale, setLocaleState] = useState(i18n.locale);

    const t = useCallback((key, options) => {
        return i18n.t(key, options);
    }, [locale]);

    const setLocale = useCallback((newLocale) => {
        i18n.locale = newLocale;
        setLocaleState(newLocale);
    }, []);

    return (
        <I18nContext.Provider value={{ locale, t, setLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }

    return context;
}

