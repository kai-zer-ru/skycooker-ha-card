import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from './types';

export class SubscribeMixin extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  private _unsubscribeFuncs: UnsubscribeFunc[] = [];
  private _setupVersion = 0;

  public hassSubscribe(): (() => Promise<UnsubscribeFunc>)[] {
    return [];
  }

  private async _setupSubscriptions(): Promise<void> {
    this._unsubscribeAll();
    const version = ++this._setupVersion;
    if (this.hass) {
      const subscriptions = this.hassSubscribe();
      const funcs = await Promise.all(
        subscriptions.map((subscription) => subscription())
      );
      if (version !== this._setupVersion) return;
      this._unsubscribeFuncs = funcs;
    }
  }

  private _unsubscribeAll(): void {
    this._unsubscribeFuncs.forEach((unsubscribe) => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    this._unsubscribeFuncs = [];
  }

  override updated(
    changedProperties: Map<string, unknown>
  ): void {
    super.updated?.(changedProperties);
    if (changedProperties.has('hass') || changedProperties.has('_config')) {
      this._setupSubscriptions();
    }
  }

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this._setupSubscriptions();
  }

  override disconnectedCallback(): void {
    this._unsubscribeAll();
    super.disconnectedCallback();
  }
}

export type UnsubscribeFunc = () => void;