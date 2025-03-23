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
    this.limit = 25;
    this.org = "";
    this.repo = "";
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
      repo: { type: String },
      org: { type: String },
      limit: { type: Number},
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
      .characters{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .character{
        padding: var(--ddd-spacing-3);
        text-align: center;
      }
      .char-details{
        display: flex;
        flex-direction: column;
        margin: var(--ddd-spacing-4);
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
  <h2>GitHub Repository:
    <a href="https://github.com/${this.org}/${this.repo}">Org: ${this.org}, Repository: ${this.repo}</a>
  </h2>
    <div class="characters">
      ${this.items.filter((item, index) => index < this.limit).map((item) =>
      html`
        <div class="character">
          <a href="https://github.com/${item.login}"><rpg-character seed = "${item.login}"></rpg-character></a>
        
        <div class = "char-details">
          <a href="https://github.com/${item.login}">${item.login}</a>
          <h5 class="contributions">Contributions: ${item.contributions}</h5>
          </div>
        </div>
      `
      )}
    </div>
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
    super.updated(changedProperties);
    if (changedProperties.has('org') || changedProperties.has('repo')){
      this.getData();
    }
  }

  getData(){
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
    try {
      fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data){
          this.items = [];
          this.items = data;
        }
  });   
      } catch (error){
        console.error("Error collecting fetching data");
      }
  }
}




globalThis.customElements.define(RpgCharacterProject.tag, RpgCharacterProject);