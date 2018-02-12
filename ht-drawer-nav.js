"use strict";
import { Element } from "../@polymer/polymer/polymer-element.js";
import "../@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "../@polymer/paper-item/paper-icon-item.js";
import "../@polymer/iron-icon/iron-icon.js";
import "../@polymer/iron-selector/iron-selector.js";
class HTDrawerNav extends Element {
  static get template() {
    return `
      <style>
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

        a.iron-selected paper-icon-item {
          color: var(--accent-color);
        }

        paper-icon-item {
          color: var(--secondary-text-color);
        }

        paper-icon-item {
            --paper-item-focused-before: {
                background: none;
            }
        }
      </style>
      <iron-iconset-svg size="24" name="ht-drawer-nav">
          <svg>
              <defs id="defs"></defs>
          </svg>
      </iron-iconset-svg>
      <iron-selector attr-for-selected="name" selected="[[page]]" selectable="a">
        <dom-repeat items="[[data]]" as="item">
          <template>
            <a name="[[item.name]]" href="/[[item.name]]">
              <paper-icon-item>
                  <iron-icon icon="ht-drawer-nav:[[item.name]]" item-icon slot="item-icon"></iron-icon>
                  <span>[[item.title]]</span>
              </paper-icon-item>
            </a>
          </template>
        </dom-repeat>
      </iron-selector>
`;
  }
  static get is() {
    return "ht-drawer-nav";
  }

  static get properties() {
    return {
      data: {
        type: Array,
        value: _ => []
      },

      page: {
        type: String,
        value: ""
      }
    };
  }

  ready() {
    super.ready();
    for (let i of this.data) {
      this.$.defs.innerHTML += `<g id="${i.name}"><path d="${
        i.icon
      }"></path></g>`;
    }
  }
}

customElements.define(HTDrawerNav.is, HTDrawerNav);
