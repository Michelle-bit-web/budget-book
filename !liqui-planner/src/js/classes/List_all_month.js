import Month_list from "./Month_list.js";

export default class ListAllMonth{
    constructor(){
        this.month_list = [];
        this._html = this._genreate_html();
    }
    _add_input(input){
        let input_month = input.date().toLocaleString("de-DE", {month: "numeric"});
        let input_year = input.date().toLocaleString("de-DE", {year: "numeric"});
        let monthlist_exists = false;
        this.month_list.forEach(monthlist => {
            if(input_month === monthlist.month() && input_year === monthlist.year()){
                monthlist.add_input(input);
                monthlist_exists = true;
            }
        });
        if (!monthlist_exists){
            this._add_monthlist(input_year, input_month, input);
        }
    }
    _add_monthlist(year, month, input){
       let new_month_list = new Month_list(year, month);
       new_month_list.add_input(input);
       this.month_list.push(new_month_list);
    }
    _sort_month(){
        this.month_list.sort((list_a, list_b) => {
            if(list_a.year() < list_b.year()){
                return 1;
            } else if(list_a.year() > list_b.year()){
                return -1;
            } else {
                if(list_a.month() < list_b.month()){
                    return 1;
                } else {
                    return -1;
                } 
            }
        });
    }
    _genreate_html(){
        let lists = document.createElement("section");
        lists.setAttribute("id", "monatslisten");
        this.month_list.forEach(single_list => {
            lists.insertAdjacentElement("beforeend", single_list.html());
        });
        return lists;
    }
    refresh(inputs){
        this.month_list = [];
        inputs.forEach(input => this._add_input(input)) 
        this._sort_month();
        this._html = this._genreate_html();
        this.show();
    }
    show(){
       let input_formular_contaier = document.querySelector("#eingabeformular-container");
       let month_list = document.querySelector("#monatslisten");
       if(input_formular_contaier !== null){
        if(month_list !== null){
            month_list.remove();
        }
        input_formular_contaier.insertAdjacentElement("beforeend", this._html);
       }
    }
}
