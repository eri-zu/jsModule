// ------------------------------------------------------------
//
//  Device
//
// ------------------------------------------------------------

export default class Device {

  constructor() {

    this.ua = window.navigator.userAgent.toLowerCase(); //useragent
    this.appV = window.navigator.appVersion.toLowerCase(); //appVersion
    this.isRes = null;
    this.isResSP = null; // responsive sp
    this.isResPC = null; // responsive pc

    this.isPC = null;
    this.isSP = null;
    this.isTAB = null;
    this.isMB = null;
    this.isIE = false;

    this.isSetSPSize = false;

  }

  // ------------------------------------------------------------
  //
  //  device
  //
  // ------------------------------------------------------------

  isDeviceSP(){

    var media = ["iphone","ipod","ipad","android","dream","cupcake","blackberry9500","blackberry9530","blackberry9520","blackberry9550","blackberry9800","webos","incognito","webmate"];
    var pattern = new RegExp(media.join("|"),"i");

    var b = pattern.test(this.ua);
    if (b) $('body').addClass('isDeviceSP');

    this.isSP = b;

  }

  isDeviceTAB(){

    var b = (this.ua.indexOf("windows") != -1 && this.ua.indexOf("touch") != -1)
      || this.ua.indexOf("ipad") != -1
      || (this.ua.indexOf("android") != -1 && this.ua.indexOf("mobile") == -1)
      || (this.ua.indexOf("firefox") != -1 && this.ua.indexOf("tablet") != -1)
      || this.ua.indexOf("kindle") != -1
      || this.ua.indexOf("silk") != -1
      || this.ua.indexOf("playbook") != -1;
    if (b) $('body').addClass('isDeviceTAB');

    this.isTAB = b;

  }

  isDeviceMB(){

    var b = (this.ua.indexOf("windows") != -1 && this.ua.indexOf("phone") != -1)
      || this.ua.indexOf("iphone") != -1
      || this.ua.indexOf("ipod") != -1
      || (this.ua.indexOf("android") != -1 && this.ua.indexOf("mobile") != -1)
      || (this.ua.indexOf("firefox") != -1 && this.ua.indexOf("mobile") != -1)
      || this.ua.indexOf("blackberry") != -1;
    if (b) $('body').addClass('isDeviceMB');

    this.isMB = b;

  }

  isDevicePC(){

    if (!(this.isSP || this.isTAB || this.isMB)) {
      
      $('body').addClass('isDevicePC');
      this.isPC = true;
      return;

    }

    this.isPC = false;

  }

  setEventString() {

    this.eClick = (this.isTab || this.isSP)? 'touchstart': 'click';
    this.eStart = (this.isTab || this.isSP)? 'touchstart': 'mousedown';
    this.eEnd = (this.isTab || this.isSP)? 'touchend': 'mouseup';
    this.eMove = (this.isTab || this.isSP)? 'touchmove': 'mousemove';

    this.eEnter = (this.isTab || this.isSP)? 'touchstart': 'mouseenter';
    this.eLeave = (this.isTab || this.isSP)? 'touchend': 'mouseleave';
    this.eOver = (this.isTab || this.isSP)? 'touchstart': 'mouseover';
    this.eOut = (this.isTab || this.isSP)? 'touchend': 'mouseout';

    this.eWheel = (this.isTab || this.isSP)? 'touchmove': 'mousewheel';
    this.eScroll = (this.isTab || this.isSP)? 'touchmove': 'scroll';

  }

  // スマフォ判定
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isSmt() {

    return navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;

  }

  // タブレット端末かどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isTablet() {

