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

import IndicatorSlider from "./IndicatorSlider/Controller";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {
    new IndicatorSlider();
  }

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
