// ------------------------------------------------------------
//
//  Swipe
//
// ------------------------------------------------------------
export default class Swipe {
  constructor($wrap = $("#wrapper"), $target = $("#wrapper")) {
    console.log("aaaaaaaa");
    // ---------------
    //  dom
    // ---------------
    this.$wrap = $wrap;
    this.$target = $target;

    // ---------------
    //  variable
    // ---------------

    // position
    this.sX = 0;
    this.mX = 0;
    this.eX = 0; //startX,moveX,endX
    this.dis = 0;
    this.minDis = 50;
    this.premX = 0;

    // time
    this.sT = 0;
    this.eT = 0;
    this.minT = 300; //startTime,ellapsedTime,

    this.onStart = () => {};
    this.onMove = () => {};
    this.onEnd = () => {};
    this.onSwipe = () => {};

    this.setup();
    this.setEvents();
  }

  setup() {}

  onTouchStart(e) {
    // time
    this.sT = new Date().getTime();
    // pos
    this.sX = e.changedTouches[0].pageX;

    this.premX = this.sX;

    // コールバック
    this.onStart();
  }

  onTouchMove(e) {
    // pos
    this.mX = e.changedTouches[0].pageX;
    // var dis = this.sX - this.mX;
    var dis = this.premX - this.mX;
    var sign = 1;
    if (dis < 0) sign = -1;

    this.onMove(sign, Math.abs(dis), this.mX);

    this.premX = this.mX;
  }

  onTouchEnd(e) {
    // コールバック
    this.onEnd();

    // time
    this.eT = new Date().getTime() - this.sT;
    var disT = this.sT - this.eT;
    // pos
    this.eX = e.changedTouches[0].pageX;
    var dis = this.sX - this.eX;
    var sign = 1;
    if (dis < 0) sign = -1;

    // 最小時間より長かったら、処理
    // if(this.minT < this.eT) this.onSwipe();
    // 最小距離より長かったら、処理
    // log(dis, this.minDis);
    if (Math.abs(dis) > this.minDis) this.onSwipe(sign);
  }

  removeEvents() {
    // this.$target.off("touchstart.Swipe");
    // this.$wrap.off("touchmove.Swipe");
    // this.$wrap.off("touchend.Swipe");
    this.$target
      .get(0)
      .removeEventListener("touchstart", this.onTouchStart.bind(this), {
        passive: false,
      });
    this.$wrap
      .get(0)
      .removeEventListener("touchmove", this.onTouchMove.bind(this), {
        passive: false,
      });
    this.$wrap
      .get(0)
      .removeEventListener("touchend", this.onTouchEnd.bind(this), {
        passive: false,
      });
  }

  setEvents() {
    this.removeEvents();

    var self = this;

    this.$target
      .get(0)
      .addEventListener("touchstart", this.onTouchStart.bind(this), {
        passive: false,
      });
    this.$wrap
      .get(0)
      .addEventListener("touchmove", this.onTouchMove.bind(this), {
        passive: false,
      });
    this.$wrap.get(0).addEventListener("touchend", this.onTouchEnd.bind(this), {
      passive: false,
    });

    // this.$target.on("touchstart.Swipe", (e) => {
    //   this.onTouchStart(e);
    // });
    // this.$wrap.on("touchmove.Swipe", (e) => {
    //   this.onTouchMove(e);
    // });
    // this.$wrap.on("touchend.Swipe", (e) => {
    //   this.onTouchEnd(e);
    // });
  }
}
