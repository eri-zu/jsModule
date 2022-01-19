//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";

export default class Controller extends Base {
  constructor() {
    super();

    this.name = "HoverBtn01";
    this.$item = $(".js-btn01");

    this.duration = 0.5;

    this.setup();
    this.setEvents();
  }

  setup() {}

  onEnter($target) {
    this.$target = $target;

    if (this.$target.tl) this.$target.tl.kill();

    const $txtwrap = this.$target.find(".js-btn01_txtwrap");
    const $bar01 = this.$target.find(".js-btn01_bar01");
    const $bar02 = this.$target.find(".js-btn01_bar02");
    const $path = this.$target.find(".js-btn01_icon path");
    const $txt = this.$target.find(".js-btn01_txt");
    const $bg = this.$target.find(".js-btn01_bg");

    this.$target.tl = gsap.timeline();
    this.$target.tl
      // bg
      .to(
        $bg,
        1,
        {
          x: "100%",
          ease: "expo.out",
        },
        0
      )
      // txtwrap
      .to(
        $txtwrap,
        1,
        {
          y: "-50%",
          ease: "expo.out",
        },
        0
      )
      // path
      .to(
        $path,
        1,
        {
          fill: "#fff",
          ease: "expo.out",
        },
        0
      )
      // txt
      .to(
        $txt,
        1,
        {
          color: "#fff",
          ease: "expo.out",
        },
        0
      )
      // bar
      .to(
        $bar01,
        1,
        {
          backgroundColor: "#fff",
          ease: "expo.out",
        },
        0
      )
      // bar
      .to(
        $bar02,
        1,
        {
          scaleX: 2.5,
          ease: "expo.out",
        },
        0
      );
  }

  onLeave($target) {
    this.$target = $target;
    if (this.$target.tl) this.$target.tl.kill();

    const $txtwrap = this.$target.find(".js-btn01_txtwrap");
    const $bar01 = this.$target.find(".js-btn01_bar01");
    const $bar02 = this.$target.find(".js-btn01_bar02");
    const $path = this.$target.find(".js-btn01_icon path");
    const $txt = this.$target.find(".js-btn01_txt");
    const $bg = this.$target.find(".js-btn01_bg");

    this.$target.tl = gsap.timeline();

    this.$target.tl
      // bg
      .to(
        $bg,
        1,
        {
          x: "0",
          ease: "expo.out",
        },
        0
      )
      // txt
      .to(
        $txtwrap,
        1,
        {
          y: 0,
          ease: "expo.out",
        },
        0
      )
      // path
      .to(
        $path,
        1,
        {
          fill: "#003c0e",
          ease: "expo.out",
        },
        0
      )
      // txt
      .to(
        $txt,
        1,
        {
          color: "#003c0e",
          ease: "expo.out",
        },
        0
      )
      // bar
      .to(
        $bar01,
        1,
        {
          backgroundColor: "#003c0e",
          ease: "expo.out",
        },
        0
      )
      // bar
      .to(
        $bar02,
        1,
        {
          scaleX: 1,
          ease: "expo.out",
        },
        0
      );
  }

  setEvents() {
    super.setEvents();

    // --------------------------
    // hover
    // --------------------------
    this.$item.on("mouseenter" + "." + this.name, (e) => {
      if (window.innerWidth <= 768) return;
      this.onEnter($(e.currentTarget));
    });

    this.$item.on("mouseleave" + "." + this.name, (e) => {
      if (window.innerWidth <= 768) return;
      this.onLeave($(e.currentTarget));
    });
  }

  removeEvents() {}
}
