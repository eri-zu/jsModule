//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "BALANCeLibs/Util/Base.es6";
import * as m from "Util/Math/index.es6";

export default class Controller extends Base {
  constructor() {
    super();

    this.setup();
    this.setEvents();
  }

  setup() {}

  pageChange(ns) {
    this.ns = ns;
  }

  timeline() {}

  update() {}

  onResize() {}
}
