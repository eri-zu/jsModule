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
import Renderer from "./Renderer.js";

export default class Controller extends Base {
  constructor() {
    super();

    this.name = "Accordion";

    this.$wrap = $(".js-accordion");
    this.$question = this.$wrap.find(".js-accordion_question");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.r = new Renderer();
  }

  setEvents() {
    super.setEvents();

    this.$question.on("click" + "." + this.name, (e) => {
      this.r.toggleShow(e.currentTarget);
    });
  }
}
