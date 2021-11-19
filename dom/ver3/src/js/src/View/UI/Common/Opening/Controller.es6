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

    // this.timeline();
  }

  setup() {}

  timeline() {}

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();

    // $(window).on('loadingEnd', this.timeline.bind(this));
    $(window).on("loadingEnd", this.setup.bind(this));
  }
}
