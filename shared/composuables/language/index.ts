import * as core from './core';
import * as config from './config';
import { useI18n } from '#i18n';

type TextF = (key: string, fallback?: string) => string;

const textF: TextF = (key, fallback = '') => {
  const { t } = useI18n();
  const translated = t(key);
  return translated === key ? fallback : translated;
};

type LocalesImporter = () => Promise<any> | any;

export async function useLocalI18n(
  importer: LocalesImporter,
  prefix?: string
) {
  const { locale, mergeLocaleMessage, t } = useI18n()

  // Funkcia na načítanie správneho jazyka
  let allMessages: any

  async function load() {
    if (!allMessages) {
      allMessages = typeof importer === 'function'
        ? (await importer()).default || (await importer())
        : importer
    }

    const lang = locale.value
    const messages = allMessages[lang]
    if (!messages) return

    mergeLocaleMessage(lang, prefix ? { [prefix]: messages[prefix] || messages } : messages)
  }

  await load()
  watch(locale, () => load(), { immediate: false })

  return { t }
}

export { core, config, textF };
