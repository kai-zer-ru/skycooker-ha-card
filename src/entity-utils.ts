import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from './types';

const STANDBY_OPTIONS = [
  'unknown',
  'Нет',
  'Режим ожидания',
  'None',
  'Standby Mode',
  '',
];

const POSSIBLE_OPTION_ATTRS = [
  'options',
  'temperature_options',
  'values',
  'list',
  'temperature_values',
  'temperature_list',
  'temp_options',
  'temp_values',
];

const FAVORITE_MODES_ATTRS = [
  'options',
  'list',
  'favorite_modes',
  'modes',
  'favoriteModes',
  'favorites',
  'favorite_list',
];

function isHaVersionAtLeast(
  hass: HomeAssistant | undefined,
  targetMajor: number,
  targetMinor: number
): boolean {
  const ver =
    (hass as any)?.connection?.haVersion ||
    (hass as any)?.config?.version ||
    '';
  if (!ver) return false;
  const [majorStr, minorStr] = ver.split('.');
  const major = Number(majorStr);
  const minor = Number(minorStr);
  if (!Number.isFinite(major) || !Number.isFinite(minor)) return false;
  if (major > targetMajor) return true;
  if (major < targetMajor) return false;
  return minor >= targetMinor;
}

export function getEntityState(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): string {
  if (!entityId || !hass) return 'N/A';
  return hass.states[entityId]?.state ?? 'N/A';
}

export function getEntityOptions(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): string[] {
  return getOptionsFromState(hass, entityId);
}

function getOptionsFromState(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): string[] {
  if (!entityId || !hass) return [];
  const stateObj = hass.states[entityId];
  if (!stateObj?.attributes) return [];

  let options: string[] | undefined;
  for (const attr of POSSIBLE_OPTION_ATTRS) {
    if (stateObj.attributes[attr]) {
      const val = stateObj.attributes[attr];
      if (Array.isArray(val)) {
        options = val;
      } else if (typeof val === 'object' && val !== null) {
        options = Object.values(val) as string[];
      } else if (typeof val === 'string') {
        options = val.split(',').map((s) => s.trim());
      }
      break;
    }
  }
  if (!options?.length) return [];

  // Не отфильтровываем режим ожидания, чтобы он был доступен
  // в селектах «Программа приготовления» и «Избранное».
  return options.filter(
    (o) =>
      o !== 'unknown' &&
      o != null &&
      o !== ''
  );
}

export function getSelectOptions(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): TemplateResult[] {
  const options = getOptionsFromState(hass, entityId);
  const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
  return options.map(
    (option) =>
      useHaDropdownItem
        ? html`<ha-dropdown-item value=${option}>${option}</ha-dropdown-item>`
        : html`<mwc-list-item value=${option}>${option}</mwc-list-item>`
  );
}

/** Опции подпрограммы 0-15 для select.subprogram интеграции */
const SUBPROGRAM_OPTIONS = Array.from({ length: 16 }, (_, i) => String(i));

export function getSubprogramSelectOptions(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): TemplateResult[] {
  const options = getOptionsFromState(hass, entityId);
  const opts = options.length > 0 ? options : SUBPROGRAM_OPTIONS;
  const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
  return opts.map(
    (option) =>
      useHaDropdownItem
        ? html`<ha-dropdown-item value=${option}>${option}</ha-dropdown-item>`
        : html`<mwc-list-item value=${option}>${option}</mwc-list-item>`
  );
}

export function getTemperatureOptionsWithFallback(
  hass: HomeAssistant | undefined,
  temperatureEntity: string | undefined
): TemplateResult[] {
  if (!temperatureEntity || !hass) return [];

  const stateObj = hass.states[temperatureEntity];
  if (!stateObj?.attributes) return [];

  const standardOptions = getSelectOptions(hass, temperatureEntity);
  if (standardOptions.length > 0) return standardOptions;

  const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);

  for (const attrName of POSSIBLE_OPTION_ATTRS) {
    const attr = stateObj.attributes[attrName];
    if (!attr) continue;

    let options: string[] = Array.isArray(attr)
      ? attr
      : typeof attr === 'object' && attr !== null
        ? (Object.values(attr) as string[])
        : typeof attr === 'string'
          ? attr.split(',').map((s) => s.trim())
          : [];

    options = options.filter(
      (o) => o !== 'unknown' && o !== '' && o != null && o !== undefined
    );
    if (options.length > 0) {
      return options.map((o) => {
        const val = o.replace(/°?\s*C$/i, '').trim() || o;
        return useHaDropdownItem
          ? html`<ha-dropdown-item value=${val}>${o}</ha-dropdown-item>`
          : html`<mwc-list-item value=${val}>${o}</mwc-list-item>`;
      });
    }
  }

  if (stateObj.attributes) {
    const allOptions: string[] = [];
    for (const [, value] of Object.entries(stateObj.attributes)) {
      if (
        typeof value === 'string' &&
        (value.includes('°C') || value.includes('C') || !isNaN(Number(value)))
      ) {
        allOptions.push(value);
      } else if (Array.isArray(value)) {
        allOptions.push(
          ...value.filter(
            (item) =>
              typeof item === 'string' && item !== 'unknown' && item !== ''
          )
        );
      }
    }
    if (allOptions.length > 0) {
      return allOptions.map((o) => {
        const val = o.replace(/°?\s*C$/i, '').trim() || o;
        return useHaDropdownItem
          ? html`<ha-dropdown-item value=${val}>${o}</ha-dropdown-item>`
          : html`<mwc-list-item value=${val}>${o}</mwc-list-item>`;
      });
    }
  }

  const defaultTemps = ['50', '60', '70', '80', '90', '100'];
  return defaultTemps.map(
    (temp) =>
      useHaDropdownItem
        ? html`<ha-dropdown-item value=${temp}>${temp} °C</ha-dropdown-item>`
        : html`<mwc-list-item value=${temp}>${temp} °C</mwc-list-item>`
  );
}

