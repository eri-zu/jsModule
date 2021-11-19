import barba from "@barba/core";
import EventsController from "./Events/Controller.es6";
import * as JudgePage from "./Utils/JudgePage.es6";

const isExitFunc = (c, name) => {
  return typeof c[name] == "function";
};

export default class Controller {
  constructor() {
    this.setup();
  }

  setup() {
    barba.init({
      timeout: 1000 * 5,
      debug: true,
      transitions: [
        {
          name: "default-transition",
          afterLeave: (pages) => {
            return this.afterLeave(pages);
          },
          enter: (pages) => {
            this.enter(pages);
          },
          after: (pages) => {
            this.after(pages);
          },
        },
      ],
    });
    this.addedEvents = {
      resize: [],
      scroll: [],
      update: [],
    };
    this.eventsController = new EventsController({
      onResize: (e) => this.onResize(e),
      onScroll: (e) => this.onScroll(e),
      onUpdate: (t) => this.onUpdate(t),
    });

    // this.enter({
    //   current: null,
    //   next: {
    //     namespace: this.namespace,
    //   },
    // });
  }

  get namespace() {
    return barba.data.current.namespace;
  }
  get currentController() {
    const ns = this.namespace;
    const c = gb.pages ? gb.pages.controllers[ns] : null;
    return c;
  }

  //events
  onResize(e) {
    //custom resize の処理
    // this.addedEvents.resize.forEach((events) => {
    //   if (events.isFire(this.namespace)) events.cb(e);
    // });
    //

    //common resize の処理(src/js/src/View/UI/Common/Controller.es6 onResize())
    // if (gb.UIcommon && isExitFunc(gb.UIcommon, "onResize"))
    //   gb.UIcommon.onResize(e);

    //各ページresize処理
    if (
      this.currentController &&
      isExitFunc(this.currentController, "onResize")
    )
      this.currentController.onResize(e);
  }
  onScroll(e) {
    //custom scroll の処理
    // this.addedEvents.scroll.forEach((events) => {
    //   if (events.isFire(this.namespace)) events.cb(e);
    // });

    //common scroll の処理
    // if (gb.UIcommon && isExitFunc(gb.UIcommon, "onScroll"))
    //   gb.UIcommon.onScroll(e);

    //各ページ scroll の処理
    if (
      this.currentController &&
      isExitFunc(this.currentController, "onScroll")
    )
      this.currentController.onScroll(e);
  }
  onUpdate(t) {
    //custom update の処理
    // this.addedEvents.update.forEach((events) => {
    //   if (events.isFire(this.namespace)) events.cb(t);
    // });
    //

    //common update の処理
    // if (gb.UIcommon && isExitFunc(gb.UIcommon, "update")) gb.UIcommon.update(t);

    //各ページの update の処理
    if (this.currentController && isExitFunc(this.currentController, "update"))
      this.currentController.update(t);
  }

  // add custom events
  addCustomEvents(
    $dom,
    name,
    cb = (e) => console.warn("set callback"),
    isFire = () => true
  ) {
    let id = 0;
    const r = this.addedEvents[name];
    if (!r) {
      id = this.eventsController.addEvents($dom, name, (e) => {
        if (isFire(this.namespace)) cb(e);
      });
    } else {
      id = name + "." + r.length;
      r.push({
        name,
        $dom,
        cb,
        isFire,
        id,
      });
    }

    return id;
  }

  removeCustomEvents(id) {
    const split = id.split(".");
    if (split.length <= 1) {
      console.warn("not currect id");
      return false;
    }

    if (["resize", "scroll", "update"].includes(split[0])) {
      this.addedEvents[split[0]] = this.addedEvents[split[0]].filter(
        (item) => item.id != id
      );
    } else {
      this.eventsController.removeCustomEvents(id);
    }
  }

  //transitions
  afterLeave({ current, next }) {
    //pointer-envets noneつける
    //ページ間の遷移でユーザーのアクションを禁止してバグらないように
    this.setLock();
    return this.currentController.pageHide(next.namespace);
  }
  enter({ current, next }) {
    const ns = next.namespace;
    const c = gb.pages.controllers[ns] ? gb.pages.controllers[ns] : null;
    if (!c) {
      console.warn("controller is not exit");
      return false;
    }

    //各ページのdynamic import?

    //遷移時の各ページのインスタンス化
    c.setup(ns);
    //遷移時の設定(共通)
    gb.UIcommon.pageChange(ns);
  }
  after({ current, next }) {
    //pointer-envets none外す
    this.removeLock();
    const ns = next.namespace;
    const c = gb.pages.controllers[ns] ? gb.pages.controllers[ns] : null;
    if (!c) {
      console.warn("controller is not exit");
      return false;
    }
    return c.pageShow(current.namespace);
  }

  //Lock Link
  setLock() {
    $("html").addClass("removeEvents");
  }
  removeLock() {
    $("html").removeClass("removeEvents");
  }
}
