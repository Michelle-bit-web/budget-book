"use strict"


    // <section id="monatslisten">
      
    // </section>

class ListAllMonth{
    constructor(){
        this.month_list = [];
        this._html = this._genreate_html();
    }

    add_input(input){
        let input_month = input.date().toLocaleString("de-DE", {month: "numeric"});
        let input_year = input.date().toLocaleString("de-DE", {year: "numeric"});
        let monthlist_exists = false;
        this.month_list.forEach(monthlist => {
            if(input_month === monthlist.month() && input_year === monthlist.year()){
                monthlist.add_input(input);
                monthlist_exists = true;
            }
        });
        //Abfrage bedeutet: if true
        if (!monthlist_exists){
            this._add_montlist(input_year, input_month, input);
        }
        this._refresh();
    }

    _add_montlist(year, month, input){
       let new_month_list = new Month_list(year, month);
       new_month_list.add_input(input);
       this.month_list.push(new_month_list);
    }
    
    _genreate_html(){
        let lists = document.createElement("section");
        lists.setAttribute("id", "monatslisten");
        this.month_list.forEach(single_list => {
            lists.insertAdjacentElement("afterbegin", single_list.html());
        });
        return lists;
    }

    _refresh(){
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
