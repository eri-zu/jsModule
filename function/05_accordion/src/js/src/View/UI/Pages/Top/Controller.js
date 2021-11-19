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
import Accordion from "./Accordion/Controller";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {
    new Accordion();
  }

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
