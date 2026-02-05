import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import { getEntityState } from '../entity-utils';
import {
  shouldShowTemperature,
  shouldShowAutoWarmTime,
  shouldShowDelayedLaunchTime,
} from '../status-utils';

export function renderSkyCookerStatusBlock(
  config: SkycookerConfig,
  hass: HomeAssistant | undefined,
  t: (key: string) => string
): TemplateResult {
  const temperatureEntity =
    config.cooking_temperature_entity || config.temperature_entity;
  const showTemp = shouldShowTemperature(
    getEntityState(hass, config.current_mode_entity),
    getEntityState(hass, config.status_entity)
  );
  const showAutoWarmTime = shouldShowAutoWarmTime(
    getEntityState(hass, config.status_entity),
    !!config.auto_warm_time_entity
  );
  const showDelayedLaunchTime = shouldShowDelayedLaunchTime(
    getEntityState(hass, config.status_entity),
    !!config.delayed_launch_time_entity
  );

  return html`
    <div class="new-control-group">
      ${showTemp && temperatureEntity
        ? html`
            <div class="new-control-item">
              <ha-icon icon="mdi:thermometer" class="new-control-icon"></ha-icon>
              <div class="new-control-content">
                <div class="new-control-label">${t('temperature')}</div>
                <div class="new-control-value">
                  ${getEntityState(hass, temperatureEntity)}°C
                </div>
              </div>
            </div>
          `
        : ''}
      <div class="new-time-sensors-container">
        <div class="new-time-sensors-row">
          <div class="new-control-item">
            <div class="new-control-label">${t('remaining')}</div>
            <div class="new-control-icon-value">
              <ha-icon icon="mdi:timer" class="new-control-icon"></ha-icon>
              <div class="new-control-value">
                ${getEntityState(hass, config.remaining_time_entity)}
              </div>
            </div>
          </div>
          <div class="new-control-item">
            <div class="new-control-label">${t('cooking_time_label')}</div>
            <div class="new-control-icon-value">
              <ha-icon icon="mdi:clock" class="new-control-icon"></ha-icon>
              <div class="new-control-value">
                ${getEntityState(hass, config.cooking_time_entity)}
              </div>
            </div>
          </div>
        </div>
        <div class="new-time-sensors-row">
          ${showAutoWarmTime && config.auto_warm_time_entity
            ? html`
                <div class="new-control-item">
                  <div class="new-control-label">${t('auto_warm_time')}</div>
                  <div class="new-control-icon-value">
                    <ha-icon
                      icon="mdi:clock-start"
                      class="new-control-icon"
                    ></ha-icon>
                    <div class="new-control-value">
                      ${getEntityState(hass, config.auto_warm_time_entity)}
                    </div>
                  </div>
                </div>
              `
            : ''}
          ${showDelayedLaunchTime && config.delayed_launch_time_entity
            ? html`
                <div class="new-control-item">
                  <div class="new-control-label">${t('delayed_launch')}</div>
                  <div class="new-control-icon-value">
                    <ha-icon
                      icon="mdi:timer-sand"
                      class="new-control-icon"
                    ></ha-icon>
                    <div class="new-control-value">
                      ${getEntityState(hass, config.delayed_launch_time_entity)}
                    </div>
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    </div>
  `;
}
