//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { UAParser } from "ua-parser-js";
import BtnController from "./BtnController";
import MenuController from "./MenuController";
export default class Controller extends Base {
  constructor() {
    super();

    this.$menubtn = $(".js-menubtn");
    this.$link = $(".js-drawer_item_link");

    this.disableScroll = (e) => {
      e.preventDefault();
    };

    this.setup();
    this.setEvents();
  }

  setup() {
    this.btnController = new BtnController();
    this.menuController = new MenuController();
  }

  open() {
    if (this.tl) this.tl.kill();
    this.tl = gsap.timeline();

    this.tl
      // スクロール禁止
      .add(() => {
        this.st = $(window).scrollTop(); // スクロール量保存
        $(window).scrollTop(this.st); // スクロールトップ移動
        this.scrollStop(); // スクロール禁止
      })
      // btn
      .add(this.btnController.open())
      // menu
      .add(this.menuController.show(), 0.2);
  }

  close() {
    if (this.tl) this.tl.kill();
    this.tl = gsap.timeline();

    this.tl
      // スクロール禁止解除
      .add(() => {
        this.cancelScrollStop();
      })
      // btn
      .add(this.btnController.close())
      // menu
      .add(this.menuController.hide(), 0);
  }

  scrollStop() {
    // スクロール禁止
    const events = ["touchmove", "wheel"];

    events.forEach((event, i) => {
      document
        .getElementById("wrapper")
        .addEventListener(event, this.disableScroll, {
          passive: false,
        });
    });
  }

  cancelScrollStop() {
    // スクロール禁止解除
    const events = ["touchmove", "wheel"];

    events.forEach((event, i) => {
      document
        .getElementById("wrapper")
        .removeEventListener(event, this.disableScroll, {
          passive: false,
        });
    });
  }

  toggleShow() {
    if (this.isShow) {
      this.close();
    } else {
      this.open();
    }

    this.isShow = !this.isShow;
  }

  setEvents() {
    super.setEvents();

    this.$menubtn.on("click" + "." + this.name, () => {
      this.toggleShow();
    });

    this.$link.on("click" + "." + this.name, () => {
      this.toggleShow();
    });
  }
}
