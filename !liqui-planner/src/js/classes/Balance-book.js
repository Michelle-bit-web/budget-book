"use strict"

class Balancebook{

    constructor(){
        this._inputs = [];
        this.all_month_list = new ListAllMonth();
        this.balance = new Balance(); 
        
    }
  
  add_input(formular_data) {
    let new_input = new Inputs(formular_data.title, formular_data.amount, formular_data.type, formular_data.date);
    this._inputs.push(new_input);

    this._sort_inputs();
    this._show_inputs();
    this.balance._calculate_sum(this._inputs);
  }
  remove_input(timestamp){
    let start_index;
    for (let i = 0; i < this._inputs.length; i++) {
      if(this._inputs[i].timestamp() === parseInt(timestamp)){
        start_index = i;
        break;
      };
    }
    this._inputs.splice(start_index, 1);
    this._show_inputs();
    this.balance._calculate_sum(this._inputs);
   
  }
  _sort_inputs() {
    this._inputs.sort((input_a, input_b) => {
      return input_a.date() > input_b.date() ? -1 : input_a.date() < input_b.date() ? 1 : 0;
    });
  }
  
  _show_inputs() {
    document.querySelectorAll(".monatsliste ul").forEach((list) => list.remove());
    let input_list = document.createElement("ul");
    this._inputs.forEach((input) => input_list.insertAdjacentElement("beforeend", input.html()));
    document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", input_list);
  }
 
};
