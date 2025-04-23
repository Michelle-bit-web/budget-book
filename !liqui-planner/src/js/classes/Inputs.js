import liqui_planner from "../liqui-planner.js"

export default class Inputs{
    constructor(title, amount, type, date){
        this._title = title;
        this._amount = amount;
        this._type = type;
        this._date = date;
        this._timestamp = Date.now();
        this._html = this._generate_html_input(); 
    }

    title(){
        return this._title;
    }
    amount(){
        return this._amount;
    }
    type(){
        return this._type;
    }
    date(){
        return this._date;
    }
    timestamp(){
        return this._timestamp;
    }
    html(){
        return this._html;
    }
    _generate_html_input() {
       
        let list_node = document.createElement("li");
        this._type === "einnahme" ? list_node.setAttribute("class", "einnahme") : list_node.setAttribute("class", "ausgabe");
    
        list_node.setAttribute("data-timestamp", this._timestamp);
    
        let date = document.createElement("span");
        date.setAttribute("class", "datum");
        date.textContent = this._date.toLocaleString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        list_node.insertAdjacentElement("afterbegin", date);
    
        let title = document.createElement("span");
        title.setAttribute("class", "titel");
        title.textContent = this._title;
    
        date.insertAdjacentElement("afterend", title);
    
        let amount = document.createElement("span");
        amount.setAttribute("class", "betrag");
        amount.textContent = `${(this._amount / 100).toFixed(2).replace(/\./, ",")} €`; //Achtung: RegEx-Schreibweise
    
        title.insertAdjacentElement("afterend", amount);
    
        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        amount.insertAdjacentElement("afterend", button);
    
        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);
    
        this._add_event_recycle_input(list_node);
    
        return list_node;
      }
      _add_event_recycle_input(list_node){
        list_node.querySelector(".entfernen-button").addEventListener("click", e => {
          let timestamp = e.target.parentElement.getAttribute("data-timestamp");
          liqui_planner.remove_input(timestamp);
        });
      } 
}