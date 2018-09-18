"use strict";
import { LitElement, html } from "@polymer/lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-iconset-svg";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/iron-icon";

class HTDrawerNav extends LitElement {
  render() {
    const { data, page } = this;
    return html`<style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

      iron-icon {
        width: 20px;
        height: 20px;
        margin-left: 4px;
        color: var(--secondary-text-color);
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
            <defs>
                <g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
            </defs>
        </svg>
      </iron-iconset-svg>
         ${repeat(
           data,
           i => html`
            <a href=${i.href} target=${i.blank ? "_blank" : ""} ?active=${
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
                  ${i.title} ${
                      i.blank
                        ? html`<iron-icon icon="ht-toolbar-nav:open-in-new"></iron-icon>`
                        : ``
                    }
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
      data: { type: Array },
      page: { type: String }
    };
  }

  constructor() {
    super();
    this.data = [];
  }

  firstUpdated() {
    for (let i of this.data) {
      if (i.icon === undefined) return;
      this.$.defs.innerHTML += `<g id="${i.name}"><path d="${
        i.icon
      }"></path></g>`;
    }
  }
}

customElements.define(HTDrawerNav.is, HTDrawerNav);
