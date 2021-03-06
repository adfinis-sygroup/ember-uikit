import { computed } from "@ember/object";
import Mixin from "@ember/object/mixin";
import MEDIA_OPTIONS from "ember-uikit/-private/media";
import validatedComputedProperty from "ember-uikit/-private/validated-computed-property";

export const FLEX_HORIZONTAL_OPTIONS = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
  BETWEEN: "between",
  AROUND: "around",
};

export const FLEX_VERTICAL_OPTIONS = {
  STRETCH: "stretch",
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom",
};

export const FLEX_DIRECTION_OPTIONS = {
  ROW: "row",
  ROW_REVERSE: "row-reverse",
  COLUMN: "column",
  COLUMN_REVERSE: "column-reverse",
};

export const FLEX_WRAP_OPTIONS = {
  WRAP: "wrap",
  WRAP_REVERSE: "wrap-reverse",
  NOWRAP: "nowrap",
};

export const FLEX_WRAP_ALIGNMENT_OPTIONS = {
  STRETCH: "stretch",
  BETWEEN: "between",
  AROUND: "around",
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom",
};

export default Mixin.create({
  MEDIA_OPTIONS: Object.values(MEDIA_OPTIONS),
  FLEX_HORIZONTAL_OPTIONS: Object.values(FLEX_HORIZONTAL_OPTIONS),
  FLEX_VERTICAL_OPTIONS: Object.values(FLEX_VERTICAL_OPTIONS),
  FLEX_DIRECTION_OPTIONS: Object.values(FLEX_DIRECTION_OPTIONS),
  FLEX_WRAP_OPTIONS: Object.values(FLEX_WRAP_OPTIONS),
  FLEX_WRAP_ALIGNMENT_OPTIONS: Object.values(FLEX_WRAP_ALIGNMENT_OPTIONS),

  classNameBindings: [
    "flex:uk-flex",
    "flexInline:uk-flex-inline",
    "flexVerticalClass",
    "flexHorizontalClass",
    "flexDirectionClass",
    "flexWrapClass",
    "flexWrapAlignmentClass",
  ],

  flex: false,
  flexInline: false,

  flexHorizontal: validatedComputedProperty(
    "_flexHorizontal",
    "flexHorizontal",
    "FLEX_HORIZONTAL_OPTIONS"
  ),
  flexVertical: validatedComputedProperty(
    "_flexVertical",
    "flexVertical",
    "FLEX_VERTICAL_OPTIONS"
  ),
  flexDirection: validatedComputedProperty(
    "_flexDirection",
    "flexDirection",
    "FLEX_DIRECTION_OPTIONS"
  ),
  flexWrap: validatedComputedProperty(
    "_flexWrap",
    "flexWrap",
    "FLEX_WRAP_OPTIONS"
  ),
  flexWrapAlignment: validatedComputedProperty(
    "_flexWrapAlignment",
    "flexWrapAlignment",
    "FLEX_WRAP_ALIGNMENT_OPTIONS"
  ),

  flexHorizontalClass: computed("flexHorizontal", function () {
    return this.flexHorizontal && `uk-flex-${this.flexHorizontal}`;
  }),
  flexVerticalClass: computed("flexVertical", function () {
    return this.flexVertical && `uk-flex-${this.flexVertical}`;
  }),
  flexDirectionClass: computed("flexDirection", function () {
    return this.flexDirection && `uk-flex-${this.flexDirection}`;
  }),
  flexWrapClass: computed("flexWrap", function () {
    return this.flexWrap && `uk-flex-${this.flexWrap}`;
  }),
  flexWrapAlignmentClass: computed("flexWrapAlignment", function () {
    return this.flexWrapAlignment && `uk-flex-wrap-${this.flexWrapAlignment}`;
  }),
});
