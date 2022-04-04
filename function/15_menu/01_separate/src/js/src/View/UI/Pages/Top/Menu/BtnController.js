//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
// import { UAParser } from "ua-parser-js";

export default class Controller {
  constructor() {
    this.$open = $(".js-menu_btnin__open");
    this.$openBar = this.$open.find(".js-menu_btnin__bar");
    this.$close = $(".js-menu_btnin__close");
    this.$closeBarWrap = this.$close.find(".js-menu_btnin__bar_wrap");

    this.setup();
  }

  setup() {
    this.isOpen = false;

    // --------------------------
    // bar wrap
    // --------------------------

    gsap.set(this.$closeBarWrap.eq(0), {
      rotation: 45,
      y: 5,
      transformOrigin: "50% 50%",
      z: 0,
    });

    gsap.set(this.$closeBarWrap.eq(1), { opacity: 0, z: 0 });

    gsap.set(this.$closeBarWrap.eq(2), {
      scale: 1,
      rotation: -45,
      y: -5,
      transformOrigin: "50% 50%",
      z: 0,
    });

    // --------------------------
    // bar
    // --------------------------

    gsap.set(this.$closeBarWrap.eq(0).find(".js-menu_btnin__bar"), {
      transformOrigin: "0% 50%",
      scaleX: 0,
      x: -5,
      z: 0,
    });

    gsap.set(this.$closeBarWrap.eq(2).find(".js-menu_btnin__bar"), {
      transformOrigin: "100% 50%",
      scaleX: 0,
      x: 5,
      z: 0,
    });
  }

  open() {
    this.isOpen = true;
    const tl = gsap.timeline();

    tl
      // open
      .to(
        this.$openBar.eq(0),
        0.5,
        {
          scaleX: 0,
          // x: 3,
          transformOrigin: "100% 0",
          ease: "power4.out",
          delay: 0.0,
        },
        0.0
      )
      .to(
        this.$openBar.eq(1),
        0.5,
        {
          scaleX: 0,
          // x: 10,
          transformOrigin: "100% 0",
          ease: "expo.out",
        },
        0.05
      )
      .to(
        this.$openBar.eq(2),
        0.5,
        {
          scaleX: 0,
          // x: 3,
          transformOrigin: "100% 0",
          ease: "power4.out",
          delay: 0.0,
        },
        0.1
      )

      // close
      .to(
        this.$closeBarWrap.eq(0).find(".js-menu_btnin__bar"),
        0.6,
        {
          scaleX: 1,
          x: 0,
          // ease: "elastic.out(0.8, 0.8)",
          ease: "expo.out",
        },
        0.3
      )
      .to(
        this.$closeBarWrap.eq(2).find(".js-menu_btnin__bar"),
        0.6,
        {
          scaleX: 1,
          x: 0,
          // ease: "elastic.out(0.8, 0.8)",
          ease: "expo.out",
        },
        0.4
      );

    return tl;
  }

  close() {
    this.isOpen = false;

    const tl = gsap.timeline();

    tl
      // close
      .to(
        this.$closeBarWrap.eq(0).find(".js-menu_btnin__bar"),
        0.3,
        {
          scaleX: 0,
          x: -3,
          ease: "expo.out",
        },
        0.0
      )
      .to(
        this.$closeBarWrap.eq(2).find(".js-menu_btnin__bar"),
        0.3,
        {
          scaleX: 0,
          x: 3,
          ease: "expo.out",
        },
        0.0
      )

      // open
      .set(this.$openBar.eq(0), { scaleX: 0 }, 0)
      .set(this.$openBar.eq(1), { scaleX: 0 }, 0)
      .set(this.$openBar.eq(2), { scaleX: 0 }, 0)
      .set(this.$o, { rotation: 0, y: 0 }, 0)

      .to(
        this.$openBar.eq(0),
        0.3,
        {
          rotation: 0,
          scaleX: 1,
          x: 0,
          transformOrigin: "100% 0",
          ease: "expo.out",
        },
        0.2
      )
      .to(
        this.$openBar.eq(1),
        0.3,
        {
          scaleX: 1,
          x: 0,
          transformOrigin: "100% 0",
          ease: "expo.out",
        },
        0.2
      )
      .to(
        this.$openBar.eq(2),
        0.3,
        {
          rotation: 0,
          scaleX: 1,
          x: 0,
          transformOrigin: "100% 0",
          ease: "expo.out",
        },
        0.2
      );

    return tl;
  }
}
