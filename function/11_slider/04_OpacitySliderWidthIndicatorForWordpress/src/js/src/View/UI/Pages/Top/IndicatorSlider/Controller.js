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
import Swipe from "./Renderer";

export default class IndicatorSlider extends Base {
  constructor() {
    super();

    this.isUEv = true;

    this.$item = $(".js-slider_item");
    this.$indicatorwrap = $(".js-slider_indicator_wrap");
    this.$arrow_right = $(".js-slider_arrow_right");
    this.$arrow_left = $(".js-slider_arrow_left");

    this.len = this.$item.length;
    this.frame = 0;
    this.isUpdate = true;
    this.timer = 3; // autoswtichの間隔

    console.log(this.len);

    this.setup();
    if (this.len > 1) this.setEvents();
  }

  setup() {
    this.ready();
  }

  ready() {
    // indicator用意（数わからんとき）
    if (this.len > 1) {
      let $indicator = null;

      for (let i = 0; i < this.len; i++) {
        const DOM =
          i == 0
            ? '<li class="slider__indicator-item js-slider_indicator_item is-active"></li>'
            : '<li class="slider__indicator-item js-slider_indicator_item"></li>';
        $indicator = $(DOM);
        this.$indicatorwrap.append($indicator);
      }

      this.$indicator = $(".js-slider_indicator_item");

      this.order = new Order(this.len);
      this.renderer = new Renderer(this.$item, this.$indicator);
      this.swipe = new Swipe();
    }
  }

  next() {
    // 止める
    if (this.tl) this.tl.kill();
    this.isUpdate = false;
    this.frame = 0;

    // order
    this.order.right();

    // render
    this.tl = gsap.timeline();

    this.tl
      // render
      .add(this.render(this.order.current))
      // autoswitch再開
      .add(() => {
        this.isUpdate = true;
      });

    return this.tl;
  }

  prev() {
    // 止める
    if (this.tl) this.tl.kill();
    this.isUpdate = false;
    this.frame = 0;

    // order
    this.order.left();

    // render
    this.tl = gsap.timeline();

    this.tl
      // render
      .add(this.render(this.order.current))
      // autoswitch再開
      .add(() => {
        this.isUpdate = true;
      });

    return this.tl;
  }

  onClick(target) {
    // 全部止める
    if (this.tl) this.tl.kill();
    this.isUpdate = false;
    this.frame = 0;

    // order
    const index = this.$indicator.index($(target));
    this.order.jump(index);

    // render
    this.tl = gsap.timeline();

    this.tl
      // render
      .add(this.render(this.order.current))
      // autoswitch再開
      .add(() => {
        this.isUpdate = true;
      });

    return this.tl;
  }

  render(index) {
    const tl = gsap.timeline();

    tl
      // img hide
      .add(this.renderer.hide())
      // img show
      .add(this.renderer.show(index), 0)
      // indicator
      .add(this.renderer.changeIndicator(index), 0);

    return tl;
  }

  autoswitch() {
    this.next();
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

  updateBar() {}

  onResize() {}

  setEvents() {
    super.setEvents();

    // --------------------------
    // inidicator
    // --------------------------
    this.$indicator.on("click" + "." + this.name, (e) => {
      this.onClick(e.currentTarget);
    });

    this.$indicator.on("mouseenter" + "." + this.name, (e) => {
      if (e.currentTarget.classList.contains("is-active")) return;
      this.renderer.onEnterIndicator(e.currentTarget);
    });

    this.$indicator.on("mouseleave" + "." + this.name, (e) => {
      if (e.currentTarget.classList.contains("is-active")) return;
      this.renderer.onLeaveIndicator(e.currentTarget);
    });

    // --------------------------
    // arrow
    // --------------------------
    this.$arrow_right.on("click" + "." + this.name, () => {
      this.next();
    });
    this.$arrow_left.on("click" + "." + this.name, () => {
      this.prev();
    });
    this.$arrow_right.on("mouseenter" + "." + this.name, (e) => {
      this.renderer.onEnterArrow(e.currentTarget, "right");
    });
    this.$arrow_right.on("mouseleave" + "." + this.name, (e) => {
      this.renderer.onLeaveArrow(e.currentTarget);
    });
    this.$arrow_left.on("mouseenter" + "." + this.name, (e) => {
      this.renderer.onEnterArrow(e.currentTarget, "left");
    });
    this.$arrow_left.on("mouseleave" + "." + this.name, (e) => {
      this.renderer.onLeaveArrow(e.currentTarget);
    });

    // --------------------------
    // swipe
    // --------------------------
    this.swipe.onStart = () => {};
    this.swipe.onMove = () => {};
    this.swipe.onEnd = () => {};
    this.swipe.onSwipe = (sign) => {
      this.frame = 0;
      if (sign > 0) this.next();
      else this.prev();
    };
  }
}
