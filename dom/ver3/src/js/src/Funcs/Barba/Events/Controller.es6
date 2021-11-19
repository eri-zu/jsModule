export default class Controller {
  constructor(funcs) {
    this.funcs = funcs;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.$target = $(window);
    this.customEvents = [];
    this.t = 0;
  }

  setEvents() {
    this.$target.on("resize", this.onResize.bind(this));
    this.$target.on("scroll", this.onScroll.bind(this));
    this.update();
  }

  onResize(e) {
    this.funcs.onResize(e);
  }

  onScroll(e) {
    this.funcs.onScroll(e);
  }

  update() {
    ++this.t;
    this.funcs.onUpdate(this.t);
    requestAnimationFrame(this.update.bind(this));
  }

  addEvents($dom, eventName, cb) {
    const name = eventName + "." + this.customEvents.length;
    this.customEvents.push({
      $dom,
      name: name,
      eventName,
    });

    $dom.on(name, (e) => cb(e));

    return name;
  }

  removeCustomEvents(id) {
    this.customEvents = this.customEvents.filter((item) => {
      if (item.name == id) {
        item.$dom.off(item.name);
        return false;
      } else return true;
    });
  }
}
