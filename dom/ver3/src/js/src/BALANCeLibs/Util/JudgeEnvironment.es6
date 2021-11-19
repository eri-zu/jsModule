//--------------------------------------------------
//
//  JudgeEnvironment
//
//--------------------------------------------------

import Base from "BALANCeLibs/Util/Base.es6";

export default class JudgeEnvironment extends Base {
  constructor() {
    super();

    this.name = "JudgeEnvironment";

    this.isUEv = false; // update
    this.isREv = true; // resize
    this.isSEv = false; // scroll
    this.isMEv = false; // mouse

    this.setup();
    this.setEvents();
  }

  setup() {
    this.isREv = true;

    // デバイス判定
    gb.u.dv.isDeviceSP();
    gb.u.dv.isDeviceTAB();
    gb.u.dv.isDeviceMB();
    gb.u.dv.isDevicePC();
    gb.u.dv.setEventString();

    // ブラウザ判定
    gb.u.dv.isBrowserCheck();

    // responsive / portrait / landscape
    gb.u.dv.isDirection();
    gb.u.dv.isResponsive(
      gb.conf.bp00,
      gb.conf.bp01,
      gb.conf.bp02,
      gb.conf.bp03
    );
  }

  onResize() {
    gb.u.dv.isDirection.call(gb.u.dv);
    gb.u.dv.isResponsive.call(
      gb.u.dv,
      gb.conf.bp00,
      gb.conf.bp01,
      gb.conf.bp02,
      gb.conf.bp03
    );
  }
}
