import i18next from 'i18next';
import translations from './translations';
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import LanguageDetector from 'i18next-browser-languagedetector';

import type { i18n, Resource } from 'i18next';

export class I18nService {
	// expose i18next
	i18n: i18n;

	constructor() {
		this.i18n = i18next;
		this.initialize();
		// this.changeLanguage("de")
		//this.changeLanguage(INITIAL_LANGUAGE);
	}

	// Our translation function
	t(key: string, replacements?: Record<string, unknown>): string {
		return this.i18n.t(key, replacements);
	}

	// Initializing i18n
	initialize() {
		this.i18n.use(LanguageDetector).init({
			// lng: INITIAL_LANGUAGE,
			fallbackLng: 'en',
			debug: false,
			defaultNS: 'translation',
			fallbackNS: 'common',
			resources: translations as Resource,
			interpolation: {
				escapeValue: false
			},
			// detection: {
			// 	order: ['browser', 'querystring', 'navigator', 'localStorage', 'htmlTag'],
			// 	lookupQuerystring: 'lng'
			// }
			detection: {
				order: ['querystring', 'cookie', 'localStorage', 'navigator'],
				lookupQuerystring: 'lng',
				lookupLocalStorage: 'language'
			}
		});
		this.i18n.addResourceBundle('en', 'translation', en);
		this.i18n.addResourceBundle('de', 'translation', de);
		this.i18n.addResourceBundle('fr', 'translation', fr);
	}

	changeLanguage(language: string) {
		this.i18n.changeLanguage(language);
	}
}
