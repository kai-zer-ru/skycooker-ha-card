// Компонент кнопки для skycooker-ha-card

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("skycooker-button")
export class SkycookerButton extends LitElement {
  static styles = css`
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `;

  @property() label = "Button";

  render() {
    return html`<button>${this.label}</button>`;
  }
}