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
  constructor(item) {
    super();
    this.isSEv = true;
    this.isShow = false;
    this.item = item;

    this.setup();
    this.setEvents();
  }

  setup() {
    gsap.set(this.item, {
      scale: 0.7,
      opacity: 0,
    });

    this.onScroll(); // ページ入った時、すでにview内にあったら即発火
  }

  show() {
    gsap.to(this.item, 1.5, {
      scale: 1,
      opacity: 1,
      ease: "elastic.out(1, 0.7)",
    });
  }

  onScroll() {
    if (this.isShow) return;

    this.h = window.innerHeight;
    this.rect = this.item.getBoundingClientRect();
    this.top = this.rect.top;

    console.log(this.top);

    if (this.top < this.h - 200) {
      this.isShow = true;

      this.show();
    }
  }

  setEvents() {
    super.setEvents();
  }
}
