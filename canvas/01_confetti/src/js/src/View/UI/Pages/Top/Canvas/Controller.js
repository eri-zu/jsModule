//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import Confetti from "./Confetti";
import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";
import { Conf } from "@/Conf";
import * as dat from "lil-gui";

export default class Controller extends Base {
  constructor() {
    super();

    this.isREv = true;
    this.isUEv = true;

    this.gui = new dat.GUI();

    this.setup();
    this.setEvents();
  }

  setup() {
    /**
     * canvas
     */
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth * gb.conf.devicePixelRatio;
    this.canvas.height = window.innerHeight * gb.conf.devicePixelRatio;

    /**
     * GUI
     */
    gb.guiParameter = {
      number: 100,
      widthMin: 8,
      widthMax: 10,
      heightMin: 8,
      heightMax: 15,
      vyMin: 5,
      vyMax: 10,
      degreeHV: 3,
      rotationV: 3,
      radiusXMin: -5,
      radiusXMax: 5,
    };

    this.gui
      .add(gb.guiParameter, "number")
      .min(1)
      .max(500)
      .step(5)
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "widthMin")
      .min(1)
      .max(50)
      .step(0.1)
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "widthMax")
      .min(1)
      .max(50)
      .step(0.1)
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "heightMin")
      .min(1)
      .max(50)
      .step(0.1)
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "heightMax")
      .min(1)
      .max(50)
      .step(0.1)
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "vyMin")
      .min(0.1)
      .max(50)
      .step(0.1)
      .name("speedYMin")
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "vyMax")
      .min(0.1)
      .max(50)
      .step(0.1)
      .name("speedYMax")
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "degreeHV")
      .min(0.1)
      .max(30)
      .step(0.1)
      .name("rotation3D")
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "rotationV")
      .min(0.1)
      .max(30)
      .step(0.1)
      .name("rotation2D")
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "radiusXMin")
      .min(-30)
      .max(30)
      .step(0.1)
      .name("rangeXMin")
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
    this.gui
      .add(gb.guiParameter, "radiusXMax")
      .min(-30)
      .max(30)
      .step(0.1)
      .name("rangeXMax")
      .onFinishChange(() => {
        this.ready();
        this.display();
      });
  }

  ready() {
    const len = gb.guiParameter.number;
    this.array = [];

    for (let i = 0; i < len; i++) {
      this.array.push(new Confetti(this.canvas, this.ctx));
    }
  }

  display() {
    for (let i = 0; i < this.array.length; i++) {
      this.array[i].display();
    }
  }

  update() {
    this.ctx.clearRect(
      0,
      0,
      window.innerWidth * gb.conf.devicePixelRatio,
      window.innerHeight * gb.conf.devicePixelRatio
    );

    if (this.array) {
      for (let i = 0; i < this.array.length; i++) {
        this.array[i].draw();
      }
    }
  }

  onResize() {
    this.canvas.width = window.innerWidth * gb.conf.devicePixelRatio;
    this.canvas.height = window.innerHeight * gb.conf.devicePixelRatio;

    for (let i = 0; i < this.array.length; i++) {
      this.array[i].onResize();
    }
  }

  setEvents() {
    super.setEvents();

    this.ready();
    this.display();
  }
}
