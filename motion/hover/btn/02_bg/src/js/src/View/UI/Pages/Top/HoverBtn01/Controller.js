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

    const $txt = this.$target.find(".js-btn01_txt");
    const $bg = this.$target.find(".js-btn01_bg");

    this.$target.tl = gsap.timeline();
    this.$target.tl
      // txt
      .to($txt, this.duration, {
        color: "#fff",
        ease: "expo.out",
      })
      // line
      .to(
        $bg,
        this.duration,
        {
          transformOrigin: "0% 50%",
          scaleX: 1.01,
          ease: "expo.out",
        },
        0
      );
  }

  onLeave() {
    let time;

    // 長くhoverしたらkill必要
    if (this.$target.tl.progress() >= 1) {
      console.log("長い");
      if (this.$target.tl) this.$target.tl.kill();
      this.$target.tl = gsap.timeline();
      time = 0;
    } else {
      console.log("短い");
      time = this.duration;
    }

    const $txt = this.$target.find(".js-btn01_txt");
    const $bg = this.$target.find(".js-btn01_bg");

    this.$target.tl
      // txt
      .to(
        $txt,
        this.duration,
        {
          color: "#000",
          ease: "expo.out",
        },
        time
      )
      // line
      .to(
        $bg,
        this.duration,
        {
          transformOrigin: "101% 50%",
          scaleX: 0,
          ease: "expo.out",
        },
        time
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
