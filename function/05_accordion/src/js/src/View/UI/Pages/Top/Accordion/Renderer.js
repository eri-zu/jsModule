//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";

export default class Controller extends Base {
  constructor() {
    super();

    this.$icon = $(".js-accordion_icon");

    this.isShow = false;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.$icon.each((i, el) => {
      gsap.set($(el).find(".js-accordion_iconbar").eq(1), {
        rotation: "+=90",
      });
    });
  }

  show(target) {
    if (target.tl) target.tl.kill();

    const $answer = $(target).next(".js-accordion_answer");
    const $icon = $(target).find(".js-accordion_icon");
    const $bar = $icon.find(".js-accordion_iconbar");

    target.tl = gsap.timeline();

    target.tl
      // answer
      .to($answer, 1, {
        height: "auto",
        ease: "expo.out",
      });
    // icon
    $bar.each((i, el) => {
      target.tl.to(
        $(el),
        1,
        {
          rotation: "+=90",
          opacity: i == 0 ? 0 : 1,
          startAt: {
            rotation: i == 0 ? 0 : 90,
          },
          ease: "expo.out",
        },
        0
      );
    });
  }

  hide(target) {
    if (target.tl) target.tl.kill();

    const $answer = $(target).next(".js-accordion_answer");
    const $icon = $(target).find(".js-accordion_icon");
    const $bar = $icon.find(".js-accordion_iconbar");

    target.tl = gsap.timeline();

    target.tl
      // answer
      .to($answer, 1, {
        height: 0,
        ease: "expo.out",
      });
    // icon
    $bar.each((i, el) => {
      target.tl.to(
        $(el),
        1,
        {
          rotation: "+=90",
          opacity: i == 0 ? 1 : 1,
          startAt: {
            rotation: i == 0 ? 0 : 90,
          },
          ease: "expo.out",
        },
        0
      );
    });
  }

  toggleShow(target) {
    if (target.isShow) {
      this.hide(target);
    } else {
      this.show(target);
    }

    target.isShow = !target.isShow;
  }

  setEvents() {
    super.setEvents();
  }
}
