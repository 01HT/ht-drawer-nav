"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/lib/repeat.js";
import "@polymer/iron-iconset-svg";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/iron-icon";

class HTDrawerNav extends LitElement {
  _render({ data, page }) {
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

        paper-item, paper-icon-item {
          color:#414549;
          padding-left: 24px;
          border-left: 4px solid #fff;
        }

        a[active] paper-icon-item, a[active] paper-item {
           border-left: 4px solid var(--accent-color);
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
         ${repeat(
           data,
           i => html`
            <a href=${i.href} active?=${
             i.href && i.href.startsWith(`/${page}`) ? true : false
           }>
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
    this.data = [];
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
