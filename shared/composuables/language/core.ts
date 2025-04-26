import { watch, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from '#i18n';
import {
  LANGUAGES_LIST,
  FALLBACK_LANGUAGE,
  LOCALE_STORAGE_KEY,
  type SupportedLanguages,
  type LanguagesListOption,
} from './config';

/**
 * Detects the user’s preferred language by inspecting the browser settings.
 * Falls back to a configured default if no match is found in the supported list.
 *
 * @returns {string} The detected or fallback language code.
 */
function detectBrowserLang(): SupportedLanguages {
  // Read the browser’s primary language setting, or use the fallback
  function getBrowserLang(): string {
    if (typeof navigator === 'undefined') return FALLBACK_LANGUAGE;

    const nav = navigator as Navigator & { userLanguage?: string };
    return nav.language ?? nav.userLanguage ?? FALLBACK_LANGUAGE;
  }

  const navLang = getBrowserLang();

  // Try to find a supported language whose prefix matches the browser setting
  const match = LANGUAGES_LIST.find((l) => navLang.startsWith(l.value.split('-')[0] ?? ''));

  // If a supported language was found, return its full code
  if (match !== undefined) return match.value;

  // Otherwise return the configured fallback language
  return FALLBACK_LANGUAGE;
}

// Persist the current language in localStorage under the given key.
// The initial value is derived from detectBrowserLang().
const lang = useStorage<SupportedLanguages>(LOCALE_STORAGE_KEY, detectBrowserLang());

/**
 * A computed reference that always holds the full language object
 * (label, value, icon) for the currently selected code.
 * If the stored code isn’t in the list, we return a minimal fallback object.
 */
const selectedLang = computed<LanguagesListOption>(() => {
  return (
    LANGUAGES_LIST.find((l) => l.value === lang.value) ?? {
      label: lang.value,
      value: lang.value,
      icon: '',
      file: '',
    }
  );
});

/**
 * Updates the current language code if it’s supported.
 * Otherwise logs a warning.
 *
 * @param {string} value - The language code to switch to.
 */
function setLang(value: SupportedLanguages) {
  if (LANGUAGES_LIST.some((l) => l.value === value)) lang.value = value;
  else console.warn(`Unsupported language: ${value}`);
}

/**
 * Composable providing reactive language state, including:
 * - `lang`: the raw code stored in localStorage
 * - `selectedLang`: the full object for the current language
 * - `setLang`: function to change the language
 * - `languages`: list of all supported languages
 */
export function useLanguage() {
  const { setLocale } = useI18n();

  // Whenever `lang` changes, ensure it’s valid and stored consistently
  watch(lang, (v) => {
    setLang(v);
    setLocale(v);
  });

  return {
    lang,
    selectedLang,
    setLang,
    languages: LANGUAGES_LIST,
  };
}
