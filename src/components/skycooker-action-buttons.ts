import { html, type TemplateResult } from 'lit';
import type { SkycookerConfig } from '../config';
import type { CardDesign } from './skycooker-header';

export function renderSkyCookerActionButtons(
  config: SkycookerConfig,
  t: (key: string) => string,
  onButtonPress: (entityId: string) => void,
  design: CardDesign = 'classic'
): TemplateResult {
  const buttonsClass =
    design === 'modern'
      ? 'new-action-buttons modern-action-bar'
      : 'new-action-buttons';

  return html`
    <div class="${buttonsClass}">
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
