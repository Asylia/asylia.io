import * as core from './core';
import * as config from './config';
import { useI18n } from '#i18n';

type TextF = (key: string, fallback?: string) => string;

const textF: TextF = (key, fallback = '') => {
  const { t } = useI18n();
  const translated = t(key);
  return translated === key ? fallback : translated;
};

export { core, config, textF };
