export interface LanguagesListOption {
    label: string
    value: string
    icon: string,
    file: string
}

export const LANGUAGES_LIST: LanguagesListOption[] = [
    {label: 'Cs', value: 'cs', file: 'cs.json', icon: 'flagpack:cz'},
    {label: 'Sk', value: 'sk', file: 'sk.json', icon: 'flagpack:sk'},
    {label: 'En', value: 'en', file: 'en.json', icon: 'flagpack:gb-ukm'},
]

export const MAPPED_LANGUAGES_LIST_FOR_NUXT_CONFIG_I18N = LANGUAGES_LIST.map(lang => ({
    code: lang.value,
    name: lang.label,
    file: lang.file,
}))

export const FALLBACK_LANGUAGE = 'cs'
// export const FALLBACK_LANGUAGE = 'en-Uk'

export const LOCALE_STORAGE_KEY = 'app-language'