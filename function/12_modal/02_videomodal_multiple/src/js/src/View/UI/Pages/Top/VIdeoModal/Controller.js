//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import Renderer from "./Renderer.js";
import { UAParser } from "ua-parser-js";

export default class Controller extends Base {
  constructor() {
    super();

    this.isREv = true;

    // 共通要素
    this.$modal = $(".js-videomodal");
    this.$closebtn = this.$modal.find(".js-videomodal_close");

    // 個別要素
    this.$openbtn = $(".js-videomodal_openbtn");

    this.disableScroll = (e) => {
      e.preventDefault();
    };

    this.setup();
    this.setEvents();
  }

  setup() {
    this.renderer = new Renderer(this.$closebtn, this.$modal);
  }

  appendVideo(target) {
    const id = target.dataset.id;
    console.log(target);

    target.video = document.querySelector(id);
    console.log(target.video);

    // 初回読み込み時カクつくので
    this.delay = this.isAppend ? 0 : 0.3;

    if (target.isAppend) return;
    target.isAppend = true;

    const src =
      UAParser().device.type !== "mobile"
        ? target.video.dataset.srcpc
        : target.video.dataset.srcsp;

    target.video.src = src;
  }

  show(target) {
    this.appendVideo(target);

    this.$modal.css("pointer-events", "auto");

    this.tl = gsap.timeline();

    this.tl
      // スクロール禁止
      .add(() => {
        this.st = $(window).scrollTop(); // スクロール量保存
        $(window).scrollTop(this.st); // スクロールトップ移動
        this.scrollStop(); // スクロール禁止
      }, this.delay)
      // show
      .add(this.renderer.show(), this.delay);
    // video再生
    // .add(() => {
    //   this.video.play();
    // });
  }

  hide() {
    this.$modal.css("pointer-events", "none");

    if (this.tl) this.tl.kill();

    this.tl = gsap.timeline();

    this.tl
      // videoストップ
      .add(() => {
        this.video.pause();
      })
      // スクロール禁止解除
      .add(() => {
        this.cancelScrollStop();
      })
      // hide
      .add(this.renderer.hide())
      // video resest
      .add(() => {
        this.video.load();
      });
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

  onResize() {
    this.renderer.onResize();
  }

  setEvents() {
    super.setEvents();

    this.$openbtn.on("click" + "." + this.name, (e) => {
      this.show(e.currentTarget);

      setTimeout(() => {
        e.currentTarget.video.play();
      }, 1.0 + this.delay);
    });

    this.$closebtn.on("click" + "." + this.name, () => {
      this.hide();
    });

    this.$closebtn.on("mouseenter" + "." + this.name, () => {
      this.renderer.onEnter();
    });

    this.$closebtn.on("mouseleave" + "." + this.name, () => {
      this.renderer.onLeave();
    });
  }
}
