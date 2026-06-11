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

  ha-card.design-classic {
    padding: 12px;
    gap: 14px;
    background: var(--skycooker-bg);
    border-radius: var(--ha-card-border-radius, 16px);
    box-shadow: var(--skycooker-shadow);
    overflow: hidden;
  }

  .design-classic .new-controls-grid {
    margin-top: 2px;
  }

  .design-classic .classic-selection-summary {
    display: contents;
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
    display: none;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0;
    border-top: 1px solid var(--skycooker-border);
  }

  .new-additional-content.is-expanded {
    display: flex;
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

  /* ——— Современный дизайн ——— */
  ha-card.design-modern {
    padding: 18px 20px;
    gap: 18px;
    background: var(--skycooker-bg);
    border-radius: var(--ha-card-border-radius, 20px);
    box-shadow: var(--skycooker-shadow);
    overflow: hidden;
  }

  .design-modern .modern-header {
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 0;
    border: none;
    background: transparent;
  }

  .design-modern .modern-header .new-icon {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--skycooker-accent) 14%, transparent);
  }

  .design-modern .modern-header .new-summary {
    flex: 1;
    align-items: flex-start;
    text-align: left;
  }

  .design-modern .modern-header .new-name {
    font-size: 1.15rem;
    line-height: 1.2;
  }

  .design-modern .modern-header .new-header-status-text {
    margin-top: 2px;
    font-size: 0.82rem;
  }

  .design-modern .modern-header .new-status-indicator {
    margin-left: auto;
    flex-shrink: 0;
  }

  .design-modern .modern-metrics-panel {
    border: none;
    padding: 0;
    background: transparent;
    gap: 10px;
  }

  .design-modern .modern-metric-featured {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--skycooker-accent) 10%, var(--secondary-background-color, transparent));
  }

  .design-modern .modern-metric-featured .new-control-value {
    font-size: 1.35rem;
    font-weight: 600;
  }

  .design-modern .modern-metrics-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .design-modern .modern-metrics-grid .new-time-sensors-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 8px;
    justify-content: stretch;
  }

  .design-modern .modern-metric {
    align-items: flex-start;
    gap: 6px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.08));
  }

  .design-modern .modern-metric .new-control-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    opacity: 0.85;
  }

  .design-modern .modern-metric .new-control-icon-value {
    width: 100%;
    justify-content: flex-start;
  }

  .design-modern .modern-metric .new-control-value {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .design-modern .modern-program-panel {
    border: none;
    padding: 0;
    background: transparent;
    gap: 12px;
  }

  .design-modern .modern-selection-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 4px;
  }

  .design-modern .modern-selection-summary .new-selected-mode,
  .design-modern .modern-selection-summary .new-selected-time {
    text-align: left;
    margin: 0;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.08));
    font-size: 0.82rem;
    line-height: 1.35;
  }

  .design-modern .modern-selection-summary .selected-mode-text,
  .design-modern .modern-selection-summary .selected-time-text {
    display: block;
    margin: 4px 0 0;
    font-size: 0.98rem;
  }

  .design-modern .modern-mode-selector .new-mode-select {
    margin-top: 10px;
  }

  .design-modern .modern-mode-selector .new-control-label {
    margin-bottom: 4px;
    font-weight: 500;
  }

  .design-modern .modern-action-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0;
    border: none;
    background: transparent;
  }

  .design-modern .modern-action-bar ha-button {
    width: 100%;
    --mdc-theme-primary: var(--skycooker-accent);
  }

  .design-modern .modern-settings-panel {
    margin-top: 2px;
    padding: 14px 0 0;
    border: none;
    border-top: 1px solid var(--skycooker-border);
    border-radius: 0;
    background: transparent;
  }

  .design-modern .modern-settings-panel .new-section-header {
    padding: 0 0 8px;
  }

  .design-modern .modern-settings-panel .new-section-header span {
    font-weight: 500;
    color: var(--skycooker-text-secondary);
  }

  .design-modern .modern-settings-panel .new-additional-content.is-expanded {
    padding: 16px 0 4px;
    gap: 20px;
    border-top: none;
  }

  .design-modern .modern-setting-block {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin: 0;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .design-modern .modern-setting-label {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-start;
    width: 100%;
    text-align: left;
  }

  .design-modern .modern-setting-label ha-icon {
    flex-shrink: 0;
    font-size: 20px;
    color: var(--skycooker-accent);
  }

  .design-modern .modern-settings-panel .new-auto-warm-label,
  .design-modern .modern-settings-panel .new-temperature-label,
  .design-modern .modern-settings-panel .new-cooking-time-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    text-align: left;
  }

  .design-modern .modern-settings-panel .new-auto-warm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
  }

  .design-modern .modern-settings-panel .new-temperature-header,
  .design-modern .modern-settings-panel .new-cooking-time-header {
    justify-content: flex-start;
  }

  .design-modern .modern-settings-panel .new-temperature-controls,
  .design-modern .modern-settings-panel .new-cooking-time-controls {
    display: grid;
    width: 100%;
    gap: 10px;
    justify-content: stretch;
    align-items: stretch;
    padding: 0;
    margin: 0;
  }

  .design-modern .modern-settings-panel .new-temperature-controls {
    grid-template-columns: 1fr;
  }

  .design-modern .modern-settings-panel .new-cooking-time-controls {
    grid-template-columns: 1fr 1fr;
  }

  .design-modern .modern-settings-panel .new-temperature-controls ha-select,
  .design-modern .modern-settings-panel .new-cooking-time-controls ha-select {
    width: 100%;
    min-width: 0;
  }

  @media (max-width: 420px) {
    .design-modern .modern-selection-summary {
      grid-template-columns: 1fr;
    }

    .design-modern .modern-action-bar {
      grid-template-columns: 1fr;
    }
  }

`;
