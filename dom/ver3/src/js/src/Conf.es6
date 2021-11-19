// ------------------------------------------------------------
//
//  Config
//
// ------------------------------------------------------------

export default class Conf {

  constructor() {

    // ------------------------------------------------------------
    //  本番フラグ
    // ------------------------------------------------------------
    this.RELEASE = true;
    // this.RELEASE = false;

    // ------------------------------------------------------------
    //  フラグ関連
    // ------------------------------------------------------------
    // ログ出力, パラメータ, Stars
    this.LOG = true;
    this.PARAM = true;
    this.Profiler = true;
    this.LOADING = true;
    this.OPENING = false;
    this.EFFECT = false;
    this.INERTIA = false;

    // Event
    this.isUpdateMgr = true;
    this.isResizeMgr = true;
    this.isScrollMgr = true;
    this.isMouseMgr = true;

    if (this.RELEASE) {
      this.LOG = false;
      this.PARAM = false;
      this.Profiler = false;
      this.LOADING = true;
      this.OPENING = false;
      this.EFFECT = false;
      this.INERTIA = false;
    }

    // ------------------------------------------------------------
    //  basic width height
    // ------------------------------------------------------------
    // viewport size
    this.vDefW = window.innerWidth;
    this.vDefH = window.innerHeight;
    this.vW = window.innerWidth;
    this.vH = window.innerHeight;
    this.vSPW = window.innerWidth;
    this.vSPH = window.innerHeight;

    // target size
    this.DefW = 1300;
    this.DefH = 850;
    this.W = 1200;
    this.H = 750;
    this.SPW = 375;
    this.SPH = 667;

    // ------------------------------------------------------------
    //  ブレイクポイント
    // ------------------------------------------------------------
    this.bp00 = 375;
    this.bp01 = 768;
    this.bp02 = 1080;
    this.bp03 = 1280;

    // ------------------------------------------------------------
    //  レティナ対応
    // ------------------------------------------------------------
    this.isRetina = (window.devicePixelRatio && window.devicePixelRatio > 1)? true: false;

    // ------------------------------------------------------------
    //
    //  resource
    //
    // ------------------------------------------------------------

      // ------------------------------------------------------------
      //  API
      // ------------------------------------------------------------
      // this.APIData = APIData();
      this.APIURL = './setting.xml';

      // ------------------------------------------------------------
      //  URL
      // ------------------------------------------------------------
      // this.URLData = URLData();

      // ------------------------------------------------------------
      //  sound data
      // ------------------------------------------------------------
      // this.soundData = SoundData();

      // ------------------------------------------------------------
      //  video
      // ------------------------------------------------------------
      // this.videoData = videoData();

      // ------------------------------------------------------------
      //  img
      // ------------------------------------------------------------
      // this.imgData = imgData();

      // ------------------------------------------------------------
      //  web font loaded
      // ------------------------------------------------------------
      // this.webFontLoaded = false;

    // ------------------------------------------------------------
    //
    //  Ohter
    //
    // ------------------------------------------------------------
    this.isFirst = true;

    this.isSound = true;

  }

}
