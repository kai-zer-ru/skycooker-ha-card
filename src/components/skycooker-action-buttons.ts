import { html, type TemplateResult } from 'lit';
import type { SkycookerConfig } from '../config';

export function renderSkyCookerActionButtons(
  config: SkycookerConfig,
  t: (key: string) => string,
  onButtonPress: (entityId: string) => void
): TemplateResult {
  return html`
    <div class="new-action-buttons">
      ${config.start_entity
        ? html`
            <div class="new-action-button-wrapper">
              <ha-button
                @click=${() => onButtonPress(config.start_entity)}
                class="new-action-button"
              >
                <ha-icon icon="mdi:play"></ha-icon>
              </ha-button>
              <span class="new-action-button-label">${t('start')}</span>
            </div>
          `
        : ''}
      ${config.stop_entity
        ? html`
            <div class="new-action-button-wrapper">
              <ha-button
                @click=${() => onButtonPress(config.stop_entity)}
                class="new-action-button"
              >
                <ha-icon icon="mdi:stop"></ha-icon>
              </ha-button>
              <span class="new-action-button-label">${t('stop')}</span>
            </div>
          `
        : ''}
      ${config.start_delayed_entity
        ? html`
            <div class="new-action-button-wrapper">
              <ha-button
                @click=${() => onButtonPress(config.start_delayed_entity)}
                class="new-action-button"
              >
                <ha-icon icon="mdi:timer-play"></ha-icon>
              </ha-button>
              <span class="new-action-button-label">${t('start_delayed')}</span>
            </div>
          `
        : ''}
    </div>
  `;
}
