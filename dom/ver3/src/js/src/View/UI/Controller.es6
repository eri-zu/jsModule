//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "BALANCeLibs/Util/Base.es6";
import * as m from "Util/Math/index.es6";

import Pages from "./Pages/Controller.es6";
import Common from "./Common/Controller.es6";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();

    // this.timeline();
  }

  setup() {
    this.common = gb.UIcommon = new Common();
    this.pages = gb.pages = new Pages();
  }

  timeline() {}

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
