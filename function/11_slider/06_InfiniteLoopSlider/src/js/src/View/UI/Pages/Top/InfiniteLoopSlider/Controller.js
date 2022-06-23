//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import Renderer from "./Renderer";

export default class InfiniteLoopSlider extends Base {
  constructor() {
    super();

    this.inner = document.querySelector(".js-slider__inner");

    this.isUEv = true;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.renderer = new Renderer();
  }

  timeline() {}

  update() {
    this.renderer.update();
  }

  onResize() {}

  setEvents() {
    super.setEvents();

    this.inner.addEventListener("mouseenter", (e) => {
      this.renderer.stop();
    });
    this.inner.addEventListener("mouseleave", (e) => {
      this.renderer.play();
    });
  }
}
