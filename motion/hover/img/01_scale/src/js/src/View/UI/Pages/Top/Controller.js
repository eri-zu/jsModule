//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import HoverImg from "./HoverImg/Controller";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {
    new HoverImg();
  }

  timeline() {}

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
