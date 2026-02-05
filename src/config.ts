// Конфигурация данных для skycooker-ha-card

import type { HomeAssistant } from './types';

export interface SkycookerConfig {
  type: string;
  name: string;
  icon: string;
  language: string;
  mode_entity: string;
  additional_mode_entity: string;
  cooking_time_hours_entity: string;
  cooking_time_minutes_entity: string;
  delayed_start_hours_entity: string;
  delayed_start_minutes_entity: string;
  auto_warm_entity: string;
  start_entity: string;
  stop_entity: string;
  start_delayed_entity: string;
  temperature_entity: string;
  cooking_temperature_entity: string;
  remaining_time_entity: string;
  cooking_time_entity: string;
  status_entity: string;
  current_mode_entity: string;
  current_additional_mode_entity: string;
  auto_warm_time_entity: string;
  delayed_launch_time_entity: string;
  favorite_modes_entity: string;
}

export const CONFIG_ENTITY_KEYS: (keyof SkycookerConfig)[] = [
  'mode_entity',
  'additional_mode_entity',
  'cooking_time_hours_entity',
  'cooking_time_minutes_entity',
  'delayed_start_hours_entity',
  'delayed_start_minutes_entity',
  'auto_warm_entity',
  'start_entity',
  'stop_entity',
  'start_delayed_entity',
  'cooking_temperature_entity',
  'temperature_entity',
  'remaining_time_entity',
  'cooking_time_entity',
  'status_entity',
  'current_mode_entity',
  'current_additional_mode_entity',
  'auto_warm_time_entity',
  'delayed_launch_time_entity',
  'favorite_modes_entity',
];

export const DEFAULT_CONFIG: SkycookerConfig = {
  type: 'custom:skycooker-ha-card',
  name: 'SkyCooker',
  icon: 'mdi:stove',
  language: 'ru',
  mode_entity: '',
  additional_mode_entity: '',
  cooking_time_hours_entity: '',
  cooking_time_minutes_entity: '',
  delayed_start_hours_entity: '',
  delayed_start_minutes_entity: '',
  auto_warm_entity: '',
  start_entity: '',
  stop_entity: '',
  start_delayed_entity: '',
  temperature_entity: '',
  cooking_temperature_entity: '',
  remaining_time_entity: '',
  cooking_time_entity: '',
  status_entity: '',
  current_mode_entity: '',
  current_additional_mode_entity: '',
  auto_warm_time_entity: '',
  delayed_launch_time_entity: '',
  favorite_modes_entity: '',
};

export function normalizeConfig(
  config: Partial<SkycookerConfig> | undefined,
  hass?: HomeAssistant
): SkycookerConfig {
  if (!config) {
    throw new Error('Configuration is required');
  }

  const lang = config.language ?? hass?.language ?? 'ru';

  return {
    type: config.type ?? DEFAULT_CONFIG.type,
    name: config.name ?? DEFAULT_CONFIG.name,
    icon: config.icon ?? DEFAULT_CONFIG.icon,
    language: lang,
    mode_entity: config.mode_entity ?? '',
    additional_mode_entity: config.additional_mode_entity ?? '',
    cooking_time_hours_entity: config.cooking_time_hours_entity ?? '',
    cooking_time_minutes_entity: config.cooking_time_minutes_entity ?? '',
    delayed_start_hours_entity: config.delayed_start_hours_entity ?? '',
    delayed_start_minutes_entity: config.delayed_start_minutes_entity ?? '',
    auto_warm_entity: config.auto_warm_entity ?? '',
    start_entity: config.start_entity ?? '',
    stop_entity: config.stop_entity ?? '',
    start_delayed_entity: config.start_delayed_entity ?? '',
    temperature_entity: config.temperature_entity ?? '',
    cooking_temperature_entity: config.cooking_temperature_entity ?? '',
    remaining_time_entity: config.remaining_time_entity ?? '',
    cooking_time_entity: config.cooking_time_entity ?? '',
    status_entity: config.status_entity ?? '',
    current_mode_entity: config.current_mode_entity ?? '',
    current_additional_mode_entity: config.current_additional_mode_entity ?? '',
    auto_warm_time_entity: config.auto_warm_time_entity ?? '',
    delayed_launch_time_entity: config.delayed_launch_time_entity ?? '',
    favorite_modes_entity: config.favorite_modes_entity ?? '',
  };
}
