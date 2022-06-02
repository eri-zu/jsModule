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

export default class Renderer extends Base {
  constructor($item, $indicator, len) {
    super();

    this.$item = $item;
    this.$indicator = $indicator;
    this.len = len;

    this.isUEv = true;

    this.inner = document.querySelector(".js-slider__inenr");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.calc();
  }

  calc() {
    this.w = this.$item.eq(0).width();
    // this.maxmove = this.w * (this.len - 1);
    this.maxmove = this.w * this.len;
    this.target = { value: 0 };
    this.totalnum = 0;
  }

  move(num) {
    this.totalnum = this.totalnum + num; // 何コマ進むか

    // -2 < this.totalnum < 2
    if (this.totalnum < -(this.len - 1)) {
      // nextのreset
      this.totalnum = 0;
      this.target.value = this.target.value + this.len;
    } else if (this.totalnum > this.len - 1) {
      // prevのreset
      this.totalnum = 0;
      this.target.value = this.target.value - this.len;
    }

    const tl = gsap.timeline();

    tl.to(this.target, 1, {
      value: this.totalnum,
      ease: "expo.out",
    });

    return tl;
  }

  update() {
    let x = this.w * this.target.value;

    if (x < -this.maxmove) {
      // nextのreset
      console.log("aaaa");
      x = x + this.maxmove;
    } else if (x > this.maxmove) {
      // prevのreset
      console.log("bbb");
      x = x - this.maxmove;
    }

    this.inner.style.transform = `translate3d(${x}px, 0px, 0px)`;
  }

  changeIndicator(index) {
    const tl = gsap.timeline();

    this.$indicator.removeClass("is-active");
    this.$indicator.eq(index).addClass("is-active");

    tl
      // all
      .to(this.$indicator, 1, {
        scale: 0.5,
        backgroundColor: "#eee",
        ease: "expo.out",
      })
      // active
      .to(
        this.$indicator.eq(index),
        1,
        {
          scale: 1,
          backgroundColor: "#000",
          ease: "expo.out",
        },
        0
      );

    return tl;
  }

  onEnterIndicator(target) {
    const tl = gsap.timeline();

    tl.to(target, 0.5, {
      scale: 1,
      ease: "elastic.out(1, 0.5)",
    });
  }

  onLeaveIndicator(target) {
    const tl = gsap.timeline();

    tl.to(target, 0.5, {
      scale: 0.5,
      ease: "expo.out",
    });
  }

  onEnterArrow(dom, direction) {
    const x = direction == "right" ? 10 : -10;

    const tl = gsap.timeline();
    tl.to(dom, 1, {
      x: x,
      ease: "expo.out",
    });
  }

  onLeaveArrow(dom) {
    const tl = gsap.timeline();

    tl.to(dom, 1, {
      x: 0,
      ease: "expo.out",
    });
  }

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
