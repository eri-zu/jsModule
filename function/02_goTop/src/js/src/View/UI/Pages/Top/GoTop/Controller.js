//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { UAParser } from "ua-parser-js";

export default class Controller extends Base {
  constructor() {
    super();

    this.name = "GoTop";
    this.$btn = $(".js-goTop");
    this.$icon = this.$btn.find("img");

    this.setup();
    this.setEvents();
  }

  setup() {}

  onClick() {
    const st = { top: $(window).scrollTop() }; // スクロール量
    const top = 0;

    gsap.to(st, 0.8, {
      top: top,
      ease: "power4.out",
      onUpdate() {
        $(window).scrollTop(st.top); // st.topまで移動
      },
    });
  }

  onEnter() {
    const tl = gsap.timeline();
    tl.to(this.$icon, 1, {
      y: -3,
      ease: "expo.out",
    });
  }

  onLeave() {
    const tl = gsap.timeline();
    tl.to(this.$icon, 1, {
      y: 0,
      ease: "expo.out",
    });
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, () => {
      this.onClick();
    });
    this.$btn.on("mouseenter" + "." + this.name, () => {
      this.onEnter();
    });
    this.$btn.on("mouseleave" + "." + this.name, () => {
      this.onLeave();
    });
  }
}
