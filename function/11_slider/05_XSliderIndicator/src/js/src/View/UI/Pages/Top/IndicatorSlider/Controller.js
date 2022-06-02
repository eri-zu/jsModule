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
import Swipe from "./Swipe";

export default class IndicatorSlider extends Base {
  constructor() {
    super();

    this.name = "Slider";

    this.$inner = $(".js-slider__inenr");
    this.$item = $(".js-slider_item");
    this.$indicator = $(".js-slider_indicator_item");
    this.$arrow_rightwrap = $(".js-slider_arrow_right");
    this.$arrow_right = $(".js-slider_arrow_right_in");
    this.$arrow_leftwrap = $(".js-slider_arrow_left");
    this.$arrow_left = $(".js-slider_arrow_left_in");

    this.len = this.$indicator.length;
    this.isUEv = false; // autoswitch
    this.timer = 3; // autoswtichの間隔
    this.isUpdate = true;
    this.frame = 0;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.order = new Order(this.len);
    this.renderer = new Renderer(this.$item, this.$indicator, this.len);
    // this.swipe = new Swipe();
  }

  change(direction, target = null) {
    // stop
    if (this.tl) this.tl.kill();
    this.isUpdate = false;
    this.frame = 0;

    // index
    let num; // 何コマ進むか
    if (direction == "next") {
      num = -1;
      this.order.go();
    } else if (direction == "prev") {
      num = 1;
      this.order.back();
    } else if (direction == "jump") {
      const index = this.$indicator.index($(target));
      num = this.order.current - index;
      this.order.jump(index);
    }

    // render
    this.tl = gsap.timeline();

    this.tl
      // render
      .add(this.render(this.order.current, num))
      // autoswitch再開
      .add(() => {
        this.isUpdate = true;
      });

    return this.tl;
  }

  render(index, num) {
    const tl = gsap.timeline();

    tl
      // img show
      .add(this.renderer.move(num), 0)
      // indicator
      .add(this.renderer.changeIndicator(index), 0);

    return tl;
  }

  autoswitch() {
    this.change("next");
  }

  update() {
    if (!this.isUpdate) return;
    this.frame++;
    // 一周したらリセット
    this.frame = this.frame > 60 * this.timer * this.len ? 0 : this.frame;
    // this.time毎に切り替え
    if (this.frame % (60 * this.timer) == 0 && this.frame > 0)
      this.autoswitch();
  }

  onResize() {}

  setEvents() {
    super.setEvents();

    // ------------------------------------------------------------
    // click
    // ------------------------------------------------------------
    this.$indicator.on("click" + "." + this.name, (e) => {
      this.change("jump", e.currentTarget);
    });
    this.$arrow_rightwrap.on("click" + "." + this.name, () => {
      this.change("next");
    });
    this.$arrow_leftwrap.on("click" + "." + this.name, () => {
      this.change("prev");
    });

    // ------------------------------------------------------------
    // hover
    // ------------------------------------------------------------
    this.$indicator.on("mouseenter" + "." + this.name, (e) => {
      if (e.currentTarget.classList.contains("is-active")) return;
      this.renderer.onEnterIndicator(e.currentTarget);
    });
    this.$indicator.on("mouseleave" + "." + this.name, (e) => {
      if (e.currentTarget.classList.contains("is-active")) return;
      this.renderer.onLeaveIndicator(e.currentTarget);
    });
    this.$arrow_rightwrap.on("mouseenter" + "." + this.name, (e) => {
      this.renderer.onEnterArrow(this.$arrow_right, "right");
    });
    this.$arrow_rightwrap.on("mouseleave" + "." + this.name, (e) => {
      this.renderer.onLeaveArrow(this.$arrow_right);
    });
    this.$arrow_leftwrap.on("mouseenter" + "." + this.name, (e) => {
      this.renderer.onEnterArrow(this.$arrow_left, "left");
    });
    this.$arrow_leftwrap.on("mouseleave" + "." + this.name, (e) => {
      this.renderer.onLeaveArrow(this.$arrow_left);
    });

    // --------------------------
    // swipe
    // --------------------------
    // this.swipe.onStart = () => {};
    // this.swipe.onMove = () => {};
    // this.swipe.onEnd = () => {};
    // this.swipe.onSwipe = (sign) => {
    //   this.frame = 0;
    //   if (sign > 0) this.next();
    //   else this.prev();
    // };
  }
}
