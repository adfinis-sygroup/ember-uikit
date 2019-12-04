import Component from "@ember/component";
import { computed } from "@ember/object";
import layout from "../templates/components/uk-modal";
import UIkit from "uikit";
import { scheduleOnce } from "@ember/runloop";
import { getOwner } from "@ember/application";

const noop = () => {};

export default Component.extend({
  layout,

  modalClass: "",
  dialogClass: "",
  btnClose: true,
  escClose: true,
  bgClose: true,
  stack: false,
  container: true,
  clsPage: "uk-modal-page",
  clsPanel: "uk-modal-dialog",
  selClose: [
    ".uk-modal-close",
    ".uk-modal-close-default",
    ".uk-modal-close-outside",
    ".uk-modal-close-full"
  ].join(", "),

  isAnimating: false,

  modalId: computed("elementId", function() {
    return `modal-${this.elementId}`;
  }),

  modalSelector: computed("modalId", function() {
    return `#${this.modalId}`;
  }),

  containerElement: computed("container", function() {
    return getOwner(this)
      .lookup("service:-document")
      .querySelector(this.container);
  }),

  init() {
    this._super(...arguments);

    const config = getOwner(this).resolveRegistration("config:environment");

    this.set("container", config.APP.rootElement || "body");

    this.set("eventHandlers", {
      hidden: async () => {
        if (this.visible) {
          await this.getWithDefault("on-hide", noop)();
        }

        this.set("isAnimating", false);
      },

      show: async () => {
        if (!this.visible) {
          await this.getWithDefault("on-show", noop)();
        }
      },

      shown: () => {
        this.set("isAnimating", false);
      },

      beforehide: () => {
        this.set("isAnimating", true);
      },

      beforeshow: () => {
        this.set("isAnimating", true);
      }
    });
  },

  didInsertElement() {
    this.set(
      "modal",
      UIkit.modal(
        `#${this.modalId}`,
        this.getProperties(
          "escClose",
          "bgClose",
          "stack",
          "container",
          "clsPage",
          "clsPanel",
          "selClose"
        )
      )
    );

    scheduleOnce("afterRender", this, "_setupEvents");
  },

  didReceiveAttrs() {
    scheduleOnce("afterRender", this, "toggleModal");
  },

  willDestroyElement() {
    if (this.modal) {
      this._teardownEvents();

      this.modal.$destroy(true);

      this.set("modal", null);
    }
  },

  _setupEvents() {
    Object.keys(this.eventHandlers).forEach(event => {
      UIkit.util.on(
        this.modalSelector,
        event,
        this.get(`eventHandlers.${event}`)
      );
    });
  },

  _teardownEvents() {
    Object.keys(this.eventHandlers).forEach(event => {
      UIkit.util.off(
        this.modalSelector,
        event,
        this.get(`eventHandlers.${event}`)
      );
    });
  },

  async toggleModal() {
    if (!this.modal) return;

    if (this.visible) {
      await this.modal.show();
    } else {
      await this.modal.hide();
    }
  }
});