    return this.isIpad() || (this.isAndroid() && navigator.userAgent.indexOf('Mobile') === -1);

  }

  // iPad判定
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIpad() {

    return navigator.userAgent.indexOf('iPad') > 0;

  }

  // ------------------------------------------------------------
  //
  //  OS
  //
  // ------------------------------------------------------------

  // Android判定
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isAndroid() {

    var u;
    u = navigator.userAgent;
    return u.indexOf('BlackBerry') > 0 || u.indexOf('Android') > 0 || u.indexOf('Windows Phone') > 0;

  }

  isiPhone(){
    var pattern = new RegExp("iphone","i");
    return pattern.test(this.ua);
  }

  // iOS判定
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIos() {

    return navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0;

  }

  // PS3判定
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isPs3() {

    var u;
    u = navigator.userAgent;
    return u.indexOf('PLAYSTATION 3') > 0;

  }
    
  // VITA判定
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isVita() {

    var u;
    u = navigator.userAgent;
    return u.indexOf('PlayStation Vita') > 0;

  }

  // ------------------------------------------------------------
  //
  //  browser
  //
  // ------------------------------------------------------------
  isBrowserCheck() {

    this.isIEVersion();
    this.isEdge();
    this.isChrome();
    this.isFF();
    this.isSafari();
    this.isOpera();
    this.isIOSNotSfari();
    this.isAPPBrowser();

  }


  // IEかどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIe() {

    var ua;
    ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('msie') !== -1 || ua.indexOf('trident/7') !== -1;

  }

  // WINかどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isWin() {

    return navigator.platform.indexOf("Win") !== -1;

  }

  // googleChromeかどうか pcのみ
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isChrome() {

    if (this.ua.indexOf('chrome') !== -1) {

      $('body').addClass('isChorme');
      return true;

    } else {

      return false;

    }

  }    
  
  // FireFoxかどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isFF() {

    if (this.ua.indexOf('firefox') !== -1) {

      $('body').addClass('isFF');
      return true;

    } else {

      return false;

    }

  }

  isSafari(){

    if (!this.isChrome() && this.ua.indexOf("lunascape") == -1) {

      var pattern = new RegExp("safari","i");
      if (pattern.test(this.ua)) {

        $('body').addClass('isSafari');
        return true;

      } else {

        return false

      }
  

    } else {

      return false

    }

  }

  isOpera(){

    var pattern = new RegExp("opera","i");
    if (pattern.test(this.ua)) {

      $('body').addClass('isOpera');
      return true;

    } else {

      return false

    }

  }

  // iOSのsafari以外かどうか spでsafariかsafariでないか(chromeかandroidの標準ブラウザか)を判定したい場合はこちらを使う
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIOSNotSfari() {

    if ((this.isIos() && this.ua.indexOf('safari') === -1) || (this.isIos() && this.ua.indexOf('crios') > 0) || (this.isIos() && this.ua.indexOf('gsa') > 0)) {

      $('body').addClass('isIOSNotSafari');
      // alert('isIOSNotSafari');
      return true;

    } else {

      $('html').addClass('isIOSSafari');
      // alert('isSafari');
      return false;
    
    }

  }

  isAPPBrowser() {

    // debug
    // var r01 = this.ua.indexOf("fban/fbios;fbav") !== -1;
    // var r02 = this.ua.indexOf("twitter") !== -1;

    // // $('body').prepend(String(r01));
    // // $('body').prepend(String(r02));

    // // alert(r01);
    // // alert(r02);

    if (this.ua.indexOf("fban/fbios;fbav") !== -1 || this.ua.indexOf("twitter") !== -1) {

      $('body').addClass('isAPPBrowser');
      return true;

    } else {

      return false;
    
    }

  }

  // ------------------------------------------------------------
  //
  //  version
  //
  // ------------------------------------------------------------
  // IE8以下かどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIe8Under() {

    var msie;
    msie = navigator.appVersion.toLowerCase();
    msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
    return msie <= 8 && msie !== 0;

  }
    
  // IE9以下かどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIe9Under() {

    var msie;
    msie = navigator.appVersion.toLowerCase();
    msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
    return msie <= 9 && msie !== 0;

  }

  // IE10以下かどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIe10Under() {

    var msie;
    msie = navigator.appVersion.toLowerCase();
    msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
    return msie <= 10 && msie !== 0;

  }

  // IE11以下かどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isIe11Under() {

    var b = this.isIe10Under() || (this.ua.indexOf("trident") != -1);
    return b;
    // return true;

  }

  // edgeかどうか
  // -----------------------------------
  // return : true or false(boolean)
  // -----------------------------------
  isEdge() {

    log(this.ua.indexOf("AppleWebkit"),this.ua.indexOf("Edge"),this.ua,this.appV);
    var b = (this.ua.indexOf("applewebkit") >= 0 && this.ua.indexOf("edge") != -1);

    if (b) 
      $('body').addClass('isEdge');

    return b;
    // return true;

  }

  isIEVersion(){

    $('body').addClass('isIE');
    this.isIE = true;
      
    if (this.appV.indexOf("msie 10.") != -1) {
      $('body').addClass('isIE10');
      return 'ie10';
    } else if (this.appV.indexOf("msie 9.") != -1) {
      $('body').addClass('isIE9');
      return 'ie9';
    } else if (this.appV.indexOf("msie 8.") != -1) {
      $('body').addClass('isIE8');  
      return 'ie8';
    } else if (this.appV.indexOf("msie 7.") != -1) {
      $('body').addClass('isIE7');
      return 'ie7';
    } else if (this.appV.indexOf("msie 6.") != -1) {
      $('body').addClass('isIE6');
      return 'ie6';
    } else if (this.appV.indexOf("trident") != -1) {
      $('body').addClass('isIE11');
      return 'ie11';
    }

    $('body').removeClass('isIE');
    this.isIE = false;
    return 'notIE';

  }

  isAndroidVersion() {

    if( this.ua.indexOf("android") > 0 ) {

        var version = parseFloat(this.ua.slice(this.ua.indexOf("android")+8));
        return version;
        
    }

  }

  isiphoneVersion() {

    if( this.ua.indexOf("iPhone OS") > 0 ) {

        var version = parseFloat(this.ua.slice(this.ua.indexOf("iPhone OS")+10));
        return version;

    }

  }

  // ------------------------------------------------------------
  //
  //  portrait / landscape
  //
  // ------------------------------------------------------------
  isDirection () {

    var W = window.innerWidth,
        H = window.innerHeight;

    if (H > W) {
      $("body").addClass("portrait");
      $("body").removeClass("landscape");
    }else{
      $("body").addClass("landscape");
      $("body").removeClass("portrait");
    }

  }

  // ------------------------------------------------------------
  //
  //  responsive 横幅を見る
  //
  // ------------------------------------------------------------
  isResponsive (bp00=375-1, bp01=960, bp02=1080, bp03=1280+1) {

    var W = window.innerWidth,
        H = window.innerHeight;

    // ブレイクしたときに一度だけイベントを発行する
    if (W > bp00 && this.isRes=='sp-s') $(window).trigger('sp_s_sp');
    if (W <= bp00 && this.isRes=='sp') $(window).trigger('sp_sp_s');
    if (W > bp01 && this.isRes=='sp') $(window).trigger('sp_tab');
    if (W <= bp01 && this.isRes=='tab') $(window).trigger('tab_sp');
    if (W > bp02 && this.isRes=='tab') $(window).trigger('tab_pc');
    if (W <= bp02 && this.isRes=='pc') $(window).trigger('pc_tab');
    if (W > bp03 && this.isRes=='pc') $(window).trigger('pc_pc_w');
    if (W <= bp03 && this.isRes=='pc-w') $(window).trigger('pc_w_pc');

    // isRes
    if (W <= bp00) this.isRes = 'sp-s'
    if (W > bp00 && W <= bp01) this.isRes = 'sp';
    if (W > bp01 && W <= bp02) this.isRes = 'tab';
    if (W > bp02 && W <= bp03) this.isRes = 'pc';
    if (W > bp03) this.isRes = 'pc-w';

    // isResPC, isResSP
    if (W > bp01) {
      this.isResSP = false;
      this.isResPC = true;
      $('body').removeClass('isResponsiveSP');
      $('body').addClass('isResponsivePC');
    } else {
      this.isResSP = true;
      this.isResPC = false;
      $('body').addClass('isResponsiveSP');
      $('body').removeClass('isResponsivePC');
    }

    log(this.isResSP, this.isResPC);

  }

  // ------------------------------------------------------------
  //
  //  user agentでpc,sp振り分け
  //
  // ------------------------------------------------------------
  isPCSP(urlPC, urlSP) {

    var url = location.href;

    if (!this.isPC && !this.isTAB && (url.indexOf('pc') != -1)) {

      location.href = urlSP;
    
    } 

    if (this.isPC && url.indexOf('pc') == -1) {

      location.href = urlPC;
    
    } 

    if (this.isTAB && url.indexOf('pc') == -1) {

      location.href = urlPC;
    
    } 

  }

}