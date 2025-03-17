/**
 * Copyright 2025 FreddyBono5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `rpg-character-project`
 * 
 * @demo index.html
 * @element rpg-character-project
 */
export class RpgCharacterProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-character-project";
  }

  constructor() {
    super();
    this.value = "";
    this.loading = false;
    this.items = [];
    this.title = ""; 
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-character-project.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      loading: { type: Boolean, reflect: true },
      value: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--rpg-character-project-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  ${this.items.map((item, index) => html`
  <rpg-character seed = ${item.data[0]}></rpg-character>`)}
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  updated(changedProperties){
    if (changedProperties.has('value') && this.value){
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value){
      this.items = [];

    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if(data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }
  });
}
}




globalThis.customElements.define(RpgCharacterProject.tag, RpgCharacterProject);