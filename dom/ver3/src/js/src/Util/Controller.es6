//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import UrlParamMgr from "Model/Url/UrlParamMgr.es6";
import JudgeEnvironment from "BALANCeLibs/Util/JudgeEnvironment.es6";
import Profiler from "BALANCeLibs/Util/Profiler.es6";

export default class Controller {
  constructor() {
    this.setup();
    this.setEvents();
  }

  setup() {
    // page id
    gb.pageID = $("body").attr("id");

    // UrlParam パラメータ調整用
    gb.urlp = new UrlParamMgr();

    // デバイス確認
    gb.je = new JudgeEnvironment();

    if (gb.conf.Profiler) new Profiler(); // Profiler
  }

  setEvents() {}
}
