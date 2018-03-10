"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/iron-iconset-svg";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/iron-icon";
import "@polymer/iron-selector";

class HTDrawerNav extends LitElement {
  render({ data, page }) {
    return html`<style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        a {
            text-decoration: none;
            color: inherit;
            outline: none;
        }

        a.iron-selected paper-icon-item, a.iron-selected paper-item {
          color: var(--accent-color);
        }

        paper-item, paper-icon-item {
          color: var(--secondary-text-color);
        }

        paper-item, paper-icon-item {
            --paper-item-focused-before: {
                background: none;
            }
        }

        paper-item {
          padding-left: 24px;
        }
      </style>
      <iron-iconset-svg size="24" name="ht-drawer-nav">
          <svg>
              <defs id="defs"></defs>
          </svg>
      </iron-iconset-svg>
      <iron-selector attr-for-selected="name" selected$=${page} selectable="a">
         ${repeat(
           data,
           i => html`
            <a name="${i.name}" href="/${i.name}">
              ${
                i.icon
                  ? html`<paper-icon-item>
                  <iron-icon icon="ht-drawer-nav:${
                    i.name
                  }" item-icon slot="item-icon"></iron-icon>
                  <span>${i.title}</span>
              </paper-icon-item>`
                  : html`<paper-item>
                  ${i.title}
              </paper-item>`
              }
            </a>
          `
         )}
      </iron-selector>
    `;
  }

  static get is() {
    return "ht-drawer-nav";
  }

  static get properties() {
    return {
      data: Array,
      page: String
    };
  }

  constructor() {
    super();
    this.data = [
      { name: "catalog", title: "Каталог" },
      { name: "about", title: "О сервисе" },
      { name: "author", title: "Стать автором" }
    ];
  }

  ready() {
    super.ready();
    for (let i of this.data) {
      if (i.icon === undefined) return;
      this.$.defs.innerHTML += `<g id="${i.name}"><path d="${
        i.icon
      }"></path></g>`;
    }
  }
}

customElements.define(HTDrawerNav.is, HTDrawerNav);
