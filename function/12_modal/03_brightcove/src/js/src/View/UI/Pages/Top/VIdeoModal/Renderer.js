//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";

export default class Controller extends Base {
  constructor($closebtn, $modal) {
    super();

    this.isREv = true;

    this.$modal = $modal;
    this.$closebtnIn = $closebtn.find(".js-videomodal_close_in");
    this.$linePath = this.$closebtnIn.find("line");
    this.$cover = $(".videomodal__cover");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.ready();
  }

  ready() {
    gsap.set(this.$linePath, {
      drawSVG: "0% 0%",
    });

    gsap.set(this.$cover, {
      opacity: 1,
    });
  }

  show() {
    const tl = gsap.timeline();

    // contents
    tl.to(
      this.$modal,
      1,
      {
        opacity: 1,
        ease: "power2.inOut",
      },
      0
    ).to(
      this.$cover,
      2,
      {
        opacity: 0,
        ease: "power2.inOut",
      },
      0
    );
    // path
    this.$linePath.each((i, el) => {
      tl.to(
        $(el),
        0.6,
        {
          delay: i * 0.2,
          drawSVG: "0% 100%",
          ease: "expo.out",
        },
        0.7
      );
    });

    return tl;
  }

  hide() {
    const tl = gsap.timeline();

    tl
      // contents
      .to(this.$modal, 0.5, {
        opacity: 0,
        ease: "expo.out",
        onComplete: () => {
          this.ready();
        },
      });

    return tl;
  }

  onEnter() {
    const tl = gsap.timeline();

    tl.to(this.$closebtnIn, 1.0, {
      rotation: "+=180",
      startAt: {
        rotation: 0,
      },
      ease: "power4.out",
    });
  }

  onLeave() {
    const tl = gsap.timeline();

    tl.to(this.$closebtnIn, 1.0, {
      rotation: "+=180",
      startAt: {
        rotation: 180,
      },
      ease: "power4.out",
    });
  }
}
