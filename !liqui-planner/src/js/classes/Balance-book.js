"use strict"

class Balancebook{

    constructor(){
        this._inputs = [];
        this._all_month_list = new ListAllMonth();
        this._balance = new Balance(); 
        
    }
  
  add_input(formular_data) {
    let new_input = new Inputs(formular_data.title, formular_data.amount, formular_data.type, formular_data.date);
    this._inputs.push(new_input);
    // this._all_month_list.add_input(new_input);
    this._all_month_list.refresh(this._inputs);
    this._balance._calculate_sum(this._inputs);
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
    this._all_month_list.refresh(this._inputs);
    this._balance._calculate_sum(this._inputs);
   
  }
  show(){
    this._all_month_list.show();
    this._balance.show();
  }
};
