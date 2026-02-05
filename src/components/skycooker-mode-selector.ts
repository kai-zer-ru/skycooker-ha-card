import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import {
  getEntityState,
  getEntityOptions,
  getFavoriteModes,
  hasFavoriteModes,
} from '../entity-utils';
import { getModeIcon } from '../mode-icons';

export interface ModeSelectorParams {
  config: SkycookerConfig;
  hass: HomeAssistant | undefined;
  t: (key: string) => string;
  selectedMode: 'favorite' | 'all';
  selectedModeName: string;
  onShowFavorite: () => void;
  onShowAll: () => void;
  onModeClick: (entityId: string, option: string) => void;
  getSelectedTime: () => string;
}

export function renderSkyCookerModeSelector(params: ModeSelectorParams): TemplateResult {
  const {
    config,
    hass,
    t,
    selectedMode,
    selectedModeName,
    onShowFavorite,
    onShowAll,
    onModeClick,
    getSelectedTime,
  } = params;

  const getEntityStateLocal = (entityId: string) =>
    getEntityState(hass, entityId);

  const getModeButtons = (entityId: string) => {
    const options = getEntityOptions(hass, entityId);
    return options.map((option) => html`
      <div class="new-mode-button-wrapper">
        <ha-button
          class="new-mode-button"
          @click=${() => onModeClick(entityId, option)}
        >
          <ha-icon icon="${getModeIcon(option)}" class="mode-button-icon"></ha-icon>
          <span class="mode-button-text">${option}</span>
        </ha-button>
      </div>
    `);
  };

  const getFavoriteModeButtons = (entityId: string) => {
    const options = getFavoriteModes(hass, config?.favorite_modes_entity);
    return options.map((option) => html`
      <div class="new-mode-button-wrapper">
        <ha-button
          class="new-mode-button"
          @click=${() => onModeClick(entityId, option)}
        >
          <ha-icon icon="${getModeIcon(option)}" class="mode-button-icon"></ha-icon>
          <span class="mode-button-text">${option}</span>
        </ha-button>
      </div>
    `);
  };

  return html`
    <div class="new-control-group">
      <div class="new-mode-selector">
        <div class="new-mode-label" style="text-align: center;">
          ${t('current_mode')}: ${getEntityStateLocal(config.current_mode_entity)} |
          ${t('status')}: ${getEntityStateLocal(config.status_entity)}
        </div>
        <div class="new-selected-mode">
          ${t('selected_mode')}: <span class="selected-mode-text">${selectedModeName || '-----'}</span>
        </div>
        <div class="new-selected-time">
          ${t('selected_time')}: <span class="selected-time-text">${getSelectedTime() || '-----'}</span>
        </div>

        ${config.mode_entity ? html`
          ${hasFavoriteModes(hass, config?.favorite_modes_entity) ? html`
            <div class="new-mode-tabs">
              <div class="new-mode-tab ${selectedMode === 'favorite' ? 'active' : ''}" @click=${onShowFavorite}>
                ${t('favorite_modes')}
              </div>
              <div class="new-mode-tab ${selectedMode === 'all' ? 'active' : ''}" @click=${onShowAll}>
                ${t('all_modes')}
              </div>
            </div>
          ` : ''}

          <div class="new-mode-buttons">
            ${selectedMode === 'favorite'
              ? getFavoriteModeButtons(config.mode_entity)
              : getModeButtons(config.mode_entity)}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
