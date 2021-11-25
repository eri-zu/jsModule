//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import Lottie from "./Lottie/Controller";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {
    new Lottie();
  }

  timeline() {}

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
