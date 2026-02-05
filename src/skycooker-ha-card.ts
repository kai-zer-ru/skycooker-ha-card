import { html, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import { HomeAssistant } from './types';
import { SubscribeMixin, UnsubscribeFunc } from './subscribe-mixin';
import { getTranslation, getLanguage } from './localize';
import { CARD_VERSION } from './const';
import {
  type SkycookerConfig,
  CONFIG_ENTITY_KEYS,
  DEFAULT_CONFIG,
  normalizeConfig,
} from './config';
import {
  getEntityState,
  hasFavoriteModes,
  normalizeTemperatureValue,
} from './entity-utils';
import { renderSkyCookerHeader } from './components/skycooker-header';
import { renderSkyCookerActionButtons } from './components/skycooker-action-buttons';
import { renderSkyCookerStatusBlock } from './components/skycooker-status-block';
import { renderSkyCookerAdditionalControls } from './components/skycooker-additional-controls';
import { renderSkyCookerModeSelector } from './components/skycooker-mode-selector';
import { skycookerCardStyles } from './skycooker-ha-card-styles';

@customElement('skycooker-ha-card')
export class SkyCookerHaCard extends SubscribeMixin {
  @property({ attribute: false })
  public hass?: HomeAssistant = undefined;

  @state()
  private _config?: SkycookerConfig = undefined;
  
  @state()
  private _selectedMode?: string = 'all'; // По умолчанию показываем все режимы

  @state()
  private _selectedModeName: string = ''; // Отслеживаем имя нажатой кнопки режима

  @state()
  private _additionalExpanded: boolean = false;

  private _configChangedHandler = (ev: Event): void => {
    const customEvent = ev as CustomEvent;
    if (customEvent.detail?.config) {
      this._config = normalizeConfig(customEvent.detail.config, this.hass);
      this._initializeSelectedMode();
      this.requestUpdate();
    }
  };

  private _initializeSelectedMode(): void {
    this._selectedMode = hasFavoriteModes(
      this.hass,
      this._config?.favorite_modes_entity
    )
      ? 'favorite'
      : 'all';
    this._syncSelectedModeFromEntity();
  }

  private _syncSelectedModeFromEntity(): void {
    if (!this._config?.mode_entity || !this.hass) return;
    const state = getEntityState(this.hass, this._config.mode_entity);
    if (state && state !== 'N/A' && state !== 'unknown') {
      this._selectedModeName = state;
    }
  }

  public static async getConfigElement() {
    await import('./skycooker-ha-card-editor');
    return document.createElement('skycooker-ha-card-editor');
  }

  private _getLanguage(): string {
    return getLanguage(this._config, this.hass);
  }

  private _t(key: string): string {
    const language = this._getLanguage();
    return getTranslation(language, key);
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<Partial<SkycookerConfig>> {
    return {
      ...DEFAULT_CONFIG,
      language: hass.language || 'ru',
    };
  }

  public setConfig(config?: Partial<SkycookerConfig>): void {
    this._config = normalizeConfig(config, this.hass);
    this._initializeSelectedMode();
  }

  public override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.addEventListener('config-changed', this._configChangedHandler);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('config-changed', this._configChangedHandler);
    super.disconnectedCallback();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated?.(changedProperties);
    if (changedProperties.has('hass') || changedProperties.has('_config')) {
      this._syncSelectedModeFromEntity();
    }
  }

  public hassSubscribe(): (() => Promise<UnsubscribeFunc>)[] {
    if (!this._config || !this.hass) return [];

    const entities = CONFIG_ENTITY_KEYS.map((key) => this._config![key])
      .filter((entity): entity is string => !!entity);
   
    return entities.map((entity) => {
      return () => {
        const result = this.hass?.connection.subscribeEvents(
          (event: any) => {
            if (event.data.entity_id === entity) {
              this._handleStateChange(event.data.entity_id, event.data.new_state);
            }
          },
          'state_changed'
        );
        if (!result) return Promise.resolve(() => {});
        return result instanceof Promise ? result : Promise.resolve(result);
      };
    });
  }

  private _handleStateChange(entityId: string, newState: { state?: string } | null): void {
    if (
      entityId === this._config?.mode_entity &&
      newState?.state &&
      newState.state !== 'unknown'
    ) {
      this._selectedModeName = newState.state;
    }
    this.requestUpdate();
  }

  protected render(): TemplateResult {
   if (!this._config || !this.hass) {
     return html``;
   }
 
   const hasAnyEntity = CONFIG_ENTITY_KEYS.some(
     (key) => (this._config![key] as string)?.length > 0
   );
 
   if (!hasAnyEntity) {
     return html`
       <ha-card>
         <div class="header">
           <div class="icon">
             <ha-icon .icon="${this._config.icon || 'mdi:stove'}"></ha-icon>
           </div>
           <div class="summary">
             <div class="name">
               ${this._config.name || 'SkyCooker'}
             </div>
             <div class="state">
               ${this._t('not_configured')}
             </div>
           </div>
         </div>
         <div class="setup-message">
           ${this._t('please_configure')}
         </div>
       </ha-card>
     `;
   }
 
   // Используем компактный дизайн
   return this._renderDesign();
 }


 private _renderDesign(): TemplateResult {
   return html`
 <ha-card class="new-design">
   ${renderSkyCookerHeader(
     this._config,
     this.hass,
     this._config.status_entity
   )}
   
   <div class="new-controls-grid">
      ${renderSkyCookerStatusBlock(
        this._config,
        this.hass,
        this._t.bind(this)
      )}
      ${renderSkyCookerModeSelector({
        config: this._config,
        hass: this.hass,
        t: this._t.bind(this),
        selectedMode: this._selectedMode ?? 'all',
        selectedModeName: this._selectedModeName,
        onShowFavorite: () => this._showFavoriteModes(),
        onShowAll: () => this._showAllModes(),
        onModeClick: (entityId, option) => this._handleModeButtonClick(entityId, option),
        getSelectedTime: () => this._getSelectedTime(),
      })}
   </div>
   
   ${renderSkyCookerActionButtons(
     this._config,
     this._t.bind(this),
     this._handleButtonPress.bind(this)
   )}
   
   ${renderSkyCookerAdditionalControls(
     this._config,
     this.hass,
     this._t.bind(this),
     this._additionalExpanded,
     () => {
       this._additionalExpanded = !this._additionalExpanded;
     },
     this._handleSelectChange.bind(this),
     this._handleSwitchChange.bind(this)
   )}
   
 </ha-card>
`;
 }

  private _getEntityState(entityId: string): string {
    return getEntityState(this.hass, entityId);
  }

  private _getSelectedTime(): string {
  // Получаем данные из скрытых селектов 'Время приготовления'
  if (!this._config?.cooking_time_hours_entity || !this._config?.cooking_time_minutes_entity || !this.hass) return 'N/A';
    
  const hours = this._getEntityState(this._config.cooking_time_hours_entity);
  const minutes = this._getEntityState(this._config.cooking_time_minutes_entity);
    
  // Форматируем время для отображения
  if (hours === 'N/A' || hours === '') {
    return minutes !== 'N/A' && minutes !== '' ? `${minutes} ${this._t('minutes')}` : 'N/A';
  }
    
  if (minutes === 'N/A' || minutes === '') {
    return hours !== 'N/A' && hours !== '' ? `${hours} ${this._t('hours')}` : 'N/A';
  }
    
  return `${hours} ${this._t('hours')} ${minutes} ${this._t('minutes')}`;
  }

  private _showFavoriteModes(): void {
   // Устанавливаем флаг для отображения избранных режимов
   this._selectedMode = 'favorite';
   this.requestUpdate();
 }

 private _showAllModes(): void {
   // Устанавливаем флаг для отображения всех режимов
   this._selectedMode = 'all';
   this.requestUpdate();
 }
  
  private _handleModeButtonClick(entityId: string, option: string): void {
    if (!this._config || !this.hass || !entityId) return;

    this._selectedModeName = option;
    this.requestUpdate();

    this.hass.callService('select', 'select_option', {
      entity_id: entityId,
      option,
    });
  }

  private _handleSelectChange(entityId: string, ev: any): void {
    if (!this._config || !this.hass || !entityId) return;
    
    // Извлекаем значение из события
    // Для ha-select значение может быть в ev.detail.value
    // Для mwc-list-item значение может быть в ev.target.selected
    let value = ev?.detail?.value;
    
    // Если нет в detail, пробуем получить из selected элемента
    if (!value && ev?.target?.selected) {
      value = ev.target.selected.value;
    }
    
    // Если всё еще нет значения, пробуем получить из текущего состояния сущности
    if (!value) {
      value = this._getEntityState(entityId);
    }
    
    if (!value) {
      return;
    }
    
    // Убедимся, что не устанавливаем 'unknown' для режима готовки
    if (entityId === this._config.mode_entity && value === 'unknown') {
      value = '';
    }
    
    // Убедимся, что не устанавливаем 'unknown' для времени отложенного старта
    if (entityId === this._config.delayed_start_hours_entity && value === 'unknown') {
      value = '0';
    }
    
    // Убедимся, что не устанавливаем 'unknown' для минут отложенного старта
    if (entityId === this._config.delayed_start_minutes_entity && value === 'unknown') {
      value = '0';
    }

    const temperatureEntity =
      this._config.cooking_temperature_entity || this._config.temperature_entity;
    if (entityId === temperatureEntity) {
      value = normalizeTemperatureValue(value);
    }

    this.hass.callService('select', 'select_option', {
      entity_id: entityId,
      option: value
    });
  }
  

  private _handleSwitchChange(entityId: string, checked: boolean): void {
    if (!this._config || !this.hass || !entityId) return;
    
    const service = checked ? 'turn_on' : 'turn_off';
    this.hass.callService('switch', service, {
      entity_id: entityId
    });
  }

  private _handleButtonPress(entityId: string): void {
    if (!this._config || !this.hass || !entityId) return;
  
    // Проверяем, является ли entityId сущностью для кнопки "Стоп"
    if (entityId === this._config.stop_entity) {
      const modeEntity = this._config.mode_entity;
      if (modeEntity) {
        const optionToSet = this._t('standby_mode');
        this.hass.callService('select', 'select_option', {
          entity_id: modeEntity,
          option: optionToSet
        });
      }
    }
 
    // Проверяем, является ли entityId сущностью для кнопки "Старт"
    if (entityId === this._config.start_entity) {
      // Проверяем состояние select.skycooker_rmc_m40s_vremia_otlozhennogo_starta_chasy
      const delayedStartHoursEntity = this._config.delayed_start_hours_entity;
      if (delayedStartHoursEntity) {
        const currentState = this._getEntityState(delayedStartHoursEntity);
        // Если состояние 'unknown', заменяем на '0'
        if (currentState === 'unknown') {
          this.hass.callService('select', 'select_option', {
            entity_id: delayedStartHoursEntity,
            option: '0'
          });
        }
      }
      // Проверяем состояние select.skycooker_rmc_m40s_vremia_otlozhennogo_starta_minuty
      const delayedStartMinutesEntity = this._config.delayed_start_minutes_entity;
      if (delayedStartMinutesEntity) {
        const currentState = this._getEntityState(delayedStartMinutesEntity);
        // Если состояние 'unknown', заменяем на '0'
        if (currentState === 'unknown') {
          this.hass.callService('select', 'select_option', {
            entity_id: delayedStartMinutesEntity,
            option: '0'
          });
        }
      }
      this.requestUpdate();
    }
 
    this.hass.callService('button', 'press', {
      entity_id: entityId
    });
  }

  static get styles() {
    return skycookerCardStyles;
  }
}

console.log('SkyCooker Card version:', CARD_VERSION);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'skycooker-ha-card',
  name: 'SkyCooker Card',
  description: 'Card for operating SkyCooker through Lovelace.',
  preview: true,
});
