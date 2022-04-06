//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";

export default class Controller extends Base {
  constructor(item) {
    super();
    // this.isSEv = true;
    this.isShow = false;
    this.item = item;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.setSpan($(this.item));
    // this.onScroll(); // ページ入った時、すでにview内にあったら即発火
  }

  setSpan($item) {
    // 正規表現:様々な文字を一つの文字列で表現する記法

    // \s  空白文字:[ \t\n\x0B\f\r]
    // \S  非空白文字:[^\s]
    // \w  単語構成文字:[a-zA-Z_0-9]
    // \W  非単語文字:[^\w]

    // --------------------------
    // brタグがあっても問題がないように
    // brで区切る
    // --------------------------

    const text = $item.html(); // 渋谷公園<br />miyashita park
    const split = /<br>/g; // gオプション→全ての<br>を取得する
    const span = text.split(/<br>/); // split：指定文字列で分割して配列に格納

    // span化
    for (let i = 0; i < span.length; i++) {
      span[i] = span[i].replace(
        span[i], // 全てのセンテンスを
        `<span class="js-show_item">${span[i]}</span>` // 以下に置き換える
      );
    }

    // 配列をbr追加して連結
    const append = span.join("<br>");

    // append 連結したやつでhtml書き換え
    $item.html(append);
  }

  show() {
    gsap.to(this.item, 1.5, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
    });
  }

  onScroll() {
    if (this.isShow) return;

    this.h = window.innerHeight;
    this.rect = this.item.getBoundingClientRect();
    this.top = this.rect.top;

    if (this.top < this.h - 100) {
      this.isShow = true;
      this.show();
    }
  }

  setEvents() {
    super.setEvents();
  }
}
