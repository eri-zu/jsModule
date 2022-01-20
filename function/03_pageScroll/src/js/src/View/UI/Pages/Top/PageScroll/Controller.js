//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { UAParser } from "ua-parser-js";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";

export default class Controller extends Base {
  constructor() {
    super();

    this.isREv = true;

    this.name = "PageScroll";

    this.$btn = $(".js-pagescroll_btn");
    this.$html = $("html");
    this.$lastsection = $(".js-pagescroll_lastsection");

    this.st = 0;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.calcBuffa();
  }

  onResize() {
    this.calcBuffa();
  }

  calcBuffa() {
    // スクロール量
    this.st = $(window).scrollTop();

    // last section topまでの高さ
    const top = this.$lastsection.get(0).getBoundingClientRect().top + this.st;
    const wholeHeight = document.body.clientHeight;

    // buffa
    this.buffa = window.innerHeight - (wholeHeight - top);
  }

  onClick(btn) {
    const href = $(btn).attr("href");
    const $targetPosEle = $(href);

    const targetTop = btn.classList.contains("js-pagescroll_lastsection_btn")
      ? $targetPosEle.offset().top - this.buffa
      : $targetPosEle.offset().top;

    gsap.to(this.$html, 1, {
      scrollTop: targetTop,
      ease: "power4.out",
    });
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, (e) => {
      e.preventDefault();
      this.onClick(e.currentTarget);
    });
  }
}
