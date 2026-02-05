import { css, CSSResult } from 'lit';

export const skycookerCardStyles: CSSResult = css`
  :host {
    --skycooker-spacing: var(--mush-spacing, 10px);
    --skycooker-control-radius: var(--mush-control-border-radius, 12px);
    --skycooker-chip-radius: var(--mush-chip-border-radius, 19px);
    --skycooker-chip-height: var(--mush-chip-height, 36px);
    --skycooker-icon-radius: var(--mush-icon-border-radius, 50%);
    --skycooker-icon-size: var(--mush-icon-size, 36px);
    --skycooker-control-height: var(--mush-control-height, 42px);
    font-family: var(--mdc-typography-font-family, inherit);
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
    border-bottom: 1px solid var(--divider-color);
  }
  .header .icon {
    font-size: 48px;
    color: var(--primary-color);
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
    color: var(--secondary-text-color);
  }
  ha-select {
    min-width: 120px;
  }
  ha-button {
    --mdc-theme-primary: var(--primary-color);
    --mdc-theme-secondary: var(--secondary-color);
  }
  .setup-message {
    padding: 20px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 16px;
  }

  ha-card.new-design {
    padding: 12px;
    gap: 12px;
    background: var(--card-background-color);
    border-radius: var(--ha-card-border-radius, 16px);
    box-shadow: var(--ha-card-box-shadow, 0px 2px 8px rgba(0,0,0,0.1));
    overflow: hidden;
  }

  .new-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background: var(--ha-card-header-color, var(--card-background-color));
    border-radius: var(--skycooker-control-radius);
    margin: -12px -12px 12px -12px;
    border-bottom: 1px solid var(--divider-color);
    color: var(--primary-text-color);
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
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.05);
    color: var(--primary-color);
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
    color: var(--primary-text-color);
  }

  .new-state {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--secondary-text-color);
  }

  .new-status-indicator {
    font-size: 20px;
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
    background-color: var(--card-background-color);
    border-radius: var(--skycooker-control-radius);
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
  }

  .new-control-item {
    display: flex;
    align-items: center;
    gap: var(--skycooker-spacing);
  }

  .new-control-icon {
    font-size: 20px;
    color: var(--primary-color);
  }

  .new-control-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .new-control-label {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--secondary-text-color);
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
    color: var(--secondary-text-color);
    text-align: center;
    font-family: inherit;
    font-weight: 500;
  }

  .selected-mode-text {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    color: var(--primary-color);
    margin-left: 4px;
    font-family: inherit;
  }

  .new-selected-time {
    font-size: var(--card-primary-font-size, 14px);
    color: var(--secondary-text-color);
    text-align: center;
    min-height: 20px;
    font-family: inherit;
    font-weight: 500;
  }

  .selected-time-text {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    color: var(--primary-color);
    margin-left: 4px;
    font-family: inherit;
  }

  .new-mode-tabs {
    display: flex;
    gap: var(--skycooker-spacing);
    margin-bottom: var(--skycooker-spacing);
    justify-content: center;
  }

  .new-mode-tab {
    padding: 0 16px;
    height: var(--skycooker-chip-height);
    min-height: var(--skycooker-chip-height);
    display: flex;
    align-items: center;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: var(--skycooker-chip-radius);
    cursor: pointer;
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    transition: all 0.2s ease;
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
  }

  .new-mode-tab.active {
    background-color: var(--primary-color);
    color: var(--primary-inverse-color, white);
    border-color: var(--primary-color);
  }

  .new-mode-tab:hover {
    background-color: var(--ha-card-background, var(--card-background-color));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .new-mode-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--skycooker-spacing);
    margin-top: var(--skycooker-spacing);
    justify-content: center;
  }

  .new-mode-button-wrapper {
    flex: 1 1 calc(50% - var(--skycooker-spacing));
    min-width: 120px;
    max-width: 200px;
    display: flex;
    justify-content: center;
  }

  .new-mode-button {
    --mdc-theme-primary: var(--primary-color);
    --mdc-theme-secondary: var(--secondary-color);
    border-radius: var(--skycooker-chip-radius);
    height: var(--skycooker-chip-height);
    min-height: var(--skycooker-chip-height);
    padding: 0 16px;
    font-size: var(--card-primary-font-size, 14px);
    background-color: var(--ha-card-background, var(--card-background-color));
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 120px;
    max-width: 200px;
    white-space: normal;
    word-wrap: break-word;
  }

  .new-mode-button .mode-button-icon {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  .new-mode-button .mode-button-text {
    font-size: var(--card-primary-font-size, 14px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .new-mode-button:hover {
    background-color: var(--ha-card-background, var(--card-background-color));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  .new-action-buttons {
    display: flex;
    justify-content: center;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--card-background-color);
    border-radius: var(--skycooker-control-radius);
  }

  .new-action-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .new-action-button {
    --mdc-theme-primary: var(--primary-color);
    --mdc-theme-secondary: var(--secondary-color);
    border-radius: 50%;
    width: 56px;
    height: 56px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--card-background-color);
    transition: all 0.2s ease;
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
  }

  .new-action-button ha-icon {
    width: 28px;
    height: 28px;
    opacity: 1;
    filter: brightness(1);
    font-size: 28px;
  }

  .new-action-button.pressed {
    background-color: var(--card-background-color);
    box-shadow: none;
  }

  .new-action-button.pressed ha-icon {
    color: var(--primary-color);
  }

  .new-action-button-label {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--secondary-text-color);
    text-align: center;
  }

  .new-additional-controls {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--card-background-color);
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
    border-top: 1px solid var(--divider-color);
  }

  .new-auto-warm-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--card-background-color);
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
    padding: var(--skycooker-spacing) 12px 24px 12px;
    background-color: var(--card-background-color);
    border-radius: var(--skycooker-control-radius);
    margin: var(--skycooker-spacing) 0;
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
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
    --mdc-theme-primary: var(--primary-color);
    --mdc-shape-small: var(--skycooker-control-radius);
    --mdc-menu-min-width: 120px;
    height: var(--skycooker-control-height);
    border-radius: var(--skycooker-control-radius);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .new-cooking-time-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing) 12px 24px 12px;
    background-color: var(--card-background-color);
    border-radius: var(--skycooker-control-radius);
    margin: var(--skycooker-spacing) 0;
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
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

  .new-time-unit {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
  }

  .new-auto-warm-time {
    padding-left: 30px;
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--secondary-text-color);
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

  ha-select {
    --mdc-theme-primary: var(--primary-color);
    --mdc-shape-small: var(--skycooker-control-radius);
    min-width: 80px;
    height: var(--skycooker-control-height);
    border-radius: var(--skycooker-control-radius);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    font-size: var(--card-primary-font-size, 14px);
  }

  ha-select .mdc-floating-label {
    display: none !important;
  }

  ha-select .mdc-floating-label.mdc-floating-label--float-above {
    display: none !important;
  }

  ha-select .mdc-select__anchor {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    height: var(--skycooker-control-height);
    display: flex;
    align-items: center;
    padding: 0 8px;
    border-radius: var(--skycooker-control-radius);
  }

  ha-select .mdc-select__dropdown-icon {
    margin-right: 4px;
  }

  ha-select .mdc-select__menu {
    min-width: 100%;
    max-width: 300px;
    border-radius: var(--skycooker-control-radius);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  ha-select .mdc-select__selected-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ha-select:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;
