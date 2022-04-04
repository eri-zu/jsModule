//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";
const easing = CustomEase.create("custom", "M0,0 C0.4,0 0,1 1,1 ");
export default class Controller extends Base {
  constructor(item, i) {
    super();

    this.item = item;
    this.videoId = item.dataset.videoid;
    this.playerDOM = this.item.querySelector(".player");

    this.$modal = $(this.item).parents(".js-videomodal");
    this.$bg = this.$modal.find(".js-videomodal_bg");
    this.$closebtn = this.$modal.find(".js-videomodal_close");

    this.isClicked = false;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.onYouTubeIframeAPIReady();
  }

  onYouTubeIframeAPIReady() {
    this.player = new YT.Player(this.playerDOM, {
      videoId: this.videoId,
      playerVars: {
        loop: 1, // ループ
        rel: 0, // 関連動画非表示
        // start: 819, // スタートタイム
        // controls: 0, // コントロールバー非表示
      },
      events: {
        onReady: (event) => {
          this.onPlayerReady(event);
        },
        onStateChange: (event) => {
          this.onPlayerStateChange(event);
        },
      },
    });
  }

  onPlayerReady(event) {
    // console.log("onPlayerReady");
    // this.player.playVideo();
    // console.log("aaaa");
  }

  onPlayerStateChange(event) {
    this.status = event.data;

    // 再生中
    if (this.status == YT.PlayerState.PLAYING) {
      console.log("再生中");
    }

    // 再生終了
    if (this.status == YT.PlayerState.ENDED) {
      console.log("再生終了");
      this.play(); // ループで再生
    }
  }

  play() {
    console.log("再生スタート");
    this.player.playVideo();
  }

  pause() {
    console.log("再生ストップ");
    this.player.pauseVideo();
  }

  setEvents() {
    super.setEvents();

    // 再生
    // this.item.addEventListener("click", (e) => {
    //   if (this.isClicked) return;
    //   this.isClicked = true;

    //   this.play();
    // });

    // ストップ
    this.$closebtn.on("click" + "." + this.name, (e) => {
      if (YT.PlayerState.PLAYING) this.pause();
    });

    this.$modal.on("click" + "." + this.name, (e) => {
      e.stopPropagation();
    });

    this.$bg.on("click" + "." + this.name, (e) => {
      if (YT.PlayerState.PLAYING) this.pause();
    });
  }
}
