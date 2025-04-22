import Navigationlist from "./Navigationlist.js";
import Formular from "./Formular.js";
import ListAllMonth from "./List_all_month.js";
import Balance from "./Balance-sum.js";
import Inputs from "./Inputs.js";

export default class Balancebook{
    constructor(){
        this._inputs = [];
        this._navigation = new Navigationlist();
        this._formular = new Formular();
        this._all_month_list = new ListAllMonth();
        this._balance = new Balance(); 
        this._get_saved_date();
    }
  add_input(data) {
    let new_input = new Inputs(data.title, data.amount, data.type, data.date);
    this._inputs.push(new_input);
    this._all_month_list.refresh(this._inputs);
    this._balance._calculate_sum(this._inputs);
    this._save_data();
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
    this._save_data();
  }
  start(){
    this._navigation.show();
    this._formular.show();
    this._all_month_list.show();
    this._balance.show();
  }
  _save_data(){
    localStorage.setItem("inputs", JSON.stringify(this._inputs));
  }
  _get_saved_date(){
    let saved_data = localStorage.getItem("inputs");
    if(saved_data !== null){
      JSON.parse(saved_data).forEach(data => {
        this.add_input({
          title: data._title,
          amount: data._amount,
          type:data._type,
          date: new Date(data._date)
        });
      });
    }
  }
};
