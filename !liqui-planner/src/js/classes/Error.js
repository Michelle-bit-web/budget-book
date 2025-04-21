"use strict";

class Error {
  constructor(error_text, formular_error) {
    this._error_text = error_text;
    this._formular_error = formular_error;
    this._html = this._generate_html();
  }
  _generate_html() {
    let error_box = document.createElement("div");
    error_box.setAttribute("class", "fehlerbox");

    let error_text = document.createElement("span");
    error_text.textContent = this._error_text;
    error_box.insertAdjacentElement("afterbegin", error_text);

    let error_list = document.createElement("ul");
    this._formular_error.forEach((error) => {
      let error_list_point = document.createElement("li");
      error_list_point.textContent = error;
      error_list.insertAdjacentElement("beforeend", error_list_point);
    });
    error_text.insertAdjacentElement("afterend", error_list);
    return error_box;
  }
  show() {
    this._remove();
    let input_formular_container = document.querySelector("#eingabeformular-container");
    if(input_formular_container !== null){
      document.querySelector("#eingabeformular-container").insertAdjacentElement("afterbegin", this._html);
    };
  }
  _remove(){
    let current_error_box = document.querySelector(".fehlerbox");
    if(current_error_box !== null){
      current_error_box.remove();
    }
  }
}
