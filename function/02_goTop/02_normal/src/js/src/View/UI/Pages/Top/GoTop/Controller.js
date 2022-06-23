//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";

export default class Controller extends Base {
  constructor() {
    super();

    this.name = "ScrollTop";
    this.btn = document.querySelector(".js-scrollTop");
    this.icon = this.btn.querySelector("svg");
    this.html = document.documentElement;

    this.setup();
    this.setEvents();
  }

  setup() {}

  onClick() {
    const tl = gsap.timeline();

    const easing = CustomEase.create("custom", "M0,0 C0.4,0 0,1 1,1 ");

    tl.to(this.html, 0.5, {
      scrollTop: 0,
      ease: easing,
    });
  }

  onEnter() {
    const tl = gsap.timeline();
    tl.to(this.icon, 1, {
      y: -3,
      ease: "expo.out",
    });
  }

  onLeave() {
    const tl = gsap.timeline();
    tl.to(this.icon, 1, {
      y: 0,
      ease: "expo.out",
    });
  }

  setEvents() {
    super.setEvents();

    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.onClick();
    });
    this.btn.addEventListener("mouseenter", (e) => {
      this.onEnter();
    });
    this.btn.addEventListener("mouseleave", (e) => {
      this.onLeave();
    });
  }
}
