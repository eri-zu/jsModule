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

    this.name = "HoverImg";
    this.$item = $(".js-hover_item");

    this.setup();
    this.setEvents();
  }

  setup() {}

  onEnter($target) {
    const $wrap = $target.find(".js-hover_imgwrap");
    const $img = $target.find(".js-hover_img");

    const tl = gsap.timeline();
    tl
      // 枠
      .to($wrap, 1, {
        scale: 0.98,
        ease: "expo.out",
      })
      // img
      .to(
        $img,
        2,
        {
          scale: 1.1,
          ease: "expo.out",
        },
        0
      );
  }

  onLeave($target) {
    const $wrap = $target.find(".js-hover_imgwrap");
    const $img = $target.find(".js-hover_img");

    const tl = gsap.timeline();
    tl
      // 枠
      .to($wrap, 1, {
        scale: 1,
        ease: "expo.out",
      })
      // img
      .to(
        $img,
        2,
        {
          scale: 1,
          ease: "expo.out",
        },
        0
      );
  }

  setEvents() {
    super.setEvents();

    // --------------------------
    // hover
    // --------------------------
    this.$item.on("mouseenter" + "." + this.name, (e) => {
      this.onEnter($(e.currentTarget));
    });

    this.$item.on("mouseleave" + "." + this.name, (e) => {
      this.onLeave($(e.currentTarget));
    });
  }

  removeEvents() {}
}
