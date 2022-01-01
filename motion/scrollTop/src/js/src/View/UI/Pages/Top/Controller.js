//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";

import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";

import { Conf } from "@/Conf";
import ScrollTop from "./ScrollTop/Controller";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();

    // this.timeline();
  }

  setup() {
    new ScrollTop();
  }

  timeline() {
    // gsap.to($(".demoSvg svg line"), 1, {
    //   drawSVG: "0 0",
    //   ease: CustomEase.create(
    //     "custom",
    //     "M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1.001,1,1"
    //   ),
    // });
    // Conf.isFirst = false;
  }

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
