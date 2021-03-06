import Component from "@ember/component";
import WidthMixin from "ember-uikit/mixins/width";

import layout from "../templates/components/uk-list";

export default Component.extend(WidthMixin, {
  layout,

  tagName: "ul",

  classNames: ["uk-list"],

  classNameBindings: [
    "divider:uk-list-divider",
    "striped:uk-list-striped",
    "bullet:uk-list-bullet",
    "large:uk-list-large",
  ],

  divider: false,

  striped: false,

  bullet: false,

  large: false,
});
