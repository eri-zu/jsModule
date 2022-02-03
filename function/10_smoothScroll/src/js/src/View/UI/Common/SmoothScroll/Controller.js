//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";
import { Conf } from "@/Conf";

export default class Controller extends Base {
  constructor() {
    super();

    this.isUEv = true;
    this.isREv = true;
    // this.isSEv = true;

    this.body = document.body;

    this.scrollWrap = document.querySelector(".js-smoothscroll_wrap");
    this.scrollTarget = document.querySelector(".js-smoothscroll_target");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.ready();
    this.reset();
    this.style();
  }

  ready() {
    // スクロール量
    this.st = 0;
    this.getPageYScroll = () => {
      this.st = window.pageYOffset || document.documentElement.scrollTop;
    };

    // util
    this.MathUtils = {
      lerp: (a, b, n) => (1 - n) * a + n * b,
    };

    this.renderedStyles = {
      translationY: {
        previous: 0,
        current: 0,
        ease: 0.1,
        setValue: () => this.st,
      },
    };

    console.log(this.st, "this.st");
  }

  reset() {
    this.body.style.height = `${this.scrollTarget.scrollHeight}px`;

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].previous =
        this.renderedStyles[key].setValue();
    }

    this.layout();
  }

  layout() {
    this.scrollTarget.style.transform = `translate3d(0,${
      -1 * this.renderedStyles.translationY.previous
    }px,0)`;
  }

  style() {
    this.scrollWrap.style.position = "fixed";
    this.scrollWrap.style.width = this.scrollWrap.style.height = "100%";
    this.scrollWrap.style.top = this.scrollWrap.style.left = 0;
    this.scrollWrap.style.overflow = "hidden";
  }

  update() {
    for (const key in this.renderedStyles) {
      // currentにスクロール量（=目標値）
      // this.renderedStyles[key].current = this.renderedStyles[key].setValue();
      this.targetValue = this.renderedStyles[key].setValue();

      this.renderedStyles[key].current +=
        (this.targetValue - this.renderedStyles[key].current) *
        this.renderedStyles[key].ease;

      // lerpさせる
      // this.renderedStyles[key].previous = this.MathUtils.lerp(
      //   this.renderedStyles[key].previous,
      //   this.renderedStyles[key].current,
      //   this.renderedStyles[key].ease
      // );
    }

    this.scrollTarget.style.transform = `translate3d(0,${
      -1 * this.renderedStyles.translationY.current
    }px,0)`;

    // this.layout();
  }

  onResize() {
    this.reset();
  }

  setEvents() {
    super.setEvents();

    window.addEventListener("scroll", this.getPageYScroll);
  }

  removeEvents() {
    // window.removeEventListener("scroll", this.getPageYScroll);
  }
}
