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
import GradationBg from "../../Common/GradationBg/Controller";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {
    gb.gradationBg = new GradationBg(18, 149, 48, 211, 255, 221);
  }

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
