//--------------------------------------------------
//
//  UIController
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import Item from "./Item.js";

export default class UIController extends Base {
  constructor() {
    super();

    this.isSEv = true;

    // DOM
    this.items = document.querySelectorAll(".js-bounce_item");
    this.array = [];

    this.setup();
    this.setEvents();
  }

  setup() {
    for (let i = 0; i < this.items.length; i++) {
      this.item = new Item(this.items[i]);
      this.array.push(this.item);
    }
  }

  update() {}

  timeline() {}

  removeEvents() {}

  setEvents() {
    super.setEvents();
  }
}
