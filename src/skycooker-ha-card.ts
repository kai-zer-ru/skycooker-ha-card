// @ts-nocheck
import { html, TemplateResult } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import { HomeAssistant } from './types';
import { SubscribeMixin, UnsubscribeFunc } from './subscribe-mixin';
import { getTranslation, getLanguage } from './localize';
import { CARD_VERSION, FAVORITES_OTHER_OPTIONS } from './const';
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
import { isStatusOff } from './status-utils';

@customElement('skycooker-ha-card')
export class SkyCookerHaCard extends SubscribeMixin {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: SkycookerConfig;
  
  @state()
  private _selectedMode: 'favorite' | 'all' = 'favorite'; // По умолчанию избранные режимы

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
    const favEntity = this._config?.favorite_modes_entity;
    const hasFav = hasFavoriteModes(this.hass, favEntity);
    // Если есть сущность избранного и в ней есть режимы — показываем избранное, иначе все
    if (favEntity && hasFav) {
      this._selectedMode = 'favorite';
    } else {
      this._selectedMode = 'all';
    }
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
      // Инициализируем вкладку по умолчанию только когда hass только что появился (при первой загрузке).
      // Иначе при каждом обновлении hass перезаписывали бы выбор пользователя «Все программы».
      const hassJustBecameAvailable =
        changedProperties.has('hass') && !changedProperties.get('hass') && this.hass;
      if (hassJustBecameAvailable) {
        this._initializeSelectedMode();
      } else {
        this._syncSelectedModeFromEntity();
      }
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
 
   return this._renderUnifiedDesign();
  }

  private _renderUnifiedDesign(): TemplateResult {
    return html`
  <ha-card class="new-design new-design-v2">
    ${renderSkyCookerHeader(
      this._config!,
      this.hass,
      this._config!.status_entity,
      true
    )}
    
    ${this._renderUnifiedStateBlock()}
    
    <div class="new-controls-grid">
    ${renderSkyCookerModeSelector({
         config: this._config!,
         hass: this.hass,
         t: this._t.bind(this),
         getSelectedTime: () => this._getSelectedTime(),
         showCurrentStatusLine: false,
         onSelectChange: (entityId: string, ev: Event) =>
           this._handleSelectChange(entityId, ev),
       } as any)}
    </div>
    
    ${renderSkyCookerActionButtons(
      this._config!,
      this._t.bind(this),
      this._handleButtonPress.bind(this)
    )}
    
    ${renderSkyCookerAdditionalControls(
      this._config!,
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

  private _renderUnifiedStateBlock(): TemplateResult {
    const statusState = this._config?.status_entity && this.hass
      ? (this.hass.states[this._config.status_entity]?.state ?? '')
      : '';
    if (isStatusOff(statusState)) {
      return html``;
    }
    return renderSkyCookerStatusBlock(
      this._config!,
      this.hass,
      this._t.bind(this)
    );
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

  private _handleSelectChange(entityId: string, ev: any): void {
    if (!this._config || !this.hass || !entityId) return;
    
    // eslint-disable-next-line no-console
    console.log('[SkyCooker Card] _handleSelectChange event', {
      entityId,
      detail: ev?.detail,
      targetValue: ev?.target?.value,
      selectedValue: ev?.target?.selected?.value,
    });

    let value =
      ev?.detail?.value ??
      ev?.target?.value ??
      ev?.target?.selected?.value ??
      ev?.target?.selected?.textContent?.trim();

    // Если всё еще нет значения, пробуем получить из текущего состояния сущности
    if (value === undefined || value === null || value === '') {
      value = this._getEntityState(entityId);
    }
    
    if (value === undefined || value === null || value === '') return;

    // Приводим к строке, чтобы select.select_option получил ожидаемый тип
    value = String(value);
    
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

    // Опция «Другое» в селекте избранного — только обновить отображение, не вызывать select_option
    if (
      entityId === this._config.mode_entity &&
      FAVORITES_OTHER_OPTIONS.includes(value)
    ) {
      this._selectedModeName = String(value);
      this.requestUpdate();
      return;
    }

    const temperatureEntity =
      this._config.cooking_temperature_entity || this._config.temperature_entity;
    if (entityId === temperatureEntity) {
      value = normalizeTemperatureValue(value);
    }

    // Для визуального отображения "Выбранная программа" сразу
    // обновляем локальное имя при смене режима.
    if (entityId === this._config.mode_entity) {
      this._selectedModeName = String(value);
      this.requestUpdate();
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

    // Кнопка "Стоп" — вызываем сервис skycooker.stop_cooking
    if (entityId === this._config.stop_entity) {
      const targetEntity =
        this._config.status_entity ||
        this._config.mode_entity ||
        this._config.start_entity ||
        this._config.stop_entity;
      this.hass.callService('skycooker', 'stop_cooking', {
        entity_id: targetEntity,
      });
      return;
    }

    // Кнопка "Старт" — вызываем сервис skycooker.start_cooking
    if (entityId === this._config.start_entity) {
      // Перед запуском убедимся, что значения отложенного старта не "unknown"
      const delayedStartHoursEntity = this._config.delayed_start_hours_entity;
      if (delayedStartHoursEntity) {
        const currentState = this._getEntityState(delayedStartHoursEntity);
        if (currentState === 'unknown') {
          this.hass.callService('select', 'select_option', {
            entity_id: delayedStartHoursEntity,
            option: '0'
          });
        }
      }
      const delayedStartMinutesEntity = this._config.delayed_start_minutes_entity;
      if (delayedStartMinutesEntity) {
        const currentState = this._getEntityState(delayedStartMinutesEntity);
        if (currentState === 'unknown') {
          this.hass.callService('select', 'select_option', {
            entity_id: delayedStartMinutesEntity,
            option: '0'
          });
        }
      }
      const targetEntity =
        this._config.status_entity ||
        this._config.mode_entity ||
        this._config.start_entity;
      this.hass.callService('skycooker', 'start_cooking', {
        entity_id: targetEntity,
      });
      return;
    }
  }

  static get styles() {
    return skycookerCardStyles;
  }
}

// Красивый лог версии карточки в консоль
// eslint-disable-next-line no-console
console.log(
  '%cSkyCooker Card%c version %c' + CARD_VERSION,
  'background:#1e88e5;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:bold;',
  'background:#424242;color:#fff;padding:2px 6px 2px 4px;border-radius:0;font-weight:normal;',
  'background:#2e7d32;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;font-weight:bold;'
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'skycooker-ha-card',
  name: 'SkyCooker Card',
  description: 'Card for operating SkyCooker through Lovelace.',
  preview: true,
});
