import * as core from './core';
import * as config from './config';
import { useI18n } from '#i18n';

function tFallback(key: string, fallback: string) {
  const {t} = useI18n();
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export { core, config, tFallback };
