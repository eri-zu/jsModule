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

    this.name = "GoPoint";

    this.$btn = $(".js-gopoint_btn");
    this.$target = $(".js-gopoint_target");
    this.$html = $("html");

    this.setup();
    this.setEvents();
  }

  setup() {}

  onClick() {
    const targetTop = this.$target.offset().top;

    gsap.to(this.$html, 0.8, {
      scrollTop: targetTop,
      ease: "power4.out",
    });
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, () => {
      this.onClick();
    });
  }
}
