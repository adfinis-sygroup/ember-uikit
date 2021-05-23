import { computed } from "@ember/object";
import Mixin from "@ember/object/mixin";
import { isEmpty } from "@ember/utils";

export default Mixin.create({
  attributeBindings: [
    "ukSwitcher:uk-switcher",
    "connect",
    "active",
    "animation",
    "animationDuration:duration",
    "swiping",
  ],

  contentId: "",
  active: 0,
  animation: "",
  animationDuration: 200,
  swiping: false,
  ukSwitcher: "",

  connect: computed("contentId", function () {
    const id = this.contentId;

    return isEmpty(id) ? "" : `#${id}`;
  }),
});
