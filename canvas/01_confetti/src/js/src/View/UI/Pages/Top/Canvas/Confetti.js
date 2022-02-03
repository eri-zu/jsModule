//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";

import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";
import { Conf } from "@/Conf";

export default class Confetti extends Base {
  constructor(canvas, ctx) {
    super();

    this.canvas = canvas;
    this.ctx = ctx;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.setParameter();
    this.init();
  }

  setParameter() {
    // 大きさランダム係数
    this.randomScale = {
      w: m.randomInt(gb.guiParameter.widthMin, gb.guiParameter.widthMax),
      h: m.randomInt(gb.guiParameter.heightMin, gb.guiParameter.heightMax),
    };

    // 位置y
    this.vy = m.randomInt(gb.guiParameter.vyMin, gb.guiParameter.vyMax);

    // 位置x
    this.radiusX = m.randomInt(
      gb.guiParameter.radiusXMin,
      gb.guiParameter.radiusXMax
    );
    this.degreeX = Math.random() * 360;
    this.degreeXV = m.randomInt(0.1, 1);

    // 回転
    this.rotation = Math.random() * 360;
    this.rotationV = gb.guiParameter.rotationV;

    // 高さ
    this.degreeH = Math.random() * 360;
    this.degreeHV = gb.guiParameter.degreeHV;

    // 色
    const colors = [
      ["#df0049", "#660671"],
      ["#00e857", "#005291"],
      ["#2bebbc", "#05798a"],
      ["#ffd200", "#b06c00"],
    ];
    const i = Math.round(Math.random() * (colors.length - 1));
    this.frontColor = colors[i][0];
    this.backColor = colors[i][1];
  }

  init() {
    this.per = Math.min(1, window.innerWidth / 1280);

    this.size = {
      w: this.randomScale.w * gb.conf.devicePixelRatio * this.per,
      h: this.randomScale.h * gb.conf.devicePixelRatio * this.per,
    };

    this.position = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
    };
  }

  display() {
    this.ctx.fillStyle = this.frontColor;
    this.ctx.beginPath();
    this.ctx.rect(this.position.x, this.position.y, this.size.w, this.size.h);
    this.ctx.fill();
  }

  draw() {
    // 蛇行
    this.vx = Math.sin(m.radian(this.degreeX)) * this.radiusX;
    this.position.x += this.vx;
    this.degreeX += this.degreeXV;

    // 落下
    this.vy *= 0.9999; // 空気抵抗
    this.position.y += this.vy;

    // 高さ（※高さ変えてx軸に沿って回転してる風に見せる）
    this.changedH = Math.cos(m.radian(this.degreeH)) * this.size.h;
    this.degreeH += this.degreeHV;

    // 回転
    this.rotation += this.rotationV;

    // 描画 method1
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(m.radian(this.rotation));
    this.ctx.fillStyle = this.changedH > 0 ? this.frontColor : this.backColor; // ひっくり返ったら色変える
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.size.w, this.changedH);
    this.ctx.fill();
    this.ctx.rotate(-m.radian(this.rotation));
    this.ctx.translate(-this.position.x, -this.position.y);

    // reset
    if (this.position.y > this.canvas.height + this.size.h) {
      this.reset();
    }
  }

  reset() {
    // 速度リセット
    // this.vy = m.randomInt(gb.guiParameter.vyMin, gb.guiParameter.vyMax);

    // 全部リセット
    this.setParameter();
    this.init();

    // 画面外に出たら上に戻す
    this.position.y = 0 - this.size.h;
  }

  onResize() {
    this.init();
  }

  setEvents() {
    super.setEvents();
  }
}
