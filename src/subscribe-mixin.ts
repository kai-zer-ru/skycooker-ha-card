import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from './types';

export class SubscribeMixin extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  private _unsubscribeFuncs: UnsubscribeFunc[] = [];

  public hassSubscribe(): (() => Promise<UnsubscribeFunc>)[] {
    return [];
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.hass) {
      // Подписываемся на изменения состояний сущностей
      const subscriptions = this.hassSubscribe();
      this._unsubscribeFuncs = await Promise.all(
        subscriptions.map(subscription => subscription())
      );
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Отписываемся от всех событий при отключении
    this._unsubscribeFuncs.forEach(unsubscribe => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    this._unsubscribeFuncs = [];
  }

  private _handleEvent(ev: any): void {
    // Обработка событий
  }
}

export type UnsubscribeFunc = () => void;