/** Убирает °C из значения температуры для select_option (интеграция ожидает "100", не "100°C") */
export function normalizeTemperatureValue(value: string): string {
  if (!value || typeof value !== 'string') return value;
  return value.replace(/°?\s*C$/i, '').trim() || value;
}

export function getFavoriteModes(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): string[] {
  if (!entityId || !hass) return [];

  const stateObj = hass.states[entityId];
  if (!stateObj?.attributes) return [];

  let modes: string[] = [];
  for (const attr of FAVORITE_MODES_ATTRS) {
    const val = stateObj.attributes[attr];
    if (val) {
      modes = Array.isArray(val)
        ? val
        : typeof val === 'object' && val !== null
          ? (Object.values(val) as string[])
          : typeof val === 'string'
            ? val.split(',').map((s) => s.trim())
            : [];
      break;
    }
  }

  const filtered = modes.filter(
    (m) => m && typeof m === 'string' && m.trim() !== ''
  );
  return filtered;
}

export function hasFavoriteModes(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): boolean {
  return getFavoriteModes(hass, entityId).length > 0;
}

/** Опции избранного в виде элементов для ha-select (как getSelectOptions — версио-зависимо). */
export function getFavoriteModesAsSelectOptions(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): TemplateResult[] {
  const options = getFavoriteModes(hass, entityId);
  const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
  return options.map(
    (option) =>
      useHaDropdownItem
        ? html`<ha-dropdown-item value=${option}>${option}</ha-dropdown-item>`
        : html`<mwc-list-item value=${option}>${option}</mwc-list-item>`
  );
}

/** Маппинг суффиксов entity_id интеграции skycooker-ha на ключи конфига */
const ENTITY_SUFFIX_TO_CONFIG_KEY: Array<{
  domain: string;
  suffix: string;
  configKey: keyof import('./config').SkycookerConfig;
}> = [
  // Сенсоры (английские суффиксы + русская транслитерация)
  { domain: 'sensor', suffix: 'status', configKey: 'status_entity' },

  { domain: 'sensor', suffix: 'temperature', configKey: 'temperature_entity' },
  { domain: 'sensor', suffix: 'temperatura', configKey: 'temperature_entity' },

  { domain: 'sensor', suffix: 'remaining_time', configKey: 'remaining_time_entity' },
  { domain: 'sensor', suffix: 'ostavsheesia_vremia', configKey: 'remaining_time_entity' },

  // Общее время приготовления
  { domain: 'sensor', suffix: 'cooking_time', configKey: 'cooking_time_entity' },
  { domain: 'sensor', suffix: 'total_time', configKey: 'cooking_time_entity' },
  { domain: 'sensor', suffix: 'vremia_prigotovleniia', configKey: 'cooking_time_entity' },

  { domain: 'sensor', suffix: 'current_program', configKey: 'current_mode_entity' },
  { domain: 'sensor', suffix: 'tekushchii_rezhim', configKey: 'current_mode_entity' },

  { domain: 'sensor', suffix: 'subprogram', configKey: 'current_additional_mode_entity' },

  { domain: 'sensor', suffix: 'auto_warm_time', configKey: 'auto_warm_time_entity' },
  { domain: 'sensor', suffix: 'vremia_avtopodogreva', configKey: 'auto_warm_time_entity' },

  { domain: 'sensor', suffix: 'delayed_launch_time', configKey: 'delayed_launch_time_entity' },
  {
    domain: 'sensor',
    suffix: 'vremia_do_otlozhennogo_zapuska',
    configKey: 'delayed_launch_time_entity',
  },

  { domain: 'sensor', suffix: 'success_rate', configKey: 'success_rate_entity' },
  { domain: 'sensor', suffix: 'protsent_uspekha', configKey: 'success_rate_entity' },

  { domain: 'sensor', suffix: 'error_code', configKey: 'error_code_entity' },
  { domain: 'sensor', suffix: 'kod_oshibki', configKey: 'error_code_entity' },

  { domain: 'sensor', suffix: 'sound_enabled', configKey: 'sound_enabled_entity' },
  { domain: 'sensor', suffix: 'zvuk', configKey: 'sound_enabled_entity' },

  // Select-ы (режимы, время, избранное)
  { domain: 'select', suffix: 'program', configKey: 'mode_entity' },
  { domain: 'select', suffix: 'mode', configKey: 'mode_entity' },
  {
    domain: 'select',
    suffix: 'programma_prigotovleniia',
    configKey: 'mode_entity',
  },

  { domain: 'select', suffix: 'subprogram', configKey: 'additional_mode_entity' },
  // потенциально: podprogramma, если такое имя появится

  { domain: 'select', suffix: 'temperature', configKey: 'cooking_temperature_entity' },
  { domain: 'select', suffix: 'temperatura', configKey: 'cooking_temperature_entity' },

  {
    domain: 'select',
    suffix: 'cooking_time_hours',
    configKey: 'cooking_time_hours_entity',
  },
  {
    domain: 'select',
    suffix: 'vremia_prigotovleniia_chasy',
    configKey: 'cooking_time_hours_entity',
  },

  {
    domain: 'select',
    suffix: 'cooking_time_minutes',
    configKey: 'cooking_time_minutes_entity',
  },
  {
    domain: 'select',
    suffix: 'vremia_prigotovleniia_minuty',
    configKey: 'cooking_time_minutes_entity',
  },

  {
    domain: 'select',
    suffix: 'delayed_start_hours',
    configKey: 'delayed_start_hours_entity',
  },
  {
    domain: 'select',
    suffix: 'vremia_otlozhennogo_starta_chasy',
    configKey: 'delayed_start_hours_entity',
  },

  {
    domain: 'select',
    suffix: 'delayed_start_minutes',
    configKey: 'delayed_start_minutes_entity',
  },
  {
    domain: 'select',
    suffix: 'vremia_otlozhennogo_starta_minuty',
    configKey: 'delayed_start_minutes_entity',
  },

  { domain: 'select', suffix: 'favorites', configKey: 'favorite_modes_entity' },
  { domain: 'select', suffix: 'izbrannoe', configKey: 'favorite_modes_entity' },

  // Переключатель автоподогрева
  { domain: 'switch', suffix: 'auto_warm', configKey: 'auto_warm_entity' },
  { domain: 'switch', suffix: 'avtopodogrev', configKey: 'auto_warm_entity' },

  // Кнопки
  { domain: 'button', suffix: 'start', configKey: 'start_entity' },
  { domain: 'button', suffix: 'stop', configKey: 'stop_entity' },
  { domain: 'button', suffix: 'start_delayed', configKey: 'start_delayed_entity' },
  {
    domain: 'button',
    suffix: 'otlozhennyi_start',
    configKey: 'start_delayed_entity',
  },
];

