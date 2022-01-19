//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";
import gsap from "gsap";
import { CustomEase } from "@BALANCeLibs/View/gsap/CustomEase/CustomEase.js";
import { UAParser } from "ua-parser-js";
import * as dat from "lil-gui";

export default class Controller extends Base {
  constructor() {
    super();

    this.name = "GoTop";
    this.$btn = $(".js-goTop");
    this.$resetbtn = $(".js-reset");
    this.html = document.documentElement;

    this.gui = new dat.GUI();

    this.setup();
    this.setEvents();
  }

  setup() {
    this.obj = {
      duration: 0.8,
    };

    this.gui.add(this.obj, "duration").min(0.1).max(3).step(0.1);
  }

  onClick(target) {
    let easing = $(target).data("easing");

    if (easing.startsWith("custom")) {
      if (easing == "custom.out") {
        easing = CustomEase.create(
          "custom",
          "M0,0 C0,0 0.018,0.198 0.05,0.316 0.076,0.415 0.063,0.423 0.1,0.518 0.127,0.589 0.134,0.661 0.172,0.726 0.201,0.777 0.219,0.823 0.26,0.864 0.291,0.897 0.338,0.934 0.378,0.956 0.416,0.976 0.425,0.97 0.47,0.98 0.524,0.992 0.636,0.994 0.695,0.997 0.812,1.002 1,1 1,1 "
        );
      } else if (easing == "custom.in") {
        easing = CustomEase.create(
          "custom",
          "M0,0 C0,0 0.193,-0.002 0.315,0.003 0.369,0.005 0.454,0.008 0.506,0.019 0.55,0.029 0.591,0.041 0.63,0.062 0.669,0.083 0.71,0.115 0.742,0.148 0.782,0.189 0.8,0.234 0.83,0.286 0.867,0.35 0.883,0.41 0.908,0.488 0.94,0.588 0.929,0.596 0.956,0.695 0.987,0.813 1,1 1,1 "
        );
      } else if (easing == "custom.inOut") {
        easing = CustomEase.create(
          "custom",
          "M0,0,C0,0,0.143,0,0.225,0.009,0.246,0.011,0.276,0.018,0.296,0.028,0.316,0.039,0.359,0.065,0.376,0.082,0.397,0.103,0.402,0.102,0.426,0.152,0.45,0.202,0.452,0.226,0.466,0.278,0.479,0.329,0.47,0.282,0.486,0.366,0.511,0.5,0.499,0.588,0.534,0.718,0.545,0.761,0.551,0.803,0.57,0.844,0.584,0.876,0.598,0.898,0.618,0.926,0.635,0.949,0.649,0.951,0.672,0.968,0.692,0.983,0.694,0.978,0.72,0.985,0.746,0.993,0.801,0.996,0.83,0.997,0.894,1.001,1,1,1,1"
        );
      }

      gsap.to(this.html, this.obj.duration, {
        ease: easing,
        scrollTop: 0,
      });
    } else {
      gsap.to(this.html, this.obj.duration, {
        ease: easing,
        scrollTop: 0,
      });
    }
  }

  reset() {
    const h = document.body.clientHeight - window.innerHeight;

    gsap.set(this.html, {
      scrollTop: h,
    });
  }

  setEvents() {
    super.setEvents();

    this.$btn.on("click" + "." + this.name, (e) => {
      e.preventDefault();
      this.onClick(e.currentTarget);
    });

    this.$resetbtn.on("click" + "." + this.name, (e) => {
      e.preventDefault();
      this.reset();
    });
  }
}
