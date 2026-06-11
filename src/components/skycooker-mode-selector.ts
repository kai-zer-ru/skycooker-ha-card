import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import {
  getEntityState,
  getFavoriteModesAsSelectOptions,
  hasFavoriteModes,
  getSelectOptions,
} from '../entity-utils';
import type { CardDesign } from './skycooker-header';

export interface ModeSelectorParams {
  config: SkycookerConfig;
  hass: HomeAssistant | undefined;
  t: (key: string) => string;
  getSelectedTime: () => string;
  /** When false, hide the "current_mode | status" line (used in new design). Default true. */
  showCurrentStatusLine?: boolean;
  design?: CardDesign;
  onSelectChange?: (entityId: string, ev: Event) => void;
}

export function renderSkyCookerModeSelector(params: ModeSelectorParams): TemplateResult {
  const {
    config,
    hass,
    t,
    getSelectedTime,
    showCurrentStatusLine = true,
    design = 'classic',
  } = params;

  const getEntityStateLocal = (entityId: string | undefined) =>
    entityId ? getEntityState(hass, entityId) : '';

  const groupClass =
    design === 'modern'
      ? 'new-control-group modern-program-panel'
      : 'new-control-group';
  const selectorClass =
    design === 'modern' ? 'new-mode-selector modern-mode-selector' : 'new-mode-selector';
  const summaryClass =
    design === 'modern' ? 'modern-selection-summary' : 'classic-selection-summary';

  return html`
    <div class="${groupClass}">
      <div class="${selectorClass}">
        <div class="${summaryClass}">
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
          ${t('selected_time')}:
          <span class="selected-time-text">${getSelectedTime() || '-----'}</span>
        </div>
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
                    params.onSelectChange?.(config.mode_entity, ev);
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
                    params.onSelectChange?.(config.mode_entity, ev);
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
