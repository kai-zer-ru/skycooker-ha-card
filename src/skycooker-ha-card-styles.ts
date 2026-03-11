import { css, CSSResult } from 'lit';

export const skycookerCardStyles: CSSResult = css`
  :host {
    /* Размеры и отступы (fallback без Mush) */
    --skycooker-spacing: 10px;
    --skycooker-control-radius: 12px;
    --skycooker-chip-radius: 19px;
    --skycooker-chip-height: 36px;
    --skycooker-icon-radius: 50%;
    --skycooker-icon-size: 36px;
    --skycooker-control-height: 42px;
    font-family: var(--mdc-typography-font-family, inherit);
    /* Цвета только из темы HA */
    --skycooker-bg: var(--card-background-color);
    --skycooker-border: var(--divider-color);
    --skycooker-text: var(--primary-text-color);
    --skycooker-text-secondary: var(--secondary-text-color);
    --skycooker-accent: var(--primary-color);
    --skycooker-accent-text: var(--primary-inverse-color, var(--text-primary-color, inherit));
    --skycooker-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.08));
  }

  ha-card {
    padding: 16px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 10px 0;
    border-bottom: 1px solid var(--skycooker-border);
  }
  .header .icon {
    font-size: 48px;
    color: var(--skycooker-accent);
  }
  .header .summary {
    display: flex;
    flex-direction: column;
  }
  .header .name {
    font-size: 24px;
    font-weight: bold;
  }
  .header .state {
    font-size: 14px;
    color: var(--skycooker-text-secondary);
  }
  ha-button {
    --mdc-theme-primary: var(--skycooker-accent);
    --mdc-theme-secondary: var(--skycooker-text-secondary);
  }
  .setup-message {
    padding: 20px;
    text-align: center;
    color: var(--skycooker-text-secondary);
    font-size: 16px;
  }

  ha-card.new-design {
    padding: 12px;
    gap: 12px;
    background: var(--skycooker-bg);
    border-radius: var(--ha-card-border-radius, 16px);
    box-shadow: var(--skycooker-shadow);
    overflow: hidden;
  }

  ha-card.new-design.new-design-v2 {
    gap: 14px;
  }

  .new-design-v2 .new-controls-grid {
    margin-top: 2px;
  }

  /* Заголовок: рамка с отступом от края, как у остальных блоков */
  .new-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background: var(--skycooker-bg);
    border: 1px solid var(--skycooker-border);
    border-radius: var(--skycooker-control-radius);
    color: var(--skycooker-text);
  }

  .new-icon {
    width: var(--skycooker-icon-size);
    height: var(--skycooker-icon-size);
    min-width: var(--skycooker-icon-size);
    min-height: var(--skycooker-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: var(--skycooker-icon-radius);
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.08));
    color: var(--skycooker-accent);
  }

  .new-icon ha-icon {
    width: calc(var(--skycooker-icon-size) - 8px);
    height: calc(var(--skycooker-icon-size) - 8px);
  }

  .new-summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .new-name {
    font-size: var(--title-font-size, 24px);
    font-weight: 600;
    font-family: inherit;
    color: var(--skycooker-text);
  }

  .new-header-status-text {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
    margin-top: 4px;
  }

  .new-state {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
  }

  .new-status-indicator {
    font-size: 20px;
  }

  .new-status-indicator .status-active {
    color: var(--state-icon-active-color, var(--success-color, var(--skycooker-accent)));
  }

  .new-status-indicator .status-off {
    color: var(--state-icon-inactive-color, var(--error-color, var(--skycooker-text-secondary)));
  }

  .new-controls-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .new-control-group {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
    border: 1px solid var(--skycooker-border);
  }

  .new-control-item {
    display: flex;
    align-items: center;
    gap: var(--skycooker-spacing);
  }

  .new-control-icon {
    font-size: 20px;
    color: var(--skycooker-accent);
  }

  .new-control-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .new-control-label {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
  }

  .new-control-value {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
  }

  .new-mode-selector {
    display: flex;
    flex-direction: column;
    gap: 0px;
    border: none;
    background: none;
    padding: 0;
  }

  .new-mode-label {
    font-size: var(--card-secondary-font-size, 12px);
    font-weight: 500;
  }

  .new-selected-mode {
    font-size: var(--card-primary-font-size, 14px);
    color: var(--skycooker-text-secondary);
    text-align: center;
    font-family: inherit;
    font-weight: 500;
  }

  .selected-mode-text {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    color: var(--skycooker-accent);
    margin-left: 4px;
    font-family: inherit;
  }

  .new-selected-time {
    font-size: var(--card-primary-font-size, 14px);
    color: var(--skycooker-text-secondary);
    text-align: center;
    min-height: 20px;
    font-family: inherit;
    font-weight: 500;
  }

  .selected-time-text {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    color: var(--skycooker-accent);
    margin-left: 4px;
    font-family: inherit;
  }

  .new-mode-select {
    margin-top: var(--skycooker-spacing);
  }


  /* Стандартные ha-button: только контейнер, без кастомного вида кнопок */
  .new-action-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
  }

  .new-action-buttons ha-button {
    --mdc-theme-primary: var(--skycooker-accent);
  }

  .new-additional-controls {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
    margin-top: 4px;
  }

  .new-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .new-section-header ha-icon {
    font-size: 20px;
  }

  .new-section-header span {
    flex: 1;
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
  }

  .new-expand-icon {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  .new-additional-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0;
    border-top: 1px solid var(--skycooker-border);
  }

  .new-auto-warm-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
    margin-bottom: var(--skycooker-spacing);
  }

  .new-auto-warm-header {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }

  .new-auto-warm-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
    text-align: center;
  }

  .new-temperature-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: 0;
    margin: var(--skycooker-spacing) 0 0 0;
    width: 100%;
    box-sizing: border-box;
  }

  .new-temperature-header {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .new-temperature-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
    text-align: center;
  }

  .new-temperature-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0;
  }

  .new-temperature-select-container {
    display: flex;
    justify-content: center;
    padding-left: 0;
    width: 100%;
  }

  .new-temperature-hidden-select {
    width: 100%;
    min-width: 120px;
    max-width: 180px;
    --mdc-theme-primary: var(--skycooker-accent);
    --mdc-shape-small: var(--skycooker-control-radius);
    --mdc-menu-min-width: 120px;
    height: var(--skycooker-control-height);
    border-radius: var(--skycooker-control-radius);
    box-shadow: var(--skycooker-shadow);
  }

  .new-cooking-time-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: 0;
    margin: var(--skycooker-spacing) 0 0 0;
    width: 100%;
    box-sizing: border-box;
  }

  .new-cooking-time-header {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .new-cooking-time-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
    text-align: center;
  }

  .new-cooking-time-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    padding-left: 0;
  }

  .entity-rows-column {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .entity-rows-column hui-generic-entity-row {
    display: block;
    width: 100%;
  }

  /* В дополнительных настройках скрываем текстовые подписи у entity-row,
     чтобы визуально оставались только стандартные селекты HA */
  .entity-rows-column hui-generic-entity-row .info {
    display: none;
  }

  .new-time-unit {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
  }

  .new-auto-warm-time {
    padding-left: 30px;
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
  }

  .new-time-sensors-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .new-time-sensors-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  .new-time-sensors-row:only-child {
    justify-content: center;
  }

  .new-time-sensors-row:nth-child(1):only-child + .new-time-sensors-row {
    display: none;
  }

  .new-time-sensors-row:nth-child(1):has(.new-control-item:nth-child(2)) + .new-time-sensors-row:has(.new-control-item:only-child) {
    justify-content: center;
  }

  .new-time-sensors-row:nth-child(1):has(.new-control-item:nth-child(2)) + .new-time-sensors-row:has(.new-control-item:nth-child(2)) {
    justify-content: flex-start;
  }

  .new-control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .new-control-icon-value {
    display: flex;
    align-items: center;
    gap: 8px;
  }

`;
