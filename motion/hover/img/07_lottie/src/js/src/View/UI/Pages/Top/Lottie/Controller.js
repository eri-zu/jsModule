//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import lottie from "lottie-web";

export default class Controller extends Base {
  constructor() {
    super();

    this.el = document.querySelector(".js-lottie");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.init();
  }

  init() {
    lottie.loadAnimation({
      container: this.el,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../assets/resource/json/data.json",
    });
  }

  setEvents() {
    super.setEvents();
  }

  removeEvents() {}
}
