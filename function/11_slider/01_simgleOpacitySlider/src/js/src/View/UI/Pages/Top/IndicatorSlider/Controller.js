//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";
import { Conf } from "@/Conf";
import Order from "./Order";
import Renderer from "./Renderer";

export default class IndicatorSlider extends Base {
  constructor() {
    super();

    this.isUEv = true;

    this.$item = $(".js-slider_item");
    this.len = this.$item.length;

    this.frame = 0;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.order = new Order(this.len);
    this.renderer = new Renderer(this.$item);
  }

  change() {
    if (tl) tl.kill();
    this.order.right();

    const tl = gsap.timeline();

    tl
      // hide
      .add(this.renderer.hide(this.order.prev))
      // show
      .add(this.renderer.show(this.order.current), 0);

    return tl;
  }

  autoswitch() {
    this.change();
  }

  update() {
    this.frame++;

    // 540frameで一周
    this.frame = this.frame > 540 ? 0 : this.frame;

    // 3s毎に切り替え
    if (this.frame % 180 == 0 && this.frame > 0) {
      console.log(this.frame, "切り替え");
      this.autoswitch();
    }
  }

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
