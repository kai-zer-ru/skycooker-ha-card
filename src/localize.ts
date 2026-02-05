// Файл локализации для skycooker-ha-card
import enTranslations from './translations/en.json';
import ruTranslations from './translations/ru.json';
import { HomeAssistant } from './types';

type Translations = {
  [key: string]: string;
};

export const localize: Record<string, Translations> = {
  "en": enTranslations as Translations,
  "ru": ruTranslations as Translations
};

export function getTranslation(language: string, key: string): string {
  const translations = localize[language];
  const result = translations?.[key] || localize['ru']?.[key] || localize['en']?.[key] || key;
  
  return result;
}

export function getLanguage(
  config?: { language?: string },
  hass?: HomeAssistant
): string {
  // Проверяем, задан ли язык в конфигурации карточки
  const configLanguage = config?.language;
  if (configLanguage) {
    return configLanguage;
  }
  
  // Иначе используем язык из Home Assistant
  let hassLanguage = hass?.language || 'ru';
  
  // Нормализуем язык (например, ru-RU -> ru, Russian -> ru)
  if (hassLanguage.startsWith('ru')) {
    hassLanguage = 'ru';
  }
  
  return hassLanguage;
}