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

    this.$drawer = $(".js-drawer");
    // this.$item = $(".js-drawer_item");
    // this.$icon = $(".js-drawer_icon");

    this.$bg = $(".js-drawer_bg");
    this.$logo = $(".js-drawer_logo");
    this.$hiddenitem = $(".js-drawer_hiddenitem");

    this.setup();
    this.setEvents();
  }

  setup() {}

  update() {}

  show() {
    const tl = gsap.timeline();

    this.$drawer.css("pointer-events", "auto");

    tl
      // bg
      .to(this.$bg, 1, {
        x: 0,
        opacity: 1,
        ease: "expo.out",
      })
      // logo
      .to(
        this.$logo,
        1,
        {
          opacity: 1,
          ease: "expo.out",
        },
        0.4
      );
    // txt
    this.$hiddenitem.each((i, el) => {
      tl.to(
        $(el),
        1.1,
        {
          y: 0,
          startAt: {
            y: "100%",
          },
          delay: i * 0.05,
          ease: "expo.out",
          // ease: "elastic.out(1, 0.7)",
        },
        0.4
      );
    });

    return tl;
  }

  hide() {
    const tl = gsap.timeline();

    this.$drawer.css("pointer-events", "none");

    tl
      // logo
      .to(
        this.$logo,
        1,
        {
          opacity: 0,
          ease: "expo.out",
        },
        0
      )
      // txt
      .to(
        this.$hiddenitem,
        1,
        {
          y: "100%",
          ease: "expo.out",
        },
        0
      );
    // bg
    tl.to(
      this.$bg,
      1,
      {
        x: "40px",
        opacity: 0,
        ease: "expo.out",
      },
      0.3
    );

    return tl;
  }

  setEvents() {
    super.setEvents();
  }
}
