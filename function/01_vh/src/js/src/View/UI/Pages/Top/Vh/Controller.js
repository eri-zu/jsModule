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

    this.$wrap = $(".js-mv");

    this.setup();
    this.setEvents();
  }

  setup() {}

  setPx() {
    this.h = window.innerHeight;
    this.$wrap.css("height", this.h);
  }

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();

    if (
      UAParser().device.type == "mobile" ||
      UAParser().device.type == "tablet"
    ) {
      this.setPx();
    }
  }
}