export async function autoFillEntitiesByDevice(
  hass: HomeAssistant | undefined,
  seedEntityId: string
): Promise<Partial<Record<keyof import('./config').SkycookerConfig, string>>> {
  if (!hass || !seedEntityId) return {};

  const result: Partial<Record<keyof import('./config').SkycookerConfig, string>> =
    {};

  const callWS = (hass as any).callWS?.bind(hass);

  if (callWS) {
    try {
      const entityRegistry: any[] = await callWS({
        type: 'config/entity_registry/list',
      });

      const seedEntry = entityRegistry.find(
        (entry) => entry.entity_id === seedEntityId
      );
      const deviceId = seedEntry?.device_id;

      if (deviceId) {
        const sameDeviceEntries = entityRegistry.filter(
          (entry) => entry.device_id === deviceId
        );

        for (const entry of sameDeviceEntries) {
          const entityId = entry.entity_id as string;
          const [domain, objId] = entityId.split('.');
          if (!domain || !objId) continue;

          for (const {
            domain: expectedDomain,
            suffix,
            configKey,
          } of ENTITY_SUFFIX_TO_CONFIG_KEY) {
            if (domain !== expectedDomain) continue;
            if (!objId.endsWith(`_${suffix}`)) continue;
            if (result[configKey]) continue;

            result[configKey] = entityId;
            break;
          }
        }
      }
    } catch (_err) {
      // Молча откатываемся к префиксной логике ниже
    }
  }

  // Фолбэк: старая логика по префиксу object_id,
  // если через device_id ничего не нашли.
  if (Object.keys(result).length === 0) {
    const parts = seedEntityId.split('.');
    if (parts.length !== 2) return {};
    const objectId = parts[1];
    let prefix = '';
    for (const { suffix } of ENTITY_SUFFIX_TO_CONFIG_KEY) {
      const suffixWithUnderscore = '_' + suffix;
      if (objectId.endsWith(suffixWithUnderscore)) {
        prefix = objectId.slice(0, -suffixWithUnderscore.length);
        break;
      }
    }
    if (!prefix) return {};

    const prefixMatch = prefix + '_';
    for (const entityId of Object.keys(hass.states)) {
      const [domain, objId] = entityId.split('.');
      if (!objId?.startsWith(prefixMatch)) continue;
      for (const {
        domain: d,
        suffix,
        configKey,
      } of ENTITY_SUFFIX_TO_CONFIG_KEY) {
        if (domain === d && objId === prefixMatch + suffix) {
          result[configKey] = entityId;
          break;
        }
      }
    }
  }

  return result;
}
