//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------
import gsap from "gsap";
export default class Controller {
  constructor() {
    this.name = "top";
  }

  setup(ns) {
    this.ns = ns;
    this.setEvents();
  }

  setEvents() {
    //customEvents
    // this.clickID = gb.barba.addCustomEvents(
    //   $(window),
    //   "click",
    //   this.onClick.bind(this),
    //   (ns) => this.ns == ns
    // );
  }

  removeEvents() {
    // gb.barba.removeCustomEvents(this.clickID);
  }

  onClick() {
    console.log("click");
  }

  update() {}

  onResize() {}

  onScroll() {}

  pageShow(prevns) {
    //prevns => 前のページのnamespace
    const tl = gsap.timeline();
    tl.to(document.body, 1, {
      opacity: 1,
    });

    return tl;
  }

  pageHide(nextns) {
    //nextns => 次のページのnamespace

    //timelineやpromiseで返すとその処理を待つ
    this.removeEvents();
    const tl = gsap.timeline();
    tl.to(document.body, 1, {
      opacity: 0,
    });

    return tl;
  }
}
