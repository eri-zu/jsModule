// ------------------------------------------------------------
//
//  String
//
// ------------------------------------------------------------

export default class String {

  constructor() {


  }

  isContain(str,contain) {

    // strの中に,containが存在したら
    if ( str.indexOf(contain) != -1 ) {
      return true;
    }

    return false;

  }

  // 0埋めで2桁にする関数
  add0(str,num=-2){
    
    return ( "000000000000" + str ).substr( num );

  }
    
  // 値段表記
  // -----------------------------------
  price(num) {

    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

  }

  // 文字列を反転
  // -----------------------------------
  // @str : 文字列(String)
  // return : 文字列(String)
  // -----------------------------------
  strReverse(str) {

    var i, len, res;
    res = "";
    len = str.length;
    i = 1;
    while (i <= len) {
      res += str.substr(-i, 1);
      i++;
    }
    return res;

  }
  
  // 文字列の全置換
  // -----------------------------------
  // @val  : 文字列
  // @oeg  : 置換前の文字列
  // @dest : 置換後の文字列
  // -----------------------------------
  replaceAll(val, org, dest) {

    return val.split(org).join(dest);

  }    
  
  strReplace(str, before, after) {

    var r = new RegExp( before, 'g');

    return str.replace( r , after );

  }


  // ユニークIDを取得
  // -----------------------------------
  unique() {

    return new Date().getTime();

  }
  
}