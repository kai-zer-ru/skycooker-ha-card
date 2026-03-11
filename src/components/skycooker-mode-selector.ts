import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import {
  getEntityState,
  getFavoriteModesAsSelectOptions,
  hasFavoriteModes,
  getSelectOptions,
} from '../entity-utils';

export interface ModeSelectorParams {
  config: SkycookerConfig;
  hass: HomeAssistant | undefined;
  t: (key: string) => string;
  getSelectedTime: () => string;
  /** When false, hide the "current_mode | status" line (used in new design). Default true. */
  showCurrentStatusLine?: boolean;
}

export function renderSkyCookerModeSelector(params: ModeSelectorParams): TemplateResult {
  const {
    config,
    hass,
    t,
    getSelectedTime,
    showCurrentStatusLine = true,
  } = params;

  const getEntityStateLocal = (entityId: string | undefined) =>
    entityId ? getEntityState(hass, entityId) : '';

  return html`
    <div class="new-control-group">
      <div class="new-mode-selector">
        ${showCurrentStatusLine
          ? html`
              <div class="new-mode-label" style="text-align: center;">
                ${t('current_mode')}: ${getEntityStateLocal(config.current_mode_entity)} |
                ${t('status')}: ${getEntityStateLocal(config.status_entity)}
              </div>
            `
          : ''}
        ${config.mode_entity
          ? html`<div class="new-selected-mode">
              ${t('selected_mode')}:
              <span class="selected-mode-text">
                ${getEntityStateLocal(config.mode_entity) || '-----'}
              </span>
            </div>`
          : ''}
        <div class="new-selected-time">
          ${t('selected_time')}: <span class="selected-time-text">${getSelectedTime() || '-----'}</span>
        </div>

        ${config.favorite_modes_entity &&
        config.mode_entity &&
        hasFavoriteModes(hass, config.favorite_modes_entity)
          ? html`
              <div class="new-mode-select">
                <div class="new-control-label">
                  ${t('favorite_modes')}
                </div>
                <ha-select
                  style="width: 100%;"
                  .value=${getEntityStateLocal(config.mode_entity)}
                  @selected=${(ev: CustomEvent) => {
                    // eslint-disable-next-line no-console
                    console.log('[SkyCooker Card] favorite select @selected', {
                      entityId: config.mode_entity,
                      detail: (ev as any).detail,
                      targetValue: (ev.target as any)?.value,
                    });
                    (params as any).onSelectChange?.(
                      config.mode_entity,
                      ev
                    );
                  }}
                  @closed=${(ev: Event) => ev.stopPropagation()}
                >
                  ${getFavoriteModesAsSelectOptions(
                    hass,
                    config.favorite_modes_entity
                  )}
                </ha-select>
              </div>
            `
          : ''}

        ${config.mode_entity
          ? html`
              <div class="new-mode-select">
                <div class="new-control-label">
                  ${t('mode')}
                </div>
                <ha-select
                  style="width: 100%;"
                  .value=${getEntityStateLocal(config.mode_entity)}
                  @selected=${(ev: CustomEvent) => {
                    // eslint-disable-next-line no-console
                    console.log('[SkyCooker Card] mode select @selected', {
                      entityId: config.mode_entity,
                      detail: (ev as any).detail,
                      targetValue: (ev.target as any)?.value,
                    });
                    (params as any).onSelectChange?.(config.mode_entity, ev);
                  }}
                  @closed=${(ev: Event) => ev.stopPropagation()}
                >
                  ${getSelectOptions(hass, config.mode_entity)}
                </ha-select>
              </div>
            `
          : ''}
      </div>
    </div>
  `;
}
