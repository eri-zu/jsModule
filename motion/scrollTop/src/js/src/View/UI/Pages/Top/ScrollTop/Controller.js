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
    this.html = document.documentElement;

    this.setup();
    this.setEvents();
  }

  setup() {}

  onClick() {
    gsap.to(this.html, 0.8, {
      ease: "power4.out",
      scrollTop: 0,
    });
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, () => {
      this.onClick();
    });
  }
}
