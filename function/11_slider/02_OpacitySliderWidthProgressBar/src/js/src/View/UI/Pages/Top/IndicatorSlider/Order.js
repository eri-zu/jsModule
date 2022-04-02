//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";

export default class Order extends Base {
  constructor(len) {
    super();

    this.len = len;
    this.current = 0;
    this.next = 1;
    this.prev = -1;

    this.setup();
    this.setEvents();
  }

  setup() {}

  right() {
    this.current++;

    // 端で止める
    // if (this.current > this.len - 1) this.current = this.len - 1;
    // this.next = this.current + 1;
    // this.prev = this.current - 1;

    // ループ
    if (this.current > this.len - 1) this.current = 0;
    this.next = this.current + 1;
    this.prev = this.current - 1;
  }

  left() {
    this.current--;

    // 端で止める
    // if (this.current < 0) this.current = 0;
    // this.next = this.current + 1;
    // this.prev = this.current - 1;

    // ループ
    if (this.current < 0) this.current = this.len - 1;
    this.next = this.current + 1;
    this.prev = this.current - 1;
  }

  move(index) {
    this.current = index;
    if (this.current > this.len - 1) this.current = this.len - 1;
    if (this.current < 0) this.current = 0;
    this.next = this.current + 1;
    this.prev = this.current - 1;
  }

  reset() {
    this.current = 0;
    this.next = 1;
    this.prev = -1;
  }

  onResize() {
    this.reset();
  }

  setEvents() {
    super.setEvents();
  }
}
