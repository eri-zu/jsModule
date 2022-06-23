//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";

export default class Renderer extends Base {
  constructor() {
    super();

    this.inner = document.querySelector(".js-slider__inner");

    this.isUpdate = false;
    this.isUEv = true;
    this.isREv = true;
    this.currentPosX = 0;
    this.speed = 0.5;
    this.speed = 10;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.setParameter();
  }

  setParameter() {
    this.resetPoint = this.inner.clientWidth / 2;
    console.log(this.resetPoint, "this.resetPoint");
  }

  onResize() {
    this.setParameter();
  }

  update() {
    if (!this.isUpdate) return;
    this.currentPosX += this.speed;

    this.inner.style.transform = `translate3d(${-this
      .currentPosX}px, 0px, 0px)`;

    if (this.currentPosX > this.resetPoint) {
      this.currentPosX = 0;
    }
  }

  stop() {
    this.isUpdate = false;
  }

  play() {
    this.isUpdate = true;
  }

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
