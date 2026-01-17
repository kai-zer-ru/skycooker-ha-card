import { html, TemplateResult, CSSResult, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';

import { HomeAssistant } from './types';
import { SubscribeMixin, UnsubscribeFunc } from './subscribe-mixin';
import { getTranslation, getLanguage } from './localize';
import { CARD_VERSION } from './const';

@customElement('skycooker-ha-card')
export class SkyCookerHaCard extends SubscribeMixin {
  @property({ attribute: false })
  public hass?: HomeAssistant = undefined;

  @state()
  private _config?: any = undefined;
  
  @state()
  private _selectedMode?: string = 'all'; // По умолчанию показываем все режимы

  @state()
  private _selectedModeName: string = ''; // Отслеживаем имя нажатой кнопки режима

  @state()
  private _showSelectedTime: boolean = false; // Отслеживаем, нужно ли показывать выбранное время

  @state()
  private _isStartButtonPressed: boolean = false; // Отслеживаем, нажата ли кнопка старта

  private _initializeSelectedMode(): void {
    // Устанавливаем начальное состояние _selectedMode
    // Если есть избранные режимы, показываем их, иначе - все режимы
    this._selectedMode = this._hasFavoriteModes() ? 'favorite' : 'all';
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

  public static async getStubConfig(hass: HomeAssistant): Promise<Partial<any>> {
    return {
      type: `custom:skycooker-ha-card`,
      name: 'SkyCooker',
      icon: 'mdi:stove',
      language: hass.language || 'ru',
      mode_entity: '',
      additional_mode_entity: '',
      cooking_time_hours_entity: '',
      cooking_time_minutes_entity: '',
      delayed_start_hours_entity: '',
      delayed_start_minutes_entity: '',
      auto_warm_entity: '',
      start_entity: '',
      stop_entity: '',
      start_delayed_entity: '',
      temperature_entity: '',
      cooking_temperature_entity: '',
      remaining_time_entity: '',
      cooking_time_entity: '',
      status_entity: '',
      current_mode_entity: '',
      current_additional_mode_entity: '',
      auto_warm_time_entity: '',
      delayed_launch_time_entity: '',
      favorite_modes_entity: ''
    };
  }

  public setConfig(config?: any): void {
    if (!config) {
      throw new Error('Configuration is required');
    }
         
    // Приводим конфигурацию к новой структуре
    const newConfig = {
      type: config.type || 'custom:skycooker-ha-card',
      name: config.name || 'SkyCooker',
      icon: config.icon || 'mdi:stove',
      language: config.language || this.hass?.language || 'ru',
      mode_entity: config.mode_entity !== undefined ? config.mode_entity : '',
      additional_mode_entity: config.additional_mode_entity !== undefined ? config.additional_mode_entity : '',
      cooking_time_hours_entity: config.cooking_time_hours_entity !== undefined ? config.cooking_time_hours_entity : '',
      cooking_time_minutes_entity: config.cooking_time_minutes_entity !== undefined ? config.cooking_time_minutes_entity : '',
      delayed_start_hours_entity: config.delayed_start_hours_entity !== undefined ? config.delayed_start_hours_entity : '',
      delayed_start_minutes_entity: config.delayed_start_minutes_entity !== undefined ? config.delayed_start_minutes_entity : '',
      auto_warm_entity: config.auto_warm_entity !== undefined ? config.auto_warm_entity : '',
      start_entity: config.start_entity !== undefined ? config.start_entity : '',
      stop_entity: config.stop_entity !== undefined ? config.stop_entity : '',
      start_delayed_entity: config.start_delayed_entity !== undefined ? config.start_delayed_entity : '',
      temperature_entity: config.temperature_entity !== undefined ? config.temperature_entity : '',
      cooking_temperature_entity: config.cooking_temperature_entity !== undefined ? config.cooking_temperature_entity : '',
      remaining_time_entity: config.remaining_time_entity !== undefined ? config.remaining_time_entity : '',
      cooking_time_entity: config.cooking_time_entity !== undefined ? config.cooking_time_entity : '',
      status_entity: config.status_entity !== undefined ? config.status_entity : '',
      current_mode_entity: config.current_mode_entity !== undefined ? config.current_mode_entity : '',
      current_additional_mode_entity: config.current_additional_mode_entity !== undefined ? config.current_additional_mode_entity : '',
      auto_warm_time_entity: config.auto_warm_time_entity !== undefined ? config.auto_warm_time_entity : '',
      delayed_launch_time_entity: config.delayed_launch_time_entity !== undefined ? config.delayed_launch_time_entity : '',
      favorite_modes_entity: config.favorite_modes_entity !== undefined ? config.favorite_modes_entity : ''
    };
         
    this._config = newConfig;
    this._initializeSelectedMode();
  }

  public async connectedCallback(): Promise<void> {
    super.connectedCallback();
    // Добавляем слушатель событий для изменений конфигурации из редактора
    const handleConfigChanged = (ev: Event) => {
      const customEvent = ev as CustomEvent;
      if (customEvent.detail && customEvent.detail.config) {
        this._config = customEvent.detail.config;
        this.requestUpdate();
      }
    };
    this.addEventListener('config-changed', handleConfigChanged as EventListener);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    // Удаляем слушатель событий при отключении
    const handleConfigChanged = (ev: Event) => {
      const customEvent = ev as CustomEvent;
      if (customEvent.detail && customEvent.detail.config) {
        this._config = customEvent.detail.config;
        this.requestUpdate();
      }
    };
    this.removeEventListener('config-changed', handleConfigChanged as EventListener);
  }

  public hassSubscribe(): (() => Promise<UnsubscribeFunc>)[] {
    if (!this._config || !this.hass) return [];
   
    const entities = [
      this._config.mode_entity,
      this._config.additional_mode_entity,
      this._config.cooking_time_hours_entity,
      this._config.cooking_time_minutes_entity,
      this._config.delayed_start_hours_entity,
      this._config.delayed_start_minutes_entity,
      this._config.auto_warm_entity,
      this._config.start_entity,
      this._config.stop_entity,
      this._config.start_delayed_entity,
      this._config.cooking_temperature_entity,
      this._config.temperature_entity,
      this._config.remaining_time_entity,
      this._config.cooking_time_entity,
      this._config.status_entity,
      this._config.current_mode_entity,
      this._config.current_additional_mode_entity,
      this._config.auto_warm_time_entity,
      this._config.delayed_launch_time_entity,
      this._config.favorite_modes_entity,
    ].filter(entity => entity) as string[];
   
    return entities.map(entity => {
      return () => this.hass?.connection.subscribeEvents((event: any) => {
        if (event.data.entity_id === entity) {
          this._handleStateChange(event);
        }
      }, 'state_changed');
    });
  }
  
  private _handleStateChange(event: any): void {
   // Обновляем интерфейс
   this.requestUpdate();
     
   // Проверяем, изменилось ли состояние сущности, связанной с кнопкой "Старт"
   if (this._config?.start_entity && event.data.entity_id === this._config.start_entity) {
     // Сбрасываем состояние кнопки "Старт" при изменении состояния
     this._isStartButtonPressed = false;
   }
  }

  protected render(): TemplateResult {
   if (!this._config || !this.hass) {
     return html``;
   }
 
   // Проверяем, есть ли хотя бы один настроенный entity
   const hasAnyEntity = this._config.mode_entity ||
                       this._config.additional_mode_entity ||
                       this._config.cooking_time_hours_entity ||
                       this._config.cooking_time_minutes_entity ||
                       this._config.delayed_start_hours_entity ||
                       this._config.delayed_start_minutes_entity ||
                       this._config.auto_warm_entity ||
                       this._config.start_entity ||
                       this._config.stop_entity ||
                       this._config.start_delayed_entity ||
                       this._config.cooking_temperature_entity ||
                       this._config.temperature_entity ||
                       this._config.remaining_time_entity ||
                       this._config.cooking_time_entity ||
                       this._config.status_entity ||
                       this._config.current_mode_entity ||
                       this._config.current_additional_mode_entity ||
                       this._config.auto_warm_time_entity ||
                       this._config.delayed_launch_time_entity ||
                       this._config.favorite_modes_entity;
 
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
  // Получаем первую доступную сущность для отображения состояния
  const firstEntity = this._config.mode_entity ||
                     this._config.cooking_temperature_entity ||
                     this._config.temperature_entity ||
                     this._config.auto_warm_entity ||
                     this._config.start_entity;
  const firstEntityState = firstEntity ? this.hass?.states[firstEntity] : null;
 
  // Use cooking_temperature_entity if available, otherwise fall back to temperature_entity
  const temperatureEntity = this._config.cooking_temperature_entity || this._config.temperature_entity;

   return html`
 <ha-card class="new-design">
   <!-- Compact Header -->
   <div class="new-header">
     <div class="new-icon">
       <ha-icon .icon="${this._config.icon || 'mdi:stove'}"></ha-icon>
     </div>
     <div class="new-summary">
       <div class="new-name">
         ${this._config.name || 'SkyCooker'}
       </div>
     </div>
     <div class="new-status-indicator">
       ${firstEntityState?.state === 'on' ? html`<ha-icon icon="mdi:circle" style="color: var(--success-color);"></ha-icon>` :
        firstEntityState?.state === 'off' ? html`<ha-icon icon="mdi:circle" style="color: var(--error-color);"></ha-icon>` : ''}
     </div>
   </div>
   
   <!-- Main Controls Grid -->
   <div class="new-controls-grid">
      <!-- Temperature and Time -->
      <div class="new-control-group">
        ${this._shouldShowTemperature() ? html`
          <div class="new-control-item">
            <ha-icon icon="mdi:thermometer" class="new-control-icon"></ha-icon>
            <div class="new-control-content">
              <div class="new-control-label">${this._t('temperature')}</div>
              <div class="new-control-value">${this._getEntityState(temperatureEntity)}°C</div>
            </div>
          </div>
        ` : ''}
        
        <!-- Debug: Always show temperature entity info -->
        ${temperatureEntity ? html`
          <div style="display: none;" id="main-temperature-debug">
            Temperature entity configured: ${temperatureEntity}<br>
            Current temperature state: ${this._getEntityState(temperatureEntity)}
          </div>
        ` : ''}
        
        <!-- Time Sensors Container with flexible layout -->
        <div class="new-time-sensors-container">
          <!-- First row for time sensors -->
          <div class="new-time-sensors-row">
            <div class="new-control-item">
              <div class="new-control-label">${this._t('remaining')}</div>
              <div class="new-control-icon-value">
                <ha-icon icon="mdi:timer" class="new-control-icon"></ha-icon>
                <div class="new-control-value">${this._getEntityState(this._config.remaining_time_entity)}</div>
              </div>
            </div>
            
            <div class="new-control-item">
              <div class="new-control-label">${this._t('cooking_time_label')}</div>
              <div class="new-control-icon-value">
                <ha-icon icon="mdi:clock" class="new-control-icon"></ha-icon>
                <div class="new-control-value">${this._getEntityState(this._config.cooking_time_entity)}</div>
              </div>
            </div>
          </div>
          
          <!-- Second row for conditional time sensors -->
          <div class="new-time-sensors-row">
            <!-- Auto Warm Time Sensor -->
            ${this._shouldShowAutoWarmTime() ? html`
              <div class="new-control-item">
                <div class="new-control-label">${this._t('auto_warm_time')}</div>
                <div class="new-control-icon-value">
                  <ha-icon icon="mdi:clock-start" class="new-control-icon"></ha-icon>
                  <div class="new-control-value">${this._getEntityState(this._config.auto_warm_time_entity)}</div>
                </div>
              </div>
            ` : ''}
            
            <!-- Delayed Launch Time Sensor -->
            ${this._shouldShowDelayedLaunchTime() ? html`
              <div class="new-control-item">
                <div class="new-control-label">${this._t('delayed_launch')}</div>
                <div class="new-control-icon-value">
                  <ha-icon icon="mdi:timer-sand" class="new-control-icon"></ha-icon>
                  <div class="new-control-value">${this._getEntityState(this._config.delayed_launch_time_entity)}</div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        </div>
        
        <!-- Mode Selection -->
        <div class="new-control-group">
          <div class="new-mode-selector">
            <div class="new-mode-label" style="text-align: center;">${this._t('status')}: ${this._getEntityState(this._config.current_mode_entity)} - ${this._getEntityState(this._config.status_entity)}</div>
            <!-- Selected mode display - always shown -->
            <div class="new-selected-mode">
              ${this._t('selected_mode')}: <span class="selected-mode-text">${this._selectedModeName || '-----'}</span>
            </div>
            <!-- Selected time display - always shown -->
            <div class="new-selected-time">
              ${this._t('selected_time')}: <span class="selected-time-text">${this._getSelectedTime() || '-----'}</span>
            </div>
            
            ${this._config.mode_entity ? html`
              <!-- Hidden select that syncs with integration -->
              <ha-select
                class="new-mode-hidden-select"
                .value=${this._getEntityState(this._config.mode_entity)}
                @selected=${(ev: any) => this._handleSelectChange(this._config.mode_entity, ev)}
                @closed=${(ev: any) => ev.stopPropagation()}
              >
                ${this._getSelectOptions(this._config.mode_entity)}
              </ha-select>
              
              <!-- Tabs for favorite and all modes -->
              ${this._hasFavoriteModes() ? html`
                <div class="new-mode-tabs">
                  <div class="new-mode-tab ${this._selectedMode === 'favorite' ? 'active' : ''}" @click=${() => this._showFavoriteModes()}>${this._t('favorite_modes')}</div>
                  <div class="new-mode-tab ${this._selectedMode === 'all' ? 'active' : ''}" @click=${() => this._showAllModes()}>${this._t('all_modes')}</div>
                </div>
              ` : ''}
              
              <div class="new-mode-buttons">
                ${this._selectedMode === 'favorite' ?
                  this._getFavoriteModeButtons(this._config.mode_entity) :
                  this._getModeButtons(this._config.mode_entity)}
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Auto Warm Time Sensor moved to main controls -->
        ${this._shouldShowAutoWarmTime() ? html`
          <div class="new-control-item">
            <ha-icon icon="mdi:clock-start" class="new-control-icon"></ha-icon>
            <div class="new-control-content">
              <div class="new-control-label">${this._t('auto_warm_time')}</div>
              <div class="new-control-value">${this._getEntityState(this._config.auto_warm_time_entity)}</div>
            </div>
          </div>
        ` : ''}
   </div>
   
   <!-- Action Buttons in compact layout -->
   <div class="new-action-buttons">
     ${this._config.start_entity ? html`
       <ha-button
         @click=${() => this._handleButtonPress(this._config.start_entity)}
         class="new-action-button"
         .label=${this._t('start')}
       >
         <ha-icon icon="mdi:play"></ha-icon>
       </ha-button>
     ` : ''}
     
     ${this._config.stop_entity ? html`
       <ha-button
         @click=${() => this._handleButtonPress(this._config.stop_entity)}
         class="new-action-button"
         .label=${this._t('stop')}
       >
         <ha-icon icon="mdi:stop"></ha-icon>
       </ha-button>
     ` : ''}
     
     ${this._config.start_delayed_entity ? html`
       <ha-button
         @click=${() => this._handleButtonPress(this._config.start_delayed_entity)}
         class="new-action-button"
         .label=${this._t('start_delayed')}
       >
         <ha-icon icon="mdi:timer-play"></ha-icon>
       </ha-button>
     ` : ''}
   </div>
   
   <!-- Additional Controls (collapsible) -->
<div class="new-additional-controls">
 <div class="new-section-header" @click=${() => this._toggleAdditionalControls()}>
 <ha-icon icon="mdi:cog"></ha-icon>
 <span>${this._t('additional_settings')}</span>
 <ha-icon icon="mdi:chevron-down" class="new-expand-icon"></ha-icon>
</div>
     
     <div class="new-additional-content" style="display: none;">
       <!-- Auto Warm with Time -->
       ${this._config.auto_warm_entity ? html`
         <div class="new-auto-warm-section">
           <div class="new-auto-warm-header">
             <ha-icon icon="mdi:heat-wave"></ha-icon>
             <span class="new-auto-warm-label">${this._t('auto_warm')}</span>
             <ha-switch
               .checked=${this._getEntityState(this._config.auto_warm_entity) === 'on'}
               @change=${(ev: any) => this._handleSwitchChange(this._config.auto_warm_entity, ev.target.checked)}
             ></ha-switch>
           </div>
         </div>
       ` : ''}
       
       <!-- Temperature Select (hidden secondary option) -->
       ${this._config.cooking_temperature_entity || this._config.temperature_entity ? html`
         <div class="new-temperature-section">
           <div class="new-temperature-header">
             <ha-icon icon="mdi:thermometer"></ha-icon>
             <span class="new-temperature-label">${this._t('temperature')}</span>
           </div>
           <div class="new-temperature-select-container">
             <ha-select
               class="new-temperature-hidden-select"
               .value=${this._getEntityState(this._config.cooking_temperature_entity || this._config.temperature_entity)}
               @selected=${(ev: any) => this._handleSelectChange(this._config.cooking_temperature_entity || this._config.temperature_entity, ev)}
               @closed=${(ev: any) => ev.stopPropagation()}
             >
               ${this._getTemperatureOptionsWithFallback()}
             </ha-select>
           </div>
         </div>
       ` : ''}
       
       <!-- Debug info for temperature select -->
       ${this._config.cooking_temperature_entity || this._config.temperature_entity ? html`
         <div style="display: none;" id="temperature-debug-info">
           Temperature Entity: ${this._config.cooking_temperature_entity || this._config.temperature_entity}<br>
           Current State: ${this._getEntityState(this._config.cooking_temperature_entity || this._config.temperature_entity)}<br>
           Options Count: ${this._getSelectOptions(this._config.cooking_temperature_entity || this._config.temperature_entity).length}
         </div>
       ` : ''}
       
       <!-- Cooking Time Section -->
       ${this._config.cooking_time_hours_entity && this._config.cooking_time_minutes_entity ? html`
         <div class="new-cooking-time-section">
           <div class="new-cooking-time-header">
             <ha-icon icon="mdi:clock"></ha-icon>
             <span class="new-cooking-time-label">${this._t('cooking_time_label')}</span>
           </div>
           <div class="new-cooking-time-controls">
             <ha-select
               .value=${this._getEntityState(this._config.cooking_time_hours_entity)}
               @selected=${(ev: any) => this._handleSelectChange(this._config.cooking_time_hours_entity, ev)}
               @closed=${(ev: any) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.cooking_time_hours_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('hours')} </span>
             <ha-select
               .value=${this._getEntityState(this._config.cooking_time_minutes_entity)}
               @selected=${(ev: any) => this._handleSelectChange(this._config.cooking_time_minutes_entity, ev)}
               @closed=${(ev: any) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.cooking_time_minutes_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('minutes')}</span>
           </div>
         </div>
       ` : ''}
       
       <!-- Delayed Start Section -->
       ${this._config.delayed_start_hours_entity && this._config.delayed_start_minutes_entity ? html`
         <div class="new-cooking-time-section">
           <div class="new-cooking-time-header">
             <ha-icon icon="mdi:timer-sand"></ha-icon>
             <span class="new-cooking-time-label">${this._t('delayed_start')}</span>
           </div>
           <div class="new-cooking-time-controls">
             <ha-select
               .value=${this._getEntityState(this._config.delayed_start_hours_entity)}
               @selected=${(ev: any) => this._handleSelectChange(this._config.delayed_start_hours_entity, ev)}
               @closed=${(ev: any) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.delayed_start_hours_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('hours')} </span>
             <ha-select
               .value=${this._getEntityState(this._config.delayed_start_minutes_entity)}
               @selected=${(ev: any) => this._handleSelectChange(this._config.delayed_start_minutes_entity, ev)}
               @closed=${(ev: any) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.delayed_start_minutes_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('minutes')}</span>
           </div>
         </div>
       ` : ''}
          <!-- Delayed Start Time Sensor (removed from additional controls as it's now in main controls) -->
     </div>
   </div>
   
 </ha-card>
`;
 }

 private _toggleAdditionalControls(): void {
   const content = this.shadowRoot?.querySelector('.new-additional-content') as HTMLElement | null;
   const icon = this.shadowRoot?.querySelector('.new-expand-icon') as HTMLElement | null;
   
   if (content && icon) {
     if (content.style.display === 'none') {
       content.style.display = 'block';
       icon.setAttribute('icon', 'mdi:chevron-up');
     } else {
       content.style.display = 'none';
       icon.setAttribute('icon', 'mdi:chevron-down');
     }
   }
 }

  private _getEntityState(entityId: string): string {
    if (!entityId || !this.hass) return 'N/A';
    
    const state = this.hass.states[entityId]?.state || 'N/A';
    
    return state;
  }
  
  private _getTemperatureOptionsWithFallback(): TemplateResult[] {
   // Special method for temperature select with enhanced fallback logic
   
   // Use cooking_temperature_entity if available, otherwise fall back to temperature_entity
   const temperatureEntity = this._config.cooking_temperature_entity || this._config.temperature_entity;
    
   if (!temperatureEntity) {
     return [];
   }
    
   // Debug: Check if hass is available
   if (!this.hass) {
     return [];
   }
    
   // Debug: Check if entity exists in hass
   if (!this.hass.states[temperatureEntity]) {
     return [];
   }
    
   // Debug: Check entity state
   const stateObj = this.hass.states[temperatureEntity];
    
   // Debug: Check if attributes exist
   if (!stateObj.attributes) {
     return [];
   }
    
   // Debug: Check all possible attribute names for temperature options
   const possibleAttributeNames = ['options', 'temperature_options', 'values', 'list', 'temperature_values', 'temperature_list', 'temp_options', 'temp_values'];
    
   // First try the standard method
   const standardOptions = this._getSelectOptions(temperatureEntity);
    
   if (standardOptions && standardOptions.length > 0) {
     return standardOptions;
   }
    
   // If no options found, try to get state object directly
   
   // Use the stateObj we already have
   
   // Try different attribute names for temperature options (reuse the same array)
   
   for (const attrName of possibleAttributeNames) {
     if (stateObj.attributes && stateObj.attributes[attrName]) {
       let options = stateObj.attributes[attrName] as string[];
        
       // If options is not an array, try to convert it
       if (!Array.isArray(options)) {
         if (typeof options === 'object' && options !== null) {
           options = Object.values(options) as string[];
         } else if (typeof options === 'string') {
           options = (options as string).split(',').map((item: string) => item.trim());
         }
       }
        
       // Filter out invalid options
       const filteredOptions = options.filter(option =>
         option !== 'unknown' && option !== '' && option !== null && option !== undefined
       );
        
       if (filteredOptions.length > 0) {
         return filteredOptions.map((option: string) => html`
           <mwc-list-item value=${option}>${option}</mwc-list-item>
         `);
       }
     }
   }
    
  // Try to get temperature options from state object directly
  if (stateObj.attributes) {
    const allOptions: string[] = [];
     
    // Look for any attribute that might contain temperature values
    for (const [key, value] of Object.entries(stateObj.attributes)) {
      if (typeof value === 'string' && (value.includes('°C') || value.includes('C') || !isNaN(Number(value)))) {
        allOptions.push(value);
      } else if (Array.isArray(value)) {
        const filtered = value.filter(item => typeof item === 'string' && item !== 'unknown' && item !== '');
        allOptions.push(...filtered);
      }
    }
     
    if (allOptions.length > 0) {
      return allOptions.map((option: string) => html`
        <mwc-list-item value=${option}>${option}</mwc-list-item>
      `);
    }
  }
    
   // Return default temperature options as last resort
   const defaultTemperatures = ['50', '60', '70', '80', '90', '100'];
    
   return defaultTemperatures.map((temp: string) => html`
     <mwc-list-item value=${temp}>${temp}°C</mwc-list-item>
   `);
 }
  
  private _shouldShowTemperature(): boolean {
   // Показывать температуру только если выбран режим "Мультиповар" и идёт процесс
   const currentMode = this._getEntityState(this._config.current_mode_entity);
   const status = this._getEntityState(this._config.status_entity);
    
   // Проверяем, что режим "Мультиповар" и статус указывает на активный процесс
   const result = currentMode === 'Мультиповар' &&
                 (status === 'on' || status === 'heating' || status === 'delayed_start');
    
   return result;
 }
  
  private _calculateProgress(): number {
   if (!this._config || !this.hass) return 100;
  
   const status = this._getEntityState(this._config.status_entity);
   const remainingTime = this._getEntityState(this._config.remaining_time_entity);
   const cookingTime = this._getEntityState(this._config.cooking_time_entity);
  
   // Проверяем статус - прогресс отображается только для "Разогрев" и "Готовка" (или "Warming" и "Cooking")
   const validStatuses = ['Разогрев', 'Готовка', 'Warming', 'Cooking'];
   if (!validStatuses.includes(status)) {
     return 100; // Значение по умолчанию
   }
  
   if (remainingTime === 'N/A' || cookingTime === 'N/A') return 100;
  
   const remaining = parseFloat(remainingTime);
   const cooking = parseFloat(cookingTime);
   if (isNaN(remaining) || isNaN(cooking) || cooking === 0) return 100;
  
   // Рассчитываем прогресс: (осталось / общее) * 100, шкала уменьшается
   const progress = (remaining / cooking) * 100;
   return Math.round(progress);
 }
  
  private _showProgress: boolean = false; // Флаг для управления отображением прогресса
 
   private _shouldShowProgress(): boolean {
     // Показывать прогресс только для статусов "Разогрев" и "Готовка" (или "Warming" и "Cooking")
     const status = this._getEntityState(this._config.status_entity);
     const validStatuses = ['Разогрев', 'Готовка', 'Warming', 'Cooking'];
     return validStatuses.includes(status) && this._showProgress;
   }
  
  private _shouldShowAutoWarmTime(): boolean {
    // Показывать время авторазогрева только для статусов "Подогрев" или "Auto Warm"
    const status = this._getEntityState(this._config.status_entity);
    const validStatuses = ['Подогрев', 'Auto Warm'];
    return validStatuses.includes(status) && !!this._config.auto_warm_time_entity;
  }
  
  private _shouldShowDelayedLaunchTime(): boolean {
    // Показывать время отложенного запуска только для статусов "Отложенный старт" или "Delayed Launch"
    const status = this._getEntityState(this._config.status_entity);
    const validStatuses = ['Отложенный старт', 'Delayed Launch'];
    return validStatuses.includes(status) && !!this._config.delayed_launch_time_entity;
  }
  
  private _shouldShowSelectedMode(): boolean {
  // Показывать нажатую кнопку режима
  if (!this._config?.mode_entity || !this.hass || !this._selectedModeName) return false;
    
  // Проверяем, что выбранный режим не является режимом ожидания
  const standbyModes = ['Нет', 'Режим ожидания', 'None', 'Standby Mode', ''];
  if (standbyModes.includes(this._selectedModeName)) return false;
    
  // Показываем нажатую кнопку независимо от текущего режима
  return true;
}

  private _shouldShowSelectedTime(): boolean {
  // Показывать выбранное время только если кнопка режима была нажата и есть данные о времени приготовления
  if (!this._showSelectedTime || !this._config?.cooking_time_hours_entity || !this._config?.cooking_time_minutes_entity || !this.hass) return false;
     
  const hours = this._getEntityState(this._config.cooking_time_hours_entity);
  const minutes = this._getEntityState(this._config.cooking_time_minutes_entity);
     
  // Показываем время, если хотя бы одно из значений не равно 'N/A' или пусто
  return (hours !== 'N/A' && hours !== '') || (minutes !== 'N/A' && minutes !== '');
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

  private _hasFavoriteModes(): boolean {
   // Проверяем, добавлена ли сущность favorite_modes_entity
   if (!this._config?.favorite_modes_entity) {
     return false;
   }

   // Если hass недоступен, но сущность задана, возвращаем true
   if (!this.hass) {
     return true;
   }

   const favoriteModesState = this.hass.states[this._config.favorite_modes_entity];
   if (!favoriteModesState || !favoriteModesState.attributes) {
     return false;
   }

   // Проверяем наличие атрибута options
   let favoriteModes: string[] = [];

   // Пробуем получить options из разных возможных атрибутов
   if (favoriteModesState.attributes.options) {
     favoriteModes = favoriteModesState.attributes.options as string[];
   } else if (favoriteModesState.attributes.list) {
     // Некоторые сущности могут использовать 'list' вместо 'options'
     favoriteModes = favoriteModesState.attributes.list as string[];
   } else if (favoriteModesState.attributes.favorite_modes) {
     // Прямой атрибут с избранными режимами
     favoriteModes = favoriteModesState.attributes.favorite_modes as string[];
   } else if (favoriteModesState.attributes.modes) {
     // Атрибут с режимами
     favoriteModes = favoriteModesState.attributes.modes as string[];
   } else if (favoriteModesState.attributes.favoriteModes) {
     // Прямой атрибут с избранными режимами (с большой буквы)
     favoriteModes = favoriteModesState.attributes.favoriteModes as string[];
   } else if (favoriteModesState.attributes.favorites) {
     // Атрибут с избранными режимами
     favoriteModes = favoriteModesState.attributes.favorites as string[];
   } else if (favoriteModesState.attributes.favorite_list) {
     // Атрибут с избранными режимами
     favoriteModes = favoriteModesState.attributes.favorite_list as string[];
   }

   // Если массив избранных режимов пуст или не содержит валидных элементов, возвращаем false
   if (!favoriteModes || favoriteModes.length === 0) {
     return false;
   }

   // Фильтруем пустые и невалидные элементы
   const filteredModes = favoriteModes.filter(mode => mode && typeof mode === 'string' && mode.trim() !== '');

   // Если после фильтрации нет элементов, возвращаем false
   if (filteredModes.length === 0) {
     return false;
   }

   // Если сущность задана и опций больше 0, возвращаем true
   return true;
  }
  
 private _getSelectOptions(entityId: string): TemplateResult[] {
   if (!entityId || !this.hass) {
     return [];
   }
    
   const stateObj = this.hass.states[entityId];
   if (!stateObj) {
     return [];
   }
    
   if (!stateObj.attributes) {
     return [];
   }
    
   if (!stateObj.attributes.options) {
     // Try to get options from other possible attributes for temperature entities
     if (stateObj.attributes.temperature_options) {
       stateObj.attributes.options = stateObj.attributes.temperature_options;
     } else if (stateObj.attributes.values) {
       stateObj.attributes.options = stateObj.attributes.values;
     } else if (stateObj.attributes.list) {
       stateObj.attributes.options = stateObj.attributes.list;
     } else {
       return [];
     }
   }
    
   // Фильтруем 'unknown' и режимы ожидания из опций для режима готовки
   const filteredOptions = stateObj.attributes.options.filter((option: string) =>
     option !== 'unknown' && option !== 'Нет' && option !== 'Режим ожидания' &&
     option !== 'None' && option !== 'Standby Mode' && option !== ''
   );
    
   // Ensure we have valid options
   if (!filteredOptions || filteredOptions.length === 0) {
     return [];
   }
    
   return filteredOptions.map((option: string) => html`
     <mwc-list-item value=${option}>${option}</mwc-list-item>
   `);
 }
  
  private _getModeButtons(entityId: string): TemplateResult[] {
    if (!entityId || !this.hass) return [];
  
    const stateObj = this.hass.states[entityId];
    if (!stateObj || !stateObj.attributes || !stateObj.attributes.options) {
      return [];
    }
  
    const currentValue = this._getEntityState(entityId);
       
    // Фильтруем ненужные режимы, включая 'unknown'
    const filteredOptions = stateObj.attributes.options.filter((option: string) =>
      option !== 'Нет' && option !== 'Режим ожидания' &&
      option !== 'None' && option !== 'Standby Mode' &&
      option !== '' && option !== 'unknown'
    );
         
    return filteredOptions.map((option: string) => {
      // Определяем иконку для каждого режима
      let icon = '';
      switch(option.toLowerCase()) {
        case 'мультиповар':
          icon = 'mdi:pot-mix';
          break;
        case 'выпечка':
          icon = 'mdi:bread-slice';
          break;
        case 'гриль':
          icon = 'mdi:grill';
          break;
        case 'пароварка':
          icon = 'mdi:steam';
          break;
        case 'жарка':
          icon = 'mdi:frying-pan';
          break;
        case 'тушение':
          icon = 'mdi:pot-steam';
          break;
        case 'разогрев':
          icon = 'mdi:microwave';
          break;
        case 'йогурт':
          icon = 'mdi:cup';
          break;
        case 'молочная каша':
          icon = 'mdi:bowl-mix';
          break;
        case 'каша':
          icon = 'mdi:bowl';
          break;
        case 'суп':
          icon = 'mdi:soup';
          break;
        case 'жарка на воздухе':
          icon = 'mdi:air-filter';
          break;
        case 'ферментация':
          icon = 'mdi:leaf';
          break;
        case 'пастеризация':
          icon = 'mdi:thermometer-water';
          break;
        case 'сушка':
          icon = 'mdi:fan';
          break;
        default:
          icon = 'mdi:stove';
      }
        
      return html`
        <div class="new-mode-button-wrapper">
          <ha-button
            class="new-mode-button"
            @click=${() => this._handleModeButtonClick(entityId, option)}
          >
            <span class="mode-button-text">${option}</span>
          </ha-button>
        </div>
      `;
    });
  }

  private _getFavoriteModes(): string[] {
    // Получаем список избранных режимов
    if (!this._config?.favorite_modes_entity || !this.hass) return [];
    
    const favoriteModesState = this.hass.states[this._config.favorite_modes_entity];
    if (!favoriteModesState || !favoriteModesState.attributes) {
      return [];
    }
    
    // Пробуем получить options из разных возможных атрибутов
    let favoriteModes: string[] = [];
    
    if (favoriteModesState.attributes.options) {
      favoriteModes = favoriteModesState.attributes.options as string[];
    } else if (favoriteModesState.attributes.list) {
      // Некоторые сущности могут использовать 'list' вместо 'options'
      favoriteModes = favoriteModesState.attributes.list as string[];
    } else if (favoriteModesState.attributes.favorite_modes) {
      // Прямой атрибут с избранными режимами
      favoriteModes = favoriteModesState.attributes.favorite_modes as string[];
    } else if (favoriteModesState.attributes.modes) {
      // Атрибут с режимами
      favoriteModes = favoriteModesState.attributes.modes as string[];
    }
    
    // Дополнительная проверка: если favoriteModes не является массивом, пытаемся преобразовать
    if (!Array.isArray(favoriteModes)) {
      if (typeof favoriteModes === 'object' && favoriteModes !== null) {
        // Если это объект, пытаемся извлечь значения
        favoriteModes = Object.values(favoriteModes) as string[];
      } else if (typeof favoriteModes === 'string') {
        // Если это строка, пытаемся разделить её
        favoriteModes = (favoriteModes as string).split(',').map(item => item.trim());
      }
    }
    
    // Фильтруем пустые и невалидные элементы
    const filteredModes = favoriteModes.filter(mode => mode && typeof mode === 'string' && mode.trim() !== '');
    
    return filteredModes;
  }

  private _getFavoriteModeButtons(entityId: string): TemplateResult[] {
    // Получаем кнопки только для избранных режимов
    const favoriteModes = this._getFavoriteModes();
    if (favoriteModes.length === 0) return [];
    
    // Фильтруем режимы ожидания из избранных режимов
    const filteredFavoriteModes = favoriteModes.filter((option: string) =>
      option !== 'Нет' && option !== 'Режим ожидания' &&
      option !== 'None' && option !== 'Standby Mode' &&
      option !== '' && option !== 'unknown'
    );
    
    if (filteredFavoriteModes.length === 0) return [];
    
    const currentValue = this._getEntityState(entityId);
    
    return filteredFavoriteModes.map((option: string) => {
      // Определяем иконку для каждого режима
      let icon = '';
      switch(option.toLowerCase()) {
        case 'мультиповар':
          icon = 'mdi:pot-mix';
          break;
        case 'выпечка':
          icon = 'mdi:bread-slice';
          break;
        case 'гриль':
          icon = 'mdi:grill';
          break;
        case 'пароварка':
          icon = 'mdi:steam';
          break;
        case 'жарка':
          icon = 'mdi:frying-pan';
          break;
        case 'тушение':
          icon = 'mdi:pot-steam';
          break;
        case 'разогрев':
          icon = 'mdi:microwave';
          break;
        case 'йогурт':
          icon = 'mdi:cup';
          break;
        case 'молочная каша':
          icon = 'mdi:bowl-mix';
          break;
        case 'каша':
          icon = 'mdi:bowl';
          break;
        case 'суп':
          icon = 'mdi:soup';
          break;
        case 'жарка на воздухе':
          icon = 'mdi:air-filter';
          break;
        case 'ферментация':
          icon = 'mdi:leaf';
          break;
        case 'пастеризация':
          icon = 'mdi:thermometer-water';
          break;
        case 'сушка':
          icon = 'mdi:fan';
          break;
        default:
          icon = 'mdi:stove';
      }
       
      return html`
        <div class="new-mode-button-wrapper">
          <ha-button
            class="new-mode-button"
            @click=${() => this._handleModeButtonClick(entityId, option)}
          >
            <span class="mode-button-text">${option}</span>
          </ha-button>
        </div>
      `;
    });
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
   
  try {
    // Устанавливаем выбранный режим как нажатую кнопку
    this._selectedModeName = option; // Используем новую переменную для имени режима
    this._showSelectedTime = true; // Показываем выбранное время при нажатии кнопки режима
    this.requestUpdate();
         
    // Находим скрытый селект и программно устанавливаем значение
    const hiddenSelect = this.shadowRoot?.querySelector('.new-mode-hidden-select') as any;
    if (hiddenSelect) {
      hiddenSelect.value = option;
          
      // Диспатчим событие selected, чтобы триггернуть обновление
      const event = new CustomEvent('selected', {
        detail: { value: option },
        bubbles: true,
        composed: true
      });
      hiddenSelect.dispatchEvent(event);
    }
  } catch (error) {
    // Тихая обработка ошибок
  }
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
      // Устанавливаем пустую строку для select.skycooker_rmc_m40s_rezhim_gotovki
      const modeEntity = this._config.mode_entity;
      if (modeEntity) {
        // Убедимся, что устанавливаем пустую строку, а не 'unknown'
        let optionToSet = this._t('standby_mode');
        if (this._getEntityState(modeEntity) === 'unknown') {
          optionToSet = this._t('standby_mode');
        }
        this.hass.callService('select', 'select_option', {
          entity_id: modeEntity,
          option: optionToSet
        });
      }
      // Сбрасываем состояние кнопки "Старт"
      this._isStartButtonPressed = false;
        
      // Скрываем прогресс-бар при нажатии на кнопку "Стоп"
      this._showProgress = false;
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
      // Обновляем состояние кнопки "Старт"
      this._isStartButtonPressed = false;
      this.requestUpdate();
    }
 
    this.hass.callService('button', 'press', {
      entity_id: entityId
    });
  }

  static get styles(): CSSResult {
    return css`
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
      .main-status {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
       gap: 12px;
       margin: 10px 0;
     }
      .status-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .status-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        flex: 1;
      }
      .status-value {
        font-size: 16px;
        font-weight: bold;
      }
      .mode-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .mode-controls {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .mode-label {
        font-size: 16px;
        font-weight: bold;
      }
      .mode-value {
        font-size: 18px;
        color: var(--primary-color);
      }
      .controls-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .control-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .control-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .delayed-start-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .section-title {
        font-size: 16px;
        font-weight: bold;
      }
      .switches-section {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .switch-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .switch-label {
        font-size: 14px;
      }
      .action-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      ha-select {
        min-width: 120px;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color);
        --mdc-theme-secondary: var(--secondary-color);
      }
      .progress-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .progress-label {
        font-size: 16px;
        font-weight: bold;
      }
      .progress-bar {
        width: 100%;
        height: 20px;
        background-color: var(--divider-color);
        border-radius: 10px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        transition: width 0.3s ease;
      }
      .setup-message {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 16px;
      }
      
      /* New Design Styles - Mushroom-inspired */
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
       gap: 8px;
       padding: 8px 0;
       border-bottom: 1px solid var(--divider-color);
     }
      
      .new-icon {
        font-size: 36px;
        color: var(--primary-color);
      }
      
      .new-summary {
       display: flex;
       flex-direction: column;
       align-items: center;
       text-align: center;
     }
      
      .new-name {
        font-size: 20px;
        font-weight: bold;
      }
      
      .new-state {
        font-size: 14px;
        color: var(--secondary-text-color);
      }
      
      .new-status-indicator {
        font-size: 20px;
      }
      
      .new-progress {
        margin: 8px 0;
      }
      
      .new-progress-bar {
        width: 100%;
        height: 16px;
        background-color: var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }
      
      .new-progress-fill {
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        transition: width 0.3s ease;
      }
      
      .new-controls-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .new-control-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 12px;
        border: 1px solid var(--divider-color);
      }
      
      .new-control-item {
        display: flex;
        align-items: center;
        gap: 10px;
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
        font-size: 15px;
        color: var(--secondary-text-color);
      }
      
      .new-control-value {
        font-size: 16px;
        font-weight: bold;
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
        font-size: 14px;
        font-weight: bold;
      }
      
      .new-mode-value {
        font-size: 16px;
        color: var(--primary-color);
        font-weight: bold;
      }
      
      .new-mode-values {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }
      
      .new-selected-mode {
        font-size: 15px;
        color: var(--secondary-text-color);
        text-align: center;
        font-family: 'Arial', sans-serif;
        font-weight: bold;
      }
          
      .selected-mode-text {
        font-size: 15px;
        font-weight: bold;
        color: var(--primary-color);
        margin-left: 4px;
        font-family: 'Arial', sans-serif;
      }
          
      .new-selected-time {
        font-size: 15px;
        color: var(--secondary-text-color);
        text-align: center;
        min-height: 20px; /* Reserve space to prevent layout shift */
        font-family: 'Arial', sans-serif;
        font-weight: bold;
      }
          
      .selected-time-text {
        font-size: 15px;
        font-weight: bold;
        color: var(--primary-color);
        margin-left: 4px;
        font-family: 'Arial', sans-serif;
      }
      
      .new-mode-select {
        min-width: 120px;
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        --mdc-menu-min-width: 120px;
        border-radius: 8px;
        background-color: var(--card-background-color);
        height: 36px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        border: none;
      }
      
      /* Hidden mode select - completely invisible but functional */
      .new-mode-hidden-select {
        display: none;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        border: none;
        pointer-events: none;
      }
      
      /* Mode tabs container */
      .new-mode-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
        justify-content: center;
      }
      
      .new-mode-tab {
        padding: 8px 16px;
        background-color: var(--card-background-color);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.2s ease;
        border: 1px solid var(--divider-color);
      }
      
      .new-mode-tab.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
      
      .new-mode-tab:hover {
        background-color: var(--card-background-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      /* Mode buttons container */
      .new-mode-buttons {
       display: flex;
       flex-wrap: wrap;
       gap: 4px;
       margin-top: 4px;
     }
      
      /* Mode buttons container */
      .new-mode-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0px;
        margin-top: 0px;
        justify-content: center;
      }
      
      /* Mode button wrapper for consistent sizing */
      .new-mode-button-wrapper {
       flex: 1 1 calc(50% - 8px);
       min-width: 120px;
       max-width: 200px;
       display: flex;
       justify-content: center;
     }

      /* Mode button styling */
      .new-mode-button {
       --mdc-theme-primary: var(--primary-color);
       --mdc-theme-secondary: var(--secondary-color);
       border-radius: 8px;
       padding: 4px 10px;
       font-size: 14px;
       background-color: var(--card-background-color);
       border: none;
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

      .new-mode-button .mode-button-text {
       font-size: 15px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       max-width: 100%;
     }
      
      /* Mode button hover effect */
      .new-mode-button:hover {
        background-color: var(--card-background-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .new-mode-select .mdc-select__anchor {
        border-radius: 12px !important;
      }
      
      .new-action-buttons {
       display: flex;
       justify-content: center;
       gap: 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin-top: -10px;
       margin-bottom: -30px;
     }
      
      .new-action-button {
       --mdc-theme-primary: var(--primary-color);
       --mdc-theme-secondary: var(--secondary-color);
       border-radius: 50%;
       width: 72px;
       height: 72px;
       padding: 0;
       display: flex;
       align-items: center;
       justify-content: center;
       position: relative;
       background-color: var(--card-background-color);
       transition: all 0.2s ease;
     }

        .new-action-button ha-icon {
          width: 32px;
          height: 32px;
          opacity: 1;
          filter: brightness(1);
          font-size: 32px;
        }

      .new-action-button.pressed {
        background-color: var(--card-background-color);
        box-shadow: none;
      }

      .new-action-button.pressed ha-icon {
        color: var(--primary-color);
      }
       
      
      .new-action-button::after {
        content: attr(label);
        position: absolute;
        bottom: -24px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      
      .new-additional-controls {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        background-color: var(--card-background-color);
        border-radius: 8px;
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
        font-size: 16px;
        font-weight: 700;
      }
      
      .new-expand-icon {
        font-size: 20px;
        transition: transform 0.3s ease;
      }
      
      .new-additional-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 8px;
        border-top: 1px solid var(--divider-color);
      }
      
      .new-switch-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .new-switch-label {
        flex: 1;
        font-size: 14px;
      }
      
      .new-time-controls-section {
       display: flex;
       flex-direction: column;
       gap: 8px;
       margin-bottom: 12px;
       padding: 16px 12px 32px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       border: 1px solid var(--divider-color);
     }

     .new-time-controls-container {
       display: flex;
       flex-direction: column;
       gap: 36px;
       align-items: center;
     }
       
      .new-time-control {
        display: flex;
        align-items: center;
        gap: 6px;
      }
       
        .new-delayed-start-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      
      .new-delayed-start-time-controls {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .new-time-control ha-select {
        width: 40%;
        min-width: 70px;
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        --mdc-menu-min-width: 70px;
        height: 36px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .new-time-control ha-select .mdc-select__anchor {
        border-radius: 12px !important;
      }
      
      .new-time-control span {
        font-size: 14px;
        font-weight: bold;
      }
       
      /* Inline time control styling */
      .new-time-control-inline {
       display: flex;
       align-items: center;
       gap: 8px;
       flex-wrap: wrap;
       width: 100%;
       justify-content: center;
       margin-top: 20px;
     }
       
      .new-time-control-inline ha-select {
        width: 25%;
        min-width: 60px;
        max-width: 80px;
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        --mdc-menu-min-width: 60px;
        height: 36px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
       
      /* Ensure inline controls have proper spacing */
      .new-time-controls, .new-delayed-start-time-controls {
        width: 100%;
      }
       
      /* Sensor styling for delayed launch and auto warm time */
      .new-delayed-time-sensor, .new-auto-warm-time-sensor {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background-color: var(--card-background-color);
        border-radius: 12px;
        margin-top: 8px;
        border: 1px solid var(--divider-color);
      }
       
      .new-sensor-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        flex: 1;
      }
       
      .new-sensor-value {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-text-color);
      }
       
      /* Improved button styling with tooltips */
      .new-action-button::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: var(--card-background-color);
        border-radius: 50%;
        z-index: -1;
        transition: transform 0.2s ease;
      }
      
       
      /* Mushroom-inspired card header */
      .new-header {
        padding: 12px;
        background: linear-gradient(135deg, var(--primary-color) 0%, rgba(0,0,0,0) 100%);
        border-radius: 12px;
        margin: -12px -12px 12px -12px;
      }
       
      .new-name {
        color: white;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      }
       
      .new-state {
        color: rgba(255,255,255,0.9);
      }
       
      /* Better spacing for additional controls */
      .new-additional-content {
        padding: 12px 0;
      }
      
      /* Compact and modern select styling */
      ha-select {
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        min-width: 80px;
        height: 36px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        font-size: 14px;
      }
      
      /* Hide select labels for cleaner look */
      ha-select .mdc-floating-label {
        display: none !important;
      }
      
      /* Hide floating labels when select is open */
      ha-select .mdc-floating-label.mdc-floating-label--float-above {
        display: none !important;
      }
      
      /* Ensure no extra space from hidden labels */
      ha-select .mdc-select__anchor {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      
      /* Center text in select */
      ha-select .mdc-select__anchor {
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        border-radius: 8px;
      }
      
      /* Style for the dropdown icon */
      ha-select .mdc-select__dropdown-icon {
        margin-right: 4px;
      }
      
      /* Style for the select menu */
      ha-select .mdc-select__menu {
        min-width: 100%;
        max-width: 300px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Prevent layout shift when select opens */
      ha-select .mdc-select__selected-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      ha-select:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Auto Warm Section Styling */
      .new-auto-warm-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        background-color: var(--card-background-color);
        border-radius: 8px;
        margin-bottom: 12px;
      }

      .new-auto-warm-header {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
      }

      .new-auto-warm-label {
        font-size: 16px;
        font-weight: 700;
        text-align: center;
      }
      
      /* Temperature Section Styling */
      .new-temperature-section {
       display: flex;
       flex-direction: column;
       gap: 12px;
       padding: 16px 12px 24px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin: 12px 0;
       border: 1px solid var(--divider-color);
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
       font-size: 16px;
       font-weight: 700;
       text-align: center;
     }

     .new-temperature-select-container {
       display: flex;
       justify-content: center;
       padding-left: 0;
       width: 100%;
     }

     /* Temperature select styling - should match inline time selects */
     .new-temperature-hidden-select {
       width: 100%;
       min-width: 120px;
       max-width: 180px;
       --mdc-theme-primary: var(--primary-color);
       --mdc-shape-small: 8px;
       --mdc-menu-min-width: 120px;
       height: 36px;
       border-radius: 8px;
       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
     }

     /* Cooking Time Section Styling */
     .new-cooking-time-section {
       display: flex;
       flex-direction: column;
       gap: 12px;
       padding: 16px 12px 24px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin: 12px 0;
       border: 1px solid var(--divider-color);
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
       font-size: 16px;
       font-weight: 700;
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
       font-size: 14px;
       font-weight: bold;
     }

     /* Delayed Start Section Styling */
     .new-delayed-start-section {
       display: flex;
       flex-direction: column;
       gap: 12px;
       padding: 16px 12px 24px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin: 12px 0;
       border: 1px solid var(--divider-color);
       width: 100%;
       box-sizing: border-box;
     }

     .new-delayed-start-header {
       display: flex;
       align-items: center;
       gap: 8px;
       justify-content: center;
       width: 100%;
       flex-wrap: wrap;
     }

     .new-delayed-start-label {
       font-size: 16px;
       font-weight: 700;
       text-align: center;
     }

     .new-delayed-start-controls {
       display: flex;
       align-items: center;
       gap: 8px;
       justify-content: center;
       padding-left: 0;
       flex-wrap: wrap;
     }
      
      .new-auto-warm-time {
        padding-left: 30px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      
      /* Delayed Start Section Improvements */
      .new-delayed-start-controls {
        margin-top: 12px;
      }
      
      .new-delayed-start-time-controls {
        margin-top: 8px;
      }
      
      /* Better spacing for time controls */
      .new-time-controls {
        margin-bottom: 12px;
      }
        /* Time sensors container styling */
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
         
        /* Single sensor - center it */
        .new-time-sensors-row:only-child {
          justify-content: center;
        }
         
        /* Two sensors - display in one row */
        .new-time-sensors-row:nth-child(1):only-child + .new-time-sensors-row {
          display: none; /* Hide second row if only one row exists */
        }
         
        /* Three sensors - first two in first row, third centered in second row */
        .new-time-sensors-row:nth-child(1):has(.new-control-item:nth-child(2)) + .new-time-sensors-row:has(.new-control-item:only-child) {
          justify-content: center;
        }
         
        /* Four sensors - two in each row */
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
    }
  }

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'skycooker-ha-card',
  name: 'SkyCooker Card',
  description: 'Card for operating SkyCooker through Lovelace.',
  preview: true,
});
