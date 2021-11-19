//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------
import gsap from "gsap";
export default class Controller {
  constructor() {
    this.name = "about";
  }

  setup(ns) {
    this.ns = ns;
  }

  update() {}

  onResize() {}

  onScroll() {}

  pageShow() {
    const tl = gsap.timeline();
    tl.to(document.body, 1, {
      opacity: 1,
    });

    return tl;
  }

  pageHide() {
    const tl = gsap.timeline();
    tl.to(document.body, 1, {
      opacity: 0,
    });

    return tl;
  }
}
