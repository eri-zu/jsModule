# barbaBase ver2


個別ページの花形<br>
src/js/src/View/UI/Pages/Top/Controller.es6


## 基本的な処理

src/js/src/View/UI/Pages/内の各ページのコントローラのpageShow,pageHide関数で、アニメーションの呼び出しを行う
* common内のコントローラなどのshowやhideで、ページ判定を行わない


### 処理の流れ<br>
最初のロード時<br>
setup->pageShow<br>
遷移時<br>
pageHide->nextのsetup->nextのpageShow

### event周り
初期から設定済(remove不要)<br>
onResize,onScroll,update<br>
クラス内で定義するだけで上記のイベント発火時に読まれる

上記以外のイベントをつけたい場合

```
返り値はイベントのid

イベントを設定する
this.id = gb.barba.addEvents(
      $(window),　//イベントをつけたいdom
      "click", //取得するイベント
      this.onClick.bind(this), // callback
      (ns) => this.ns == ns //発火する条件、namespaceがくる（関数にする）
       );
       
イベントを削除する
gb.barba.removeCustomEvents(this.id)
```



