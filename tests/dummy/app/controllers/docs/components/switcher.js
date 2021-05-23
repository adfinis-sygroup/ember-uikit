import Controller from "@ember/controller";

export default class SwitcherController extends Controller {
  type = "tab";
  active = 0;
  animation = "uk-animation-fade";
  animationDuration = 200;
  swiping = false;
}
