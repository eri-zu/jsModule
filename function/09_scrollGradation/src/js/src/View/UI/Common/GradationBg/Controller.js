//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";

export default class Controller extends Base {
  constructor(r1, g1, b1, r2, g2, b2) {
    super();

    this.r1 = r1;
    this.g1 = g1;
    this.b1 = b1;
    this.r2 = r2;
    this.g2 = g2;
    this.b2 = b2;

    this.isUEv = true;
    this.isREv = true;

    this.bg = document.querySelector(".js-bg");
    this.wrapper = document.querySelector("#wrapper");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.isStopUpdate = false;
    this.maxSt = document.body.clientHeight - window.innerHeight; // html最大スクロール量
    // this.maxSt = this.wrapper.clientHeight - window.innerHeight; // body最大スクロール量

    this.currentR = this.r1;
    this.currentG = this.g1;
    this.currentB = this.b1;
  }

  change() {}

  timeline() {}

  update() {
    if (this.isStopUpdate) return;

    // スクロール量
    this.st = window.scrollY; // htmlスクロール量
    // this.st = document.body.scrollTop; // bodyスクロール量

    // 数値目標 rgb(r1, g1, b1) → rgb(r1, g2, b2)
    this.targetR = m.map(this.st, this.r1, this.r2, 0, this.maxSt);
    this.targetG = m.map(this.st, this.g1, this.g2, 0, this.maxSt);
    this.targetB = m.map(this.st, this.b1, this.b2, 0, this.maxSt);

    // bg color 更新
    this.currentR += (this.targetR - this.currentR) * 0.08;
    this.currentG += (this.targetG - this.currentG) * 0.08;
    this.currentB += (this.targetB - this.currentB) * 0.08;
    this.bg.style.backgroundColor = `rgb(${this.currentR}, ${this.currentG}, ${this.currentB})`;
  }

  onResize() {
    this.maxSt = this.wrapper.clientHeight - window.innerHeight; // 最大スクロール量
  }

  setEvents() {
    super.setEvents();
  }
}
