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

    this.name = "Tab";

    this.$wrap = $(".js-tab");
    this.$btn = $(".js-tab_btn");
    this.$contents = $(".js-tab_contents");
    this.$item = $(".js-tab_contents_item");

    this.setup();
    this.setEvents();
  }

  setup() {
    gsap.set(
      $(".js-tab_contents:nth-child(n + 2)").find(".js-tab_contents_item"),
      {
        opacity: 0,
      }
    );

    gsap.set($(".js-tab_btn:nth-child(n + 2)"), {
      backgroundColor: "#fff",
      color: "#000",
    });
  }

  changeContents($prevBtn, $prevContents, $nextBtn, $nextContents) {
    if (this.tl) this.tl.kill();

    $prevBtn.removeClass("is-active");
    $prevContents.removeClass("is-active");
    $nextBtn.addClass("is-active");
    $nextContents.addClass("is-active");

    this.tl = gsap.timeline();

    this.tl
      // hide
      .add(this.hideBtn($prevBtn))
      .add(this.hideContents($prevContents))
      // show
      .add(this.showBtn($nextBtn))
      .add(this.showContents($nextContents));
  }

  showContents($contents) {
    const tl = gsap.timeline();

    const $item = $contents.find(".js-tab_contents_item");

    $item.each((i, el) => {
      tl.to(
        $(el),
        0.5,
        {
          opacity: 1,
          y: 0,
          startAt: {
            y: 3,
          },
          ease: "expo.out",
          delay: i * 0.03,
        },
        0
      );
    });

    return tl;
  }

  hideContents($contents) {
    const tl = gsap.timeline();

    const $item = $contents.find(".js-tab_contents_item");

    $item.each((i, el) => {
      tl.to(
        $(el),
        0.5,
        {
          opacity: 0,
          y: 3,
          ease: "expo.out",
          delay: i * 0.03,
        },
        0
      );
    });

    return tl;
  }

  showBtn($btn) {
    const tl = gsap.timeline();

    tl
      // btn
      .to(
        $btn,
        0.5,
        {
          backgroundColor: "#000",
          color: "#fff",
          ease: "expo.out",
        },
        0
      );
  }

  hideBtn($btn) {
    const tl = gsap.timeline();

    tl
      // btn
      .to(
        $btn,
        0.5,
        {
          backgroundColor: "#fff",
          color: "#000",
          ease: "expo.out",
        },
        0
      );
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, (e) => {
      if ($(e.currentTarget).hasClass("is-active")) return;

      const $prevBtn = $(".js-tab_btn.is-active");
      const $prevContents = $(".js-tab_contents.is-active");
      const index = this.$btn.index($(e.currentTarget));
      const $nextContents = this.$contents.eq(index);
      const $nextBtn = this.$btn.eq(index);

      console.log(index);
      this.changeContents($prevBtn, $prevContents, $nextBtn, $nextContents);
    });
  }
}
