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
    this.$icon = this.$btn.find("svg");
    this.html = document.documentElement;

    this.setup();
    this.setEvents();
  }

  setup() {}

  onClick() {
    // gsap.to(this.html, 0.8, {
    //   ease: "power4.out",
    //   scrollTop: 0,
    // });

    const st = { top: $(window).scrollTop() }; // スクロール量
    const top = 0;

    console.log(st, "st"); // {top: 3520}
    console.log(st.top); // 3520

    // 3520を0にアニメーション
    gsap.to(st, 0.8, {
      top: top, // 0へ数字を減らしていく
      ease: "power4.out",
      onUpdate() {
        console.log(st.top, "st.top");
        $(window).scrollTop(st.top); // 数字減るたびにupdateでレンダリング
      },
    });
  }

  onEnter() {
    const tl = gsap.timeline();
    tl.to(this.$icon, 1, {
      y: -3,
      ease: "expo.out",
    });
  }

  onLeave() {
    const tl = gsap.timeline();
    tl.to(this.$icon, 1, {
      y: 0,
      ease: "expo.out",
    });
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, () => {
      this.onClick();
    });
    this.$btn.on("mouseenter" + "." + this.name, () => {
      this.onEnter();
    });
    this.$btn.on("mouseleave" + "." + this.name, () => {
      this.onLeave();
    });
  }
}
