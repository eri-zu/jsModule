//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import Item from "./Item";

export default class Controller extends Base {
  constructor() {
    super();

    this.items = document.querySelectorAll(".js-video");

    this.setup();
    this.setEvents();
  }

  setup() {
    this.ready();
  }

  ready() {
    console.log("yotube ready");
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.array = [];

    window.onYouTubeIframeAPIReady = () => {
      this.items.forEach((el, i) => {
        const item = new Item(el, i);
        this.array.push(item);
      });
    };
  }

  timeline() {}

  update() {}

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
