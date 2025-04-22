"use strict"

class Month_list{
    constructor(year, month){
      this._year = year;
      this._month = month;
      this._inputs = [];
      this._sum = 0;
      this._html = this._generate_html();
    }

    month(){
      return this._month;
    }
    year(){
      return this._year;
    }
    html(){
      return this._html;
    }
    // _sort_inputs() {
    //   this._inputs.sort((input_a, input_b) => {
    //     return input_a.date() > input_b.date() ? -1 : input_a.date() < input_b.date() ? 1 : 0;
    //   });
    // }
    _show_inputs() {
      document.querySelectorAll(".monatsliste ul").forEach((list) => list.remove());
      let input_list = document.createElement("ul");
      this._inputs.forEach((input) => input_list.insertAdjacentElement("beforeend", input.html()));
      document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", input_list);
    }
    add_input(input){
      this._inputs.push(input);
      this._refresh();
    }
    _generate_html(){
      let art = document.createElement("article");
      art.setAttribute("class", "monatsliste");
      let h2 = document.createElement("h2");

      let first_span = document.createElement("span");
      first_span.setAttribute("class", "monat-jahr");
      first_span.textContent = `${new Date(this._year, this._month - 1).toLocaleString("de-DE", {
        month: "long",
        year: "numeric"
      } )}`;
      h2.insertAdjacentElement("afterbegin", first_span);

      let second_span = document.createElement("span");
      if(this._sum >= 0){
        second_span.setAttribute("class", "monatsbilanz positiv");
      } else {
        second_span.setAttribute("class", ` monatsbilanz negativ`);
      }
      h2.insertAdjacentElement("beforeend", second_span);
      art.insertAdjacentElement("afterbegin", h2);
      second_span.textContent = `${this._sum} €`;

      let input_list = document.createElement("ul");
      this._inputs.forEach((input) => input_list.insertAdjacentElement("beforeend", input.html()));
      art.insertAdjacentElement("beforeend", input_list);

      return art;
    }
    _refresh(){
      this._html = this._generate_html();
    }

}
