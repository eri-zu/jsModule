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

    this.$input = $(".js-form_input");
    this.$checkbox = $(".js-form_checkboxwrap");
    this.checkboxinput = document.querySelector(".js-form_checkbox_input");

    this.errorArray = {};

    this.$input.each((i, el) => {
      this.errorArray[el.id] = "";
    });

    console.log(this.errorArray); // {name: '', furigana: '', company: '', title: '', email: '', …}

    this.setup();
    this.setEvents();
  }

  setup() {}

  check(target) {
    const isEmpty = !target.value;
    // const parentEle = target.parentNode.parentNode;
    const parent = target.parentNode;
    // this.errorCount = Object.keys(this.errorArray).length;
    // const errorElm = parentEle.querySelector(".error-msg");

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
      // if (!errorElm) this.createErrorMessage(parentEle);
      this.showError(parent);
    } else {
      delete this.errorArray[target.id];
      // if (errorElm) errorElm.remove();
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

  // createErrorMessage(parentEle) {
  //   // messegeの要素作る
  //   // <div class="error-msg>正しく入力してください。</div>"
  //   const errorMsgEle = document.createElement("div");
  //   errorMsgEle.className = `error-msg`;
  //   errorMsgEle.innerHTML = "正しく入力してください。";

  //   // 親要素に入れる
  //   parentEle.appendChild(errorMsgEle);
  // }

  send(errorCount, alertCount) {
    console.log("send");
    console.log(errorCount, "errorCount");
    console.log(alertCount, "alertCount");
    // checkbox
    console.log(this.isChecked, "this.isChecked");

    // button
    const button = document.querySelector(".js-formbtn");
    errorCount == 0 && this.isChecked
      ? button.classList.add("is-active")
      : button.classList.remove("is-active");

    // error message
    const errorMessage = document.querySelector(".js-form_errormessage");
    alertCount > 0
      ? errorMessage.classList.add("is-active")
      : errorMessage.classList.remove("is-active");
  }

  setEvents() {
    super.setEvents();

    ["input", "change", "blur"].forEach((eventName, i) => {
      this.$input.on(eventName + "." + this.name, (e) => {
        this.check(e.target);
      });
    });

    $(this.checkboxinput).on("click" + "." + this.name, (e) => {
      this.isChecked = this.checkboxinput.checked ? true : false;
      this.send(this.errorCount, this.alertCount);
    });
  }
}
