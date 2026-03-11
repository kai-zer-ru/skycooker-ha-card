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

  const successRate =
    config.success_rate_entity && hass
      ? getEntityState(hass, config.success_rate_entity)
      : '';
  const errorCode =
    config.error_code_entity && hass
      ? getEntityState(hass, config.error_code_entity)
      : '';
  const soundEnabledRaw =
    config.sound_enabled_entity && hass
      ? getEntityState(hass, config.sound_enabled_entity)
      : '';

  const hasSuccessRate =
    successRate !== '' && successRate !== 'N/A' && successRate !== 'unknown';
  const hasErrorCode =
    errorCode !== '' &&
    errorCode !== 'N/A' &&
    errorCode !== 'unknown' &&
    errorCode !== '0';
  const hasSoundEnabled =
    soundEnabledRaw !== '' && soundEnabledRaw !== 'N/A' && soundEnabledRaw !== 'unknown';

  const soundEnabled =
    soundEnabledRaw === 'on' ||
    soundEnabledRaw === 'true' ||
    soundEnabledRaw === 'True';

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
        ${hasSuccessRate || hasErrorCode || hasSoundEnabled
          ? html`
              <div class="new-time-sensors-row">
                ${hasSuccessRate
                  ? html`
                      <div class="new-control-item">
                        <div class="new-control-label">
                          ${t('success_rate')}
                        </div>
                        <div class="new-control-icon-value">
                          <ha-icon
                            icon="mdi:bluetooth-connect"
                            class="new-control-icon"
                          ></ha-icon>
                          <div class="new-control-value">
                            ${successRate}%
                          </div>
                        </div>
                      </div>
                    `
                  : ''}
                ${hasErrorCode
                  ? html`
                      <div class="new-control-item">
                        <div class="new-control-label">${t('error_code')}</div>
                        <div class="new-control-icon-value">
                          <ha-icon
                            icon="mdi:alert-circle"
                            class="new-control-icon"
                          ></ha-icon>
                          <div class="new-control-value">
                            ${errorCode}
                          </div>
                        </div>
                      </div>
                    `
                  : ''}
                ${hasSoundEnabled
                  ? html`
                      <div class="new-control-item">
                        <div class="new-control-label">
                          ${t('sound_enabled')}
                        </div>
                        <div class="new-control-icon-value">
                          <ha-icon
                            icon=${soundEnabled
                              ? 'mdi:volume-high'
                              : 'mdi:volume-off'}
                            class="new-control-icon"
                          ></ha-icon>
                          <div class="new-control-value">
                            ${soundEnabled ? t('sound_on') : t('sound_off')}
                          </div>
                        </div>
                      </div>
                    `
                  : ''}
              </div>
            `
          : ''}
      </div>
    </div>
  `;
}
