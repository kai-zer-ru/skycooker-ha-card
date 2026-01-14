// Конфигурация данных для skycooker-ha-card

export interface SkycookerConfig {
  showHeader?: boolean;
  showFooter?: boolean;
  favorite_modes_entity?: string;
}

export const defaultConfig: SkycookerConfig = {
  showHeader: true,
  showFooter: true,
  favorite_modes_entity: '',
};