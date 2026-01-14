export interface HomeAssistant {
  states: Record<string, any>;
  localize: (key: string, ...args: any[]) => string;
  callService: (domain: string, service: string, data?: any) => Promise<void>;
  connection: any;
  themes: any;
  language: string;
  config: any;
}

export interface LovelaceCardEditor {
  setConfig(config: any): void;
  hass?: HomeAssistant;
}