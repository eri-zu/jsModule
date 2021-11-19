// ------------------------------------------------------------
//
//  Other
//
// ------------------------------------------------------------

export default class Other {

  constructor() {

  }

  // ------------------------------------------------------------
  //  getPageID
  // ------------------------------------------------------------
  getPageID() {

    this.pageID = $('body').attr('id');

  }

  // ------------------------------------------------------------
  //
  //  Data type check
  //
  // ------------------------------------------------------------

  isObject(value, ignoreArray) {
      return typeof value === 'object' && value !== null;
  }

  isNumber(value) {
      return typeof value === 'number';
  }

  isString(value) {
      return typeof value === 'string';
  }

  isFunction(value) {
      return typeof value === 'function';
  }

  isArray(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
  }

  isNull(value) {
      return value === null;
  }

  isUndefined(value) {
      return typeof value === 'undefined';
  }

  // ------------------------------------------------------------
  //
  //  other
  //
  // ------------------------------------------------------------
  setImgSPSize ($target){

    // responsive spのとき処理
    // if (!this.isResSP) return;
    // 一度だけ処理
    if (this.isSetSPSize) return;
    this.isSetSPSize = true;

    var $img = $target,
        len = $img.length;

    $img.each(function(i) {

        var w = Math.floor($(this).width() / 2),
            h = Math.floor($(this).height() / 2);

        $(this).attr({
            'width': w,
            'height': h,
        });

        if (len == i + 1) $(window).trigger('setSpZieEnd');

    });

  }

  // ------------------------------------------------------------
  //  スマホ操作無効
  // ------------------------------------------------------------
  notMove(flag=true, $wrap=$('#wrapper')) {

    if (flag) {

      $wrap.on('touchstart.noControl touchmove.noControl touchend.noControl', function(e){e.preventDefault();});

      // this.f = (e)=>{e.preventDefault();};
      // document.addEventListener('touchmove', this.f, { passive: false });

    } else {

      $wrap.off('touchstart.noControl touchmove.noControl touchend.noControl');

      // document.removeEventListener('touchmove', this.f, false);

    }

    // this.offNotMove();
    
    // $(window).on('touchstart.noControl touchmove.noControl touchend.noControl click.noControl', function(e){e.preventDefault();});

  }

  // offNotMove() {

  //   $(window).off('touchstart.noControl touchmove.noControl touchend.noControl');
  //   // $(window).off('touchstart.noControl touchmove.noControl touchend.noControl click.noControl');

  // }

  // notMove(flag=true) {

  //   if (flag) {

  //     this.f = (e)=>{e.preventDefault();};

  //     document.addEventListener('touchmove', this.f, { passive: false });

  //   } else {

  //     log('off',this.f)

  //     document.removeEventListener('touchmove', this.f, false);

  //   }

  // }

  // notMove() {

  //   this.offNotMove();
    
  //   this.f = (e)=>{e.preventDefault();};

  //   document.addEventListener('touchmove', this.f.bind(this), { passive: false });

  // }

  // offNotMove() {

    
  //   log(111,this.f);
  //   if (this.f) {
  //     log(111,this.f);
  //     document.removeEventListener('touchmove', this.f.bind(this));  
  //   }

  // }


  setPreventMousemove() {

    var self = this;

    this.removePrevent();
    $(window).on('touchmove.noControl', function(e){e.preventDefault();});

  }

  preventDefault(e) {

    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;

  }

  preventDefaultForScrollKeys(e) {

    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }

  }

  disableScroll($target) {

    if ($target.get(0).addEventListener) // older FF
        $target.get(0).addEventListener('DOMMouseScroll', this.preventDefault, false);
    $target.get(0).onwheel = this.preventDefault; // modern standard
    $target.get(0).onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    $target.get(0).ontouchmove  = this.preventDefault; // mobile
    // document.onkeydown  = this.preventDefaultForScrollKeys;

  }

  enableScroll($target) {

    if ($target.get(0).removeEventListener)
        $target.get(0).removeEventListener('DOMMouseScroll', this.preventDefault, false);
    $target.get(0).onmousewheel = document.onmousewheel = null; 
    $target.get(0).onwheel = null; 
    $target.get(0).ontouchmove = null;
    document.onkeydown = null;

  }

  // 全画面
  full() {

    var b = document.body;
    // var b = document.getElementById("wrapper")
    // var b = document.getElementsByClassName('menu03');

    if (b.requestFullScreen) {
      b.requestFullScreen();
    } else if(b.webkitRequestFullScreen) {
      b.webkitRequestFullScreen();
    } else if(b.mozRequestFullScreen) {
      b.mozRequestFullScreen();
    } else if(b.msRequestFullscreen) {
      b.msRequestFullscreen();
    } else {
      alert('ご利用のブラウザはフルスクリーン操作に対応していません');
      return;
    }

  }

}