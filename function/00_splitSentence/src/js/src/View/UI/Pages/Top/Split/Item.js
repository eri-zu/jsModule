//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import ScrollShow from "./ScrollShow/Controller";

export default class Controller extends Base {
  constructor(item) {
    super();
    this.item = item;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.setSpan(this.item);
    new ScrollShow(this.item.querySelectorAll(".js-show_item"));
  }

  setSpan(item) {
    // 正規表現:様々な文字を一つの文字列で表現する記法

    // \s  空白文字:[ \t\n\x0B\f\r]
    // \S  非空白文字:[^\s]
    // \w  単語構成文字:[a-zA-Z_0-9]
    // \W  非単語文字:[^\w]

    // brで区切る
    const text = item.innerHTML;
    const split = /<br>/g; // gオプション→全ての<br>を取得する
    const span = text.split(/<br>/); // split：指定文字列で分割して配列に格納

    // span化
    for (let i = 0; i < span.length; i++) {
      span[i] = span[i].replace(
        span[i], // 全てのセンテンスを
        `<span class="js-show_item">${span[i].trim()}</span>` // 以下に置き換える
      );
    }

    // 配列をbr追加して連結
    const newitem = span.join("<br>"); // join：指定文字列で配列の中身を連結して新たな文字列作成

    // 連結したやつでhtml書き換え
    item.innerHTML = newitem;
  }

  setEvents() {
    super.setEvents();
  }
}
