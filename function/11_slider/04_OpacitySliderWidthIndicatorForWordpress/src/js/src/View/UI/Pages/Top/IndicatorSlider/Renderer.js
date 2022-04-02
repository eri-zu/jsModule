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
  constructor($item, $indicator) {
    super();

    this.$item = $item;
    this.$indicator = $indicator;
    this.$txt = $(".js-slider_current");

    this.setup();
    this.setEvents();
  }

  setup() {}

  show(index) {
    const target = this.$item.eq(index);
    const tl = gsap.timeline();

    tl.to(target, 1, {
      opacity: 1,
      ease: "power3.out",
    });

    return tl;
  }

  hide() {
    const tl = gsap.timeline();

    tl.to(this.$item, 1, {
      opacity: 0,
      ease: "power3.out",
    });

    return tl;
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

  onEnterArrow(target, direction) {
    const x = direction == "right" ? 10 : -10;

    const tl = gsap.timeline();

    tl.to(target, 1, {
      x: x,
      ease: "expo.out",
    });
  }

  onLeaveArrow(target) {
    
    const tl = gsap.timeline();

    tl.to(target, 1, {
      x: 0,
      ease: "expo.out",
    });
  }

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
