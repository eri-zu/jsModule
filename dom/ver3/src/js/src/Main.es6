// setting
import Conf from "Conf.es6";
import U from "BALANCeLibs/Util/Util.es6";
import Func from "BALANCeLibs/Util/Func.es6";
import Debugger from "BALANCeLibs/Util/Debugger.es6";

// Util
import Util from "Util/Controller.es6";

// model
import Loading from "View/UI/Common/Loading/Controller.es6";
import ResourceMgr from "Model/Resource/ResourceMgr.es6";

// events
import UpdateMgr from "BALANCeLibs/View/Events/EventMgr/UpdateMgr.es6";
import ResizeMgr from "BALANCeLibs/View/Events/EventMgr/ResizeMgr.es6";
import ScrollMgr from "BALANCeLibs/View/Events/EventMgr/ScrollMgr.es6";
import MouseMgr from "BALANCeLibs/View/Events/EventMgr/MouseMgr.es6";
// import UpdateList from 'BALANCeLibs/View/Events/EventMgr/UpdateList.es6';
// import ResizeList from 'BALANCeLibs/View/Events/EventMgr/ResizeList.es6';
import ScrollList from "BALANCeLibs/View/Events/EventMgr/ScrollList.es6";
// import MouseList from 'BALANCeLibs/View/Events/EventMgr/MouseList.es6';

// view
import View from "View/Controller.es6";

//barba

import BarbaController from "./Funcs/Barba/Controller.es6";

export default class Common {
  constructor() {
    this.onImmediate();
    this.setEvents();
  }

  onImmediate() {
    // ------------------------------------------------------------
    //  初期値の設定・データの配置
    //  util関数の初期化
    //  イベントマネージャーの設置
    // ------------------------------------------------------------
    // setting
    gb.conf = new Conf();

    // util
    gb.d = new Debugger();
    gb.u = new U();
    gb.f = new Func();

    if (gb.conf.isUpdateMgr) gb.up = new UpdateMgr();
    if (gb.conf.isResizeMgr) gb.r = new ResizeMgr();

    this.onReady();
  }

  onReady() {
    new Loading();

    // ------------------------------------------------------------
    //  View
    // ------------------------------------------------------------
    // Layout, UI, Effects
    gb.barba = new BarbaController();
    gb.v = new View();
    gb.barba.enter({
      current: null,
      next: {
        namespace: gb.barba.namespace,
      },
    });
    gb.barba.after({
      current: {
        namespace: null,
      },
      next: {
        namespace: gb.barba.namespace,
      },
    });
  }

  onLoad() {
    // ------------------------------------------------------------
    //  Util
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    //  Model
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    //  View
    // ------------------------------------------------------------
  }

  setEvents() {
    $(window).on("load", this.onLoad.bind(this));
  }
}

// ------------------------------------------------------------
//
//  Main
//
// ------------------------------------------------------------
(() => {
  // // globalオブジェクト
  if (window.gb === undefined) window.gb = {};

  gb.common = new Common();

  if (gb.up) gb.up.loop(); //全体のループスタート
})();
