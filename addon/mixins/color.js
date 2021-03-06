import { computed } from "@ember/object";
import Mixin from "@ember/object/mixin";
import validatedComputedProperty from "ember-uikit/-private/validated-computed-property";

export const COLOR_OPTIONS = {
  NONE: "",
  DEFAULT: "default",
  MUTED: "muted",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  LINK: "link",
  TEXT: "text",
};

export default Mixin.create({
  COLOR_OPTIONS: Object.values(COLOR_OPTIONS),

  classNameBindings: ["colorClass"],

  colorTemplate: "uk-$color$-background",

  color: validatedComputedProperty("_color", "color", "COLOR_OPTIONS"),

  colorClass: computed("color", "colorTemplate", function () {
    return this.color && this.colorTemplate.replace(/\$color\$/, this.color);
  }),
});
