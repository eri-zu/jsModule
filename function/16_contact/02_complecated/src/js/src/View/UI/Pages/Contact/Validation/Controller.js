//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";

export default class Controller extends Base {
  constructor() {
    super();

    this.name = "Validation";
    this.isChecked = false;

    this.input = document.querySelectorAll(".js-form_input");
    // this.checkboxinput = document.querySelectorAll(".js-form_checkbox");
    this.checkboxinput = document.querySelector(".js-form_checkbox");
    this.button = document.querySelector(".js-formbtn");
    this.errorMessage = document.querySelector(".js-form_errormessage");

    console.log(this.input);
    console.log(this.checkboxinput);
    console.log(this.button);

    this.setup();
    this.setEvents();
  }

  setup() {
    this.errorArray = {};

    this.input.forEach((el, i) => {
      console.log(el);
      this.errorArray[el.id] = "";
    });

    console.log(this.errorArray); // {name: '', furigana: '', company: '', title: '', email: '', …}
  }

  check(target) {
    const isEmpty = !target.value;
    const parent = target.parentNode;
    let inputValue = target.value;
    const dataRegex = target.dataset.regex;
    const regexData = {
      email:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      tel: /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/,
    };
    let regexPattern;

    if (target.type == "email") {
      regexPattern = regexData.email;
    } else if (target.type == "tel") {
      regexPattern = regexData.tel;
      inputValue.replace(/-/g, "");
    }

    const regex = new RegExp(regexPattern);
    const invalidRegex = dataRegex && !regex.test(inputValue);

    if (isEmpty || invalidRegex) {
      this.errorArray[target.id] = "isError";
      this.showError(parent);
    } else {
      delete this.errorArray[target.id];
      this.hideError(parent);
    }

    this.errorCount = Object.keys(this.errorArray).length;
    this.alertCount = document.querySelectorAll(
      ".js-form_inputbg.is-error"
    ).length;

    this.send(this.errorCount, this.alertCount);
  }

  showError(parent) {
    const bg = parent.querySelector(".js-form_inputbg");
    bg.classList.add("is-error");
  }

  hideError(parent) {
    const bg = parent.querySelector(".js-form_inputbg");
    bg.classList.remove("is-error");
  }

  send(errorCount, alertCount) {
    console.log(errorCount);
    console.log(alertCount);
    console.log(this.isChecked);
    // button
    errorCount == 0 && this.isChecked
      ? this.button.classList.add("is-active")
      : this.button.classList.remove("is-active");

    // error message
    alertCount > 0
      ? this.errorMessage.classList.add("is-active")
      : this.errorMessage.classList.remove("is-active");
  }

  setEvents() {
    super.setEvents();

    this.input.forEach((el, i) => {
      el.addEventListener("input", (e) => {
        this.check(e.target);
      });
    });

    this.input.forEach((el, i) => {
      el.addEventListener("change", (e) => {
        this.check(e.target);
      });
    });

    this.input.forEach((el, i) => {
      el.addEventListener("blur", (e) => {
        this.check(e.target);
      });
    });

    // this.checkboxinput.forEach((el, i) => {
    //   el.addEventListener("click", (e) => {
    //     this.isChecked = this.checkboxinput.checked ? true : false;
    //     this.send(this.errorCount, this.alertCount);
    //   });
    // });

    this.checkboxinput.addEventListener("click", (e) => {
      this.isChecked = this.checkboxinput.checked ? true : false;
      this.send(this.errorCount, this.alertCount);
    });
  }
}
