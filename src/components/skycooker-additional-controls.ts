import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import {
  getEntityState,
  getSelectOptions,
  getSubprogramSelectOptions,
  getTemperatureOptionsWithFallback,
} from '../entity-utils';

export function renderSkyCookerAdditionalControls(
  config: SkycookerConfig,
  hass: HomeAssistant | undefined,
  t: (key: string) => string,
  expanded: boolean,
  onToggle: () => void,
  onSelectChange: (entityId: string, ev: Event) => void,
  onSwitchChange: (entityId: string, checked: boolean) => void
): TemplateResult {
  const temperatureEntity =
    config.cooking_temperature_entity || config.temperature_entity;

  return html`
    <div class="new-additional-controls">
      <div class="new-section-header" @click=${onToggle}>
        <ha-icon icon="mdi:cog"></ha-icon>
        <span>${t('additional_settings')}</span>
        <ha-icon
          .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          class="new-expand-icon"
        ></ha-icon>
      </div>
      <div
        class="new-additional-content"
        style="display: ${expanded ? 'block' : 'none'};"
      >
        ${config.additional_mode_entity
          ? html`
              <div class="new-cooking-time-section">
                <div class="new-cooking-time-header">
                  <ha-icon icon="mdi:cog-outline"></ha-icon>
                  <span class="new-cooking-time-label"
                    >${t('additional_mode')}</span
                  >
                </div>
                <div class="new-cooking-time-controls">
                  <ha-select
                    .value=${getEntityState(
                      hass,
                      config.additional_mode_entity
                    )}
                    @selected=${(ev: Event) =>
                      onSelectChange(config.additional_mode_entity, ev)}
                    @closed=${(ev: Event) => ev.stopPropagation()}
                  >
                    ${getSubprogramSelectOptions(
                      hass,
                      config.additional_mode_entity
                    )}
                  </ha-select>
                </div>
              </div>
            `
          : ''}
        ${config.auto_warm_entity
          ? html`
              <div class="new-auto-warm-section">
                <div class="new-auto-warm-header">
                  <ha-icon icon="mdi:heat-wave"></ha-icon>
                  <span class="new-auto-warm-label">${t('auto_warm')}</span>
                  <ha-switch
                    .checked=${getEntityState(hass, config.auto_warm_entity) ===
                    'on'}
                    @change=${(ev: Event) =>
                      onSwitchChange(
                        config.auto_warm_entity,
                        (ev.target as HTMLInputElement).checked
                      )}
                  ></ha-switch>
                </div>
              </div>
            `
          : ''}
        ${temperatureEntity
          ? html`
              <div class="new-temperature-section">
                <div class="new-temperature-header">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <span class="new-temperature-label">${t('temperature')}</span>
                </div>
                <div class="new-temperature-select-container">
                  <ha-select
                    class="new-temperature-hidden-select"
                    .value=${getEntityState(hass, temperatureEntity)}
                    @selected=${(ev: Event) =>
                      onSelectChange(temperatureEntity, ev)}
                    @closed=${(ev: Event) => ev.stopPropagation()}
                  >
                    ${getTemperatureOptionsWithFallback(hass, temperatureEntity)}
                  </ha-select>
                </div>
              </div>
            `
          : ''}
        ${config.cooking_time_hours_entity &&
        config.cooking_time_minutes_entity
          ? html`
              <div class="new-cooking-time-section">
                <div class="new-cooking-time-header">
                  <ha-icon icon="mdi:clock"></ha-icon>
                  <span class="new-cooking-time-label"
                    >${t('cooking_time_label')}</span
                  >
                </div>
                <div class="new-cooking-time-controls">
                  <ha-select
                    .value=${getEntityState(
                      hass,
                      config.cooking_time_hours_entity
                    )}
                    @selected=${(ev: Event) =>
                      onSelectChange(config.cooking_time_hours_entity, ev)}
                    @closed=${(ev: Event) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(
                      hass,
                      config.cooking_time_hours_entity
                    )}
                  </ha-select>
                  <span class="new-time-unit"> ${t('hours')} </span>
                  <ha-select
                    .value=${getEntityState(
                      hass,
                      config.cooking_time_minutes_entity
                    )}
                    @selected=${(ev: Event) =>
                      onSelectChange(config.cooking_time_minutes_entity, ev)}
                    @closed=${(ev: Event) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(
                      hass,
                      config.cooking_time_minutes_entity
                    )}
                  </ha-select>
                  <span class="new-time-unit"> ${t('minutes')}</span>
                </div>
              </div>
            `
          : ''}
        ${config.delayed_start_hours_entity &&
        config.delayed_start_minutes_entity
          ? html`
              <div class="new-cooking-time-section">
                <div class="new-cooking-time-header">
                  <ha-icon icon="mdi:timer-sand"></ha-icon>
                  <span class="new-cooking-time-label"
                    >${t('delayed_start')}</span
                  >
                </div>
                <div class="new-cooking-time-controls">
                  <ha-select
                    .value=${getEntityState(
                      hass,
                      config.delayed_start_hours_entity
                    )}
                    @selected=${(ev: Event) =>
                      onSelectChange(
                        config.delayed_start_hours_entity,
                        ev
                      )}
                    @closed=${(ev: Event) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(
                      hass,
                      config.delayed_start_hours_entity
                    )}
                  </ha-select>
                  <span class="new-time-unit"> ${t('hours')} </span>
                  <ha-select
                    .value=${getEntityState(
                      hass,
                      config.delayed_start_minutes_entity
                    )}
                    @selected=${(ev: Event) =>
                      onSelectChange(
                        config.delayed_start_minutes_entity,
                        ev
                      )}
                    @closed=${(ev: Event) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(
                      hass,
                      config.delayed_start_minutes_entity
                    )}
                  </ha-select>
                  <span class="new-time-unit"> ${t('minutes')}</span>
                </div>
              </div>
            `
          : ''}
      </div>
    </div>
  `;
}
