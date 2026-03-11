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
            <ha-button
              @click=${() => onButtonPress(config.start_entity)}
            >
              <ha-icon icon="mdi:play"></ha-icon>
              ${t('start')}
            </ha-button>
          `
        : ''}
      ${config.stop_entity
        ? html`
            <ha-button
              @click=${() => onButtonPress(config.stop_entity)}
            >
              <ha-icon icon="mdi:stop"></ha-icon>
              ${t('stop')}
            </ha-button>
          `
        : ''}
    </div>
  `;
}
