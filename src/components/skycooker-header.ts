import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import { isStatusOff } from '../status-utils';

export function renderSkyCookerHeader(
  config: SkycookerConfig,
  hass: HomeAssistant | undefined,
  statusEntityId: string | undefined
): TemplateResult {
  const statusState =
    statusEntityId && hass ? hass.states[statusEntityId]?.state ?? '' : '';
  const isOff = isStatusOff(statusState);
  const isActive = statusState && !isOff;

  return html`
    <div class="new-header">
      <div class="new-icon">
        <ha-icon .icon=${config.icon || 'mdi:stove'}></ha-icon>
      </div>
      <div class="new-summary">
        <div class="new-name">${config.name || 'SkyCooker'}</div>
      </div>
      <div class="new-status-indicator">
        ${isActive
          ? html`<ha-icon
              icon="mdi:circle"
              style="color: var(--success-color);"
            ></ha-icon>`
          : isOff
            ? html`<ha-icon
                icon="mdi:circle"
                style="color: var(--error-color);"
              ></ha-icon>`
            : ''}
      </div>
    </div>
  `;
}
