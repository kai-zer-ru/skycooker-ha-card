import { LitElement, html, TemplateResult, CSSResult, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from './types';
import { getLanguage, getTranslation } from './localize';
import {
  type SkycookerConfig,
  DEFAULT_CONFIG,
  normalizeConfig,
} from './config';
import { autoFillEntitiesByDevice } from './entity-utils';

@customElement('skycooker-ha-card-editor')
export class SkyCookerHaCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: SkycookerConfig;

  public setConfig(config?: Partial<SkycookerConfig>): void {
    this._config = config
      ? { ...normalizeConfig(config, this.hass) }
      : { ...DEFAULT_CONFIG, language: 'ru' };
  }

  public getConfig(): SkycookerConfig | undefined {
    return this._config;
  }

  // Реализуем метод configUpdated для правильной обработки обновлений конфигурации
  public configUpdated(config?: Partial<SkycookerConfig>): void {
    this.setConfig(config);
    this.requestUpdate();
  }

  private _updateConfig(updates: Partial<SkycookerConfig>): void {
    if (!this._config) return;
    this._config = { ...this._config, ...updates };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
    this.requestUpdate();
  }

  private _handleAutoFill = (): void => {
    const seed =
      this._config?.mode_entity ||
      this._config?.status_entity ||
      this._config?.start_entity;
    if (!seed || !this.hass) return;
    const filled = autoFillEntitiesByDevice(this.hass, seed);
    if (Object.keys(filled).length > 0) {
      this._updateConfig(filled);
    }
  };

  private _getEntityOptions(domain: string): TemplateResult[] {
    if (!this.hass) return [];

    const entities = Object.keys(this.hass.states)
      .filter((entity_id) => entity_id.startsWith(`${domain}.`))
      .sort();

    // Добавляем опцию очистки в начало
    const options = [html`
      <mwc-list-item value="">-- ${this._t('clear_selection')} --</mwc-list-item>
    `];

    // Добавляем все опции сущностей
    entities.forEach(entity_id => {
      const stateObj = this.hass?.states[entity_id];
      const friendlyName = stateObj?.attributes?.friendly_name || entity_id;
      options.push(html`
        <mwc-list-item value="${entity_id}">${friendlyName}</mwc-list-item>
      `);
    });

    return options;
  }

  private _getLanguage(): string {
    return getLanguage(this._config, this.hass);
  }

  private _t(key: string): string {
    const language = this._getLanguage();
    return getTranslation(language, key);
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    return html`
      <div class="editor-container">
        <!-- Configuration Header -->
        <div class="config-header">
          <h2>${this._t('configuration')}</h2>
        </div>

        <!-- Basic Settings -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('entities')}</h3>
            <ha-button
              .disabled=${!(
                this._config.mode_entity ||
                this._config.status_entity ||
                this._config.start_entity
              )}
              @click=${this._handleAutoFill}
            >
              ${this._t('auto_fill')}
            </ha-button>
          </div>
          <div class="grid">
            <!-- Name -->
            <ha-textfield
              .label="${this._t('name')}"
              .value="${this._config.name || 'SkyCooker'}"
              @input="${(ev: Event) =>
                this._updateConfig({
                  name: (ev.target as HTMLInputElement).value,
                })}"
            ></ha-textfield>

            <!-- Icon -->
            <ha-textfield
              .label="${this._t('icon')}"
              .value="${this._config.icon || 'mdi:stove'}"
              @input="${(ev: Event) =>
                this._updateConfig({
                  icon: (ev.target as HTMLInputElement).value,
                })}"
            ></ha-textfield>
            
          </div>
        </div>

        <!-- Sensors Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('sensors')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Temperature Sensor -->
            <div class="entity-item">
              <label>${this._t('temperature')}</label>
              <ha-select
                .value="${this._config.temperature_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ temperature_entity: v });
                }}"
                @closed="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Remaining Time Sensor -->
            <div class="entity-item">
              <label>${this._t('remaining_time')}</label>
              <ha-select
                .value="${this._config.remaining_time_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ remaining_time_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Total Time Sensor -->
            <div class="entity-item">
              <label>${this._t('total_time')}</label>
              <ha-select
                .value="${this._config.cooking_time_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ cooking_time_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Status Sensor -->
            <div class="entity-item">
              <label>${this._t('status')}</label>
              <ha-select
                .value="${this._config.status_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ status_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Current Mode Sensor -->
            <div class="entity-item">
              <label>${this._t('current_mode')}</label>
              <ha-select
                .value="${this._config.current_mode_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ current_mode_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Auto Warm Time Sensor -->
            <div class="entity-item">
              <label>${this._t('auto_warm_time')}</label>
              <ha-select
                .value="${this._config.auto_warm_time_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ auto_warm_time_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Delayed Launch Time Sensor -->
            <div class="entity-item">
              <label>${this._t('delayed_launch_time')}</label>
              <ha-select
                .value="${this._config.delayed_launch_time_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ delayed_launch_time_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Switches Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('switches')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Auto Warm Switch -->
            <div class="entity-item">
              <label>${this._t('auto_warm')}</label>
              <ha-select
                .value="${this._config.auto_warm_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ auto_warm_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('switch')}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Selects Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('selects')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Mode Select -->
            <div class="entity-item">
              <label>${this._t('mode')}</label>
              <ha-select
                .value="${this._config.mode_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ mode_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Additional Mode Select -->
            <div class="entity-item">
              <label>${this._t('additional_mode')}</label>
              <ha-select
                .value="${this._config.additional_mode_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ additional_mode_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Hours Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_hours')}</label>
              <ha-select
                .value="${this._config.cooking_time_hours_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ cooking_time_hours_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Minutes Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_minutes')}</label>
              <ha-select
                .value="${this._config.cooking_time_minutes_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ cooking_time_minutes_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Hours Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_hours')}</label>
              <ha-select
                .value="${this._config.delayed_start_hours_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ delayed_start_hours_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Minutes Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_minutes')}</label>
              <ha-select
                .value="${this._config.delayed_start_minutes_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ delayed_start_minutes_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>
            
           <!-- Favorite Modes Select -->
            <div class="entity-item">
              <label>${this._t('favorite_modes')}</label>
              <ha-select
                .value="${this._config.favorite_modes_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ favorite_modes_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

           <!-- Cooking Temperature Select -->
            <div class="entity-item">
              <label>${this._t('cooking_temperature')}</label>
              <ha-select
                .value="${this._config.cooking_temperature_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ cooking_temperature_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Buttons Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('buttons')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Start Button -->
            <div class="entity-item">
              <label>${this._t('start')}</label>
              <ha-select
                .value="${this._config.start_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ start_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Stop Button -->
            <div class="entity-item">
              <label>${this._t('stop')}</label>
              <ha-select
                .value="${this._config.stop_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ stop_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Start Delayed Button -->
            <div class="entity-item">
              <label>${this._t('start_delayed')}</label>
              <ha-select
                .value="${this._config.start_delayed_entity || ''}"
                @selected="${(ev: any) => {
                  ev.stopPropagation();
                  ev.preventDefault();
                  const v = ev.target?.value ?? ev.detail?.value ?? '';
                  this._updateConfig({ start_delayed_entity: v });
                }}"
                @closed="${(ev: any) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>
          </div>
        </div>
      </div>
    `;
  }


  static get styles(): CSSResult {
    return css`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .config-header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--divider-color);
      }

      .section {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px 8px;
        margin-bottom: 15px;
      }

      .grid > * {
        display: flex;
        flex-direction: column;
        flex: 1 0 300px;
      }

      .entity-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
      }

      .entity-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .entity-item label {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      ha-select {
        flex: 1;
      }

      ha-textfield {
        width: 100%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skycooker-ha-card-editor': SkyCookerHaCardEditor;
  }
}