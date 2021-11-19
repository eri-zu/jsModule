//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import Item from "./Item.js";

export default class Controller extends Base {
  constructor() {
    super();

    // DOM
    this.wraps = document.querySelectorAll(".js-anim_title");

    this.array = [];

    this.setup();
    this.setEvents();
  }

  setup() {
    for (let i = 0; i < this.wraps.length; i++) {
      const item = new Item(this.wraps[i]);
      this.array.push(item);
    }
  }

  setEvents() {
    super.setEvents();
  }
}
