// ------------------------------------------------------------
//
//  Url
//
// ------------------------------------------------------------

export default class Url {

  constructor() {

  }

  // クエリ抜き出し
  getParam() {

    var url = location.href;
    var param = url.split('?')[1];
    if (param==undefined) return undefined;
    var paramItems = param.split('&');
    var list = {};
  
    for( var i = 0; i<paramItems.length; i++ ){

        paramItem = paramItems[i].split('=');
        list[paramItem[0]] = paramItem[1];

    }

    return list;

  }


  setParam (text) {

    window.history.pushState('','','?'+text);

  }
  
  // ハッシュ取得
  // -----------------------------------
  // return : location.hashの#を削除したやつ
  // -----------------------------------
  hash() {

    return location.hash.replace("#", "");

  }

  getHash () {

    return location.hash

  }

  setHash (text) {

    location.hash = text;

  }

  // 指定したstringがクッキーにセットされていたらtrue
  checkCookie(str) {

    var flag = null;

    if ($.cookie(str) == undefined || $.cookie(str) == '') flag = false;
    else flag = true;

    return flag;

  }

  // 指定したstringがクッキーにセットされていたらtrue
  getCookie(str) {

    if ($.cookie(str) == undefined || $.cookie(str) == '') return null;
    else return $.cookie(str);

  }

  setCookie(str, val, period) {

    var p = period || 5 * 1000; // 5秒
    // var p = period || 30 * 1000; // 30秒
    // var p = period || 15 * 60 * 1000; // 15分
    // var p = period || 7 * 24 * 60 * 60 * 1000; //7日
    var date = new Date();
    date.setTime( date.getTime() + ( p )); 

    $.cookie(str, val, { expires: date, path: '/' });

  }

  // ------------------------------------------------------------
  //  host,protcol
  // ------------------------------------------------------------
  protocol() {

    return location.protocol;

  }
    
  host() {

    return location.hostname;
    // return location.host

  }

  port() {

    return location.port;

  }
        
  path() {

    return location.pathname;

  }

}