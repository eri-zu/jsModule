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
    if (this.item.classList.contains("-child")) {
      gsap.set($(this.item).find(".js-bounce_item_child"), {
        scale: 0.7,
        opacity: 0,
      });
    } else {
      gsap.set(this.item, {
        scale: 0.7,
        opacity: 0,
      });
    }

    this.onScroll(); // firstview内にあったら即発火
  }

  show() {
    gsap.to(this.item, 1.5, {
      scale: 1,
      opacity: 1,
      ease: "elastic.out(1, 0.7)",
    });
  }

  showChild() {
    const $child = $(this.item).find(".js-bounce_item_child");

    const tl = gsap.timeline();
    $child.each((i, el) => {
      tl.to(
        $(el),
        1.5,
        {
          opacity: 1,
          scale: 1,
          ease: "elastic.out(1, 0.7)",
        },
        0.1 * i
      );
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

      if (this.item.classList.contains("-child")) {
        this.showChild();
      } else {
        this.show();
      }
    }
  }

  setEvents() {
    super.setEvents();
  }
}
