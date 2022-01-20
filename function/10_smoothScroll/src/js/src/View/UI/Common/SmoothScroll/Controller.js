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
    this.docScroll = 0;
    this.getPageYScroll = () => {
      this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
      // console.log(this.docScroll);
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
        setValue: () => this.docScroll,
      },
    };

    console.log(this.docScroll, "this.docScroll");
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
      this.renderedStyles[key].current = this.renderedStyles[key].setValue();

      console.log(this.renderedStyles[key].setValue());

      // lerpさせる
      this.renderedStyles[key].previous = this.MathUtils.lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].ease
      );
    }

    this.layout();
  }

  onResize() {
    this.reset();
  }

  setEvents() {
    super.setEvents();
    window.addEventListener("scroll", this.getPageYScroll.bind(this));
  }
}
