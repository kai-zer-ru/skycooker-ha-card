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

  @state()
  private _instanceEntityId?: string;

  /** Список экземпляров (по одному на устройство): подпись = имя устройства, value = entity_id для seed */
  @state()
  private _instanceOptions: Array<{ value: string; label: string }> = [];

  private _instanceOptionsLoaded = false;

  private _handleSelectConfigChangeSelected(
    key: keyof SkycookerConfig,
    ev: any
  ): void {
    const v =
      (ev.detail as any)?.value ??
      ev.target?.value ??
      ev.target?.selected?.value ??
      '';
    if (v === undefined) return;
    this._updateConfig({ [key]: v } as any);
  }

  public setConfig(config?: Partial<SkycookerConfig>): void {
    this._config = config
      ? { ...normalizeConfig(config, this.hass) }
      : { ...DEFAULT_CONFIG, language: 'ru' };

    // Выбранный экземпляр SkyCooker храним отдельно, чтобы в UI
    // всегда показывать ровно то, что выбрал пользователь, даже
    // если автофилл изменяет mode_entity/status_entity.
    this._instanceEntityId =
      this._config.mode_entity ||
      this._config.status_entity ||
      this._config.start_entity ||
      '';
  }

  public getConfig(): SkycookerConfig | undefined {
    return this._config;
  }

  // Реализуем метод configUpdated для правильной обработки обновлений конфигурации
  public configUpdated(config?: Partial<SkycookerConfig>): void {
    this.setConfig(config);
    this.requestUpdate();
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('hass') && this.hass && !this._instanceOptionsLoaded) {
      this._loadInstanceOptions();
    }
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

  private _handleAutoFill = async (seedOverride?: string): Promise<void> => {
    const seed =
      seedOverride ||
      this._instanceEntityId ||
      this._config?.mode_entity ||
      this._config?.status_entity ||
      this._config?.start_entity;
    if (!seed || !this.hass) return;
    const filled = await autoFillEntitiesByDevice(this.hass, seed);
    if (Object.keys(filled).length > 0) {
      this._updateConfig(filled);
    }
  };

  private _isHaVersionAtLeast(targetMajor: number, targetMinor: number): boolean {
    const ver =
      (this.hass as any)?.connection?.haVersion ||
      (this.hass as any)?.config?.version ||
      '';
    if (!ver) return false;
    const [majorStr, minorStr] = ver.split('.');
    const major = Number(majorStr);
    const minor = Number(minorStr);
    if (!Number.isFinite(major) || !Number.isFinite(minor)) return false;
    if (major > targetMajor) return true;
    if (major < targetMajor) return false;
    return minor >= targetMinor;
  }

  private _getEntityOptions(domain: string): TemplateResult[] {
    if (!this.hass) return [];

    const useHaDropdownItem = this._isHaVersionAtLeast(2026, 1);

    const entities = Object.keys(this.hass.states)
      .filter(
        (entity_id) =>
          entity_id.startsWith(`${domain}.`) &&
          entity_id.includes('skycooker')
      )
      .sort();

    const options: TemplateResult[] = [];

    // Опция очистки
    options.push(
      useHaDropdownItem
        ? html`<ha-dropdown-item value=""
            >${this._t('clear_selection')}</ha-dropdown-item
          >`
        : html`<mwc-list-item value=""
            >${this._t('clear_selection')}</mwc-list-item
          >`
    );

    // Опции сущностей SkyCooker
    entities.forEach((entity_id) => {
      const stateObj = this.hass?.states[entity_id];
      const registryEntry = (this.hass as any).entities?.[entity_id];
      const friendlyName =
        registryEntry?.name ||
        stateObj?.attributes?.friendly_name ||
        entity_id;
      options.push(
        useHaDropdownItem
          ? html`<ha-dropdown-item value=${entity_id}
              >${friendlyName}</ha-dropdown-item
            >`
          : html`<mwc-list-item value="${entity_id}"
              >${friendlyName}</mwc-list-item
            >`
      );
    });

    return options;
  }

  /** Загружает список экземпляров SkyCooker по реестрам: по одному пункту на устройство (имя устройства). */
  private async _loadInstanceOptions(): Promise<void> {
    const hass = this.hass;
    const callWS = (hass as any)?.callWS?.bind(hass);
    if (!callWS || !hass) {
      this._instanceOptions = [];
      this._instanceOptionsLoaded = true;
      return;
    }
    try {
      const [entityRegistry, deviceRegistry]: [any[], any[]] = await Promise.all([
        callWS({ type: 'config/entity_registry/list' }),
        callWS({ type: 'config/device_registry/list' }),
      ]);
      const skycookerEntities = entityRegistry.filter(
        (e: any) =>
          e.entity_id &&
          String(e.entity_id).includes('skycooker') &&
          (e.entity_id.startsWith('sensor.') || e.entity_id.startsWith('select.')) &&
          (e.entity_id.endsWith('_status') || e.entity_id.endsWith('_program'))
      );
      const byDevice = new Map<string, string[]>();
      for (const e of skycookerEntities) {
        const did = e.device_id;
        if (!did) continue;
        if (!byDevice.has(did)) byDevice.set(did, []);
        byDevice.get(did)!.push(e.entity_id);
      }
      const devicesById = new Map<string, any>();
      for (const d of deviceRegistry || []) {
        if (d?.id) devicesById.set(d.id, d);
      }
      const list: Array<{ value: string; label: string }> = [];
      for (const [deviceId, entityIds] of byDevice) {
        const device = devicesById.get(deviceId);
        const name =
          device?.name_by_user ||
          device?.name ||
          (device?.manufacturer && device?.model
            ? `${device.manufacturer} ${device.model}`
            : null) ||
          `SkyCooker (${entityIds[0]})`;
        const representative =
          entityIds.find((id: string) => id.endsWith('_status')) ||
          entityIds.find((id: string) => id.endsWith('_program')) ||
          entityIds[0];
        list.push({ value: representative, label: name });
      }
      list.sort((a, b) => a.label.localeCompare(b.label));
      this._instanceOptions = list;
    } catch {
      this._instanceOptions = [];
    }
    this._instanceOptionsLoaded = true;
    this.requestUpdate();
  }

  private _getSkycookerRootOptions(): TemplateResult[] {
    if (!this.hass) return [];
    const useHaDropdownItem = this._isHaVersionAtLeast(2026, 1);
    const options: TemplateResult[] = [];

    options.push(
      useHaDropdownItem
        ? html`<ha-dropdown-item value=""
            >${this._t('clear_selection')}</ha-dropdown-item
          >`
        : html`<mwc-list-item value=""
            >${this._t('clear_selection')}</mwc-list-item
          >`
    );

    for (const { value, label } of this._instanceOptions) {
      options.push(
        useHaDropdownItem
          ? html`<ha-dropdown-item value=${value}>${label}</ha-dropdown-item>`
          : html`<mwc-list-item value="${value}">${label}</mwc-list-item>`
      );
    }
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
              @click=${() => this._handleAutoFill(this._instanceEntityId)}
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

          <div class="grid">
            <!-- SkyCooker instance -->
            <div class="entity-item">
              <label>${this._t('skycooker_instance')}</label>
              <ha-select
                .value=${this._instanceEntityId || ''}
                @selected=${(ev: CustomEvent) => {
                  const v =
                    (ev.detail as any)?.value ??
                    (ev.target as any)?.value ??
                    '';
                  if (!v) return;
                  this._instanceEntityId = v as string;
                  this._handleAutoFill(this._instanceEntityId);
                }}
              >
                ${this._getSkycookerRootOptions()}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Sensors Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('sensors')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Current Program Sensor -->
            <div class="entity-item">
              <label>${this._t('current_mode')}</label>
              <ha-select
                .value=${this._config.current_mode_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'current_mode_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Delayed Launch Time Sensor -->
            <div class="entity-item">
              <label>${this._t('delayed_launch_time')}</label>
              <ha-select
                .value=${this._config.delayed_launch_time_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'delayed_launch_time_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Total Time Sensor -->
            <div class="entity-item">
              <label>${this._t('total_time')}</label>
              <ha-select
                .value=${this._config.cooking_time_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'cooking_time_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Remaining Time Sensor -->
            <div class="entity-item">
              <label>${this._t('remaining_time')}</label>
              <ha-select
                .value=${this._config.remaining_time_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'remaining_time_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Temperature Sensor -->
            <div class="entity-item">
              <label>${this._t('temperature')}</label>
              <ha-select
                .value=${this._config.temperature_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'temperature_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Status Sensor -->
            <div class="entity-item">
              <label>${this._t('status')}</label>
              <ha-select
                .value=${this._config.status_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'status_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Success Rate Sensor -->
            <div class="entity-item">
              <label>${this._t('success_rate')}</label>
              <ha-select
                .value=${this._config.success_rate_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'success_rate_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Error Code Sensor -->
            <div class="entity-item">
              <label>${this._t('error_code')}</label>
              <ha-select
                .value=${this._config.error_code_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'error_code_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Sound Enabled Sensor -->
            <div class="entity-item">
              <label>${this._t('sound_enabled')}</label>
              <ha-select
                .value=${this._config.sound_enabled_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'sound_enabled_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Current Mode Sensor -->
            <div class="entity-item">
              <label>${this._t('current_mode')}</label>
              <ha-select
                .value=${this._config.current_mode_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'current_mode_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Auto Warm Time Sensor -->
            <div class="entity-item">
              <label>${this._t('auto_warm_time')}</label>
              <ha-select
                .value=${this._config.auto_warm_time_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'auto_warm_time_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Delayed Launch Time Sensor -->
            <div class="entity-item">
              <label>${this._t('delayed_launch_time')}</label>
              <ha-select
                .value=${this._config.delayed_launch_time_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'delayed_launch_time_entity',
                    ev
                  )}
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
                .value=${this._config.auto_warm_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'auto_warm_entity',
                    ev
                  )}
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
                .value=${this._config.mode_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected('mode_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Favorite Modes Select -->
            <div class="entity-item">
              <label>${this._t('favorite_modes')}</label>
              <ha-select
                .value=${this._config.favorite_modes_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'favorite_modes_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Additional Mode Select -->
            <div class="entity-item">
              <label>${this._t('additional_mode')}</label>
              <ha-select
                .value=${this._config.additional_mode_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'additional_mode_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Hours Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_hours')}</label>
              <ha-select
                .value=${this._config.cooking_time_hours_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'cooking_time_hours_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Minutes Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_minutes')}</label>
              <ha-select
                .value=${this._config.cooking_time_minutes_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'cooking_time_minutes_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Hours Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_hours')}</label>
              <ha-select
                .value=${this._config.delayed_start_hours_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'delayed_start_hours_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Minutes Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_minutes')}</label>
              <ha-select
                .value=${this._config.delayed_start_minutes_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'delayed_start_minutes_entity',
                    ev
                  )}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Temperature Select -->
            <div class="entity-item">
              <label>${this._t('cooking_temperature')}</label>
              <ha-select
                .value=${this._config.cooking_temperature_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'cooking_temperature_entity',
                    ev
                  )}
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
                .value=${this._config.start_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected('start_entity', ev)}
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Stop Button -->
            <div class="entity-item">
              <label>${this._t('stop')}</label>
              <ha-select
                .value=${this._config.stop_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected('stop_entity', ev)}
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Start Delayed Button -->
            <div class="entity-item">
              <label>${this._t('start_delayed')}</label>
              <ha-select
                .value=${this._config.start_delayed_entity || ''}
                @selected=${(ev: CustomEvent) =>
                  this._handleSelectConfigChangeSelected(
                    'start_delayed_entity',
                    ev
                  )}
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

      .design-toggle-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 15px;
      }

      .design-toggle-label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skycooker-ha-card-editor': SkyCookerHaCardEditor;
  }
}