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
    this.items = document.querySelectorAll(".js-split");

    this.setup();
    this.setEvents();
  }

  setup() {
    for (let i = 0; i < this.items.length; i++) {
      this.item = new Item(this.items[i], i);
    }
  }

  setEvents() {
    super.setEvents();
  }
}
