//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import SetSpan from "./SetSpan.js";

export default class Controller extends Base {
  constructor(wrap) {
    super();
    // this.isSEv = true; // scroll

    this.isShow = false;

    this.$wrap = $(wrap);

    this.setup();
    this.setEvents();
  }

  setup() {
    // spanで1文字1文字囲む
    new SetSpan(this.$wrap);

    // 各spanを取得
    this.$span = this.$wrap.find("span");
    this.$span.parent().css({ display: "inline-block" });
    this.$span.css({ display: "inline-block" });

    // ready
    // this.$span.each((index, el) => {
    //   const h = $(el).height();

    //   gsap.set($(el), {
    //     y: h,
    //     opacity: 0,
    //   });
    //   gsap.set($(el).parent(), {
    //     y: h / 4,
    //   });
    // });
  }

  show() {
    this.$span.each((index, el) => {
      // span
      gsap.to($(el), 1.2, {
        opacity: 1,
        y: 0,
        z: 1,
        ease: "expo.out",
        delay: index * 0.05,
      });
      //div
      gsap.to($(el).parent(), 1.2, {
        y: 0,
        z: 1,
        ease: "power2.out",
        delay: index * 0.05,
      });
    });
  }

  onScroll() {
    // if (this.isShow) return;
    // this.h = window.innerHeight;
    // this.rect = this.$wrap.get(0).getBoundingClientRect();
    // this.top = this.rect.top;
    // if (this.top < this.h - 100) {
    //   this.isShow = true;
    //   this.show();
    // }
  }

  setEvents() {
    super.setEvents();

    // setTimeout(() => {
    //   this.show();
    // }, 3000);
  }
}
