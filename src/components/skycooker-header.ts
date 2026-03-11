import { html, type TemplateResult } from 'lit';
import type { HomeAssistant } from '../types';
import type { SkycookerConfig } from '../config';
import { isStatusOff } from '../status-utils';

export function renderSkyCookerHeader(
  config: SkycookerConfig,
  hass: HomeAssistant | undefined,
  statusEntityId: string | undefined,
  showStatusText?: boolean
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
        ${showStatusText && statusState
          ? html`<div class="new-header-status-text">${statusState}</div>`
          : ''}
      </div>
      <div class="new-status-indicator">
        ${isActive
          ? html`<ha-icon
              icon="mdi:circle"
              class="status-active"
            ></ha-icon>`
          : isOff
            ? html`<ha-icon
                icon="mdi:circle"
                class="status-off"
              ></ha-icon>`
            : ''}
      </div>
    </div>
  `;
}
