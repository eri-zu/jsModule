//--------------------------------------------------
//
//  SpanText
//
//--------------------------------------------------
export default class SpanText {
  constructor($wrap) {
    this.$wrap = $wrap;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.set();
  }

  reset() {}

  set($wrap) {
    // 正規表現:様々な文字を一つの文字列で表現する記法

    // \s  空白文字:[ \t\n\x0B\f\r]
    // \S  非空白文字:[^\s]
    // \w  単語構成文字:[a-zA-Z_0-9]
    // \W  非単語文字:[^\w]

    // --------------------------
    // brタグがあっても問題がないように
    // brで区切る
    // --------------------------

    const text = this.$wrap.html(); // 渋谷公園<br />miyashita park
    const split = /<br>/g; // gオプション→全ての<br>を取得する
    const span = text.split(split); // split：指定文字列で分割して配列に格納

    // console.log(span)
    //  ['Hello, World'] 'span'
    //  ['こんにちは'] 'span'
    //  ['こ ん に ち は'] 'span'
    //  ['渋谷公園', 'miyashita ', 'park']

    // span化
    for (let i = 0; i < span.length; i++) {
      span[i] = span[i].replace(
        /(\S)/g, // 全ての非空白文字を
        '<div class="oh"><span>$1</span></div>' // 以下に置き換える
      );
    }

    // 配列をbr追加して連結
    const append = span.join("<br>");

    // append 連結したやつでhtml書き換え
    this.$wrap.html(append);
  }

  setEvents() {}
}
