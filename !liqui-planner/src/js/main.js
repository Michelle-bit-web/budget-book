"use strict";
const accounting = {
  balance: new Map(),
  inputs: [],
  error: [],

  save_input() {
    let new_input = new Map();
    new_input.set("title", this.format_title(prompt("Titel:", "z.B. Einkauf")));
    new_input.set("type", this.format_type(prompt("Typ (Einnahme o. Ausgabe):")));
    new_input.set("amount", this.format_amount(prompt("Betrag (in Euro):", "z.B. 10,42")));
    new_input.set("date", this.format_date(prompt("Datum (jjjj-mm-tt):")));
    new_input.set("timestamp", Date.now);
    if(this.error.length === 0){
      this.inputs.push(new_input)
    } else{
      console.log('Error occured:')
      this.error.forEach(function(error){
        console.log(error)
      });
    };
  },
  format_amount(current_number) {
    current_number = current_number.trim();
    if (this.validate_amount_input(current_number)) {
      return parseFloat(current_number.replace(",", ".")) * 100;
    } else {
     this.error.push(`Invalid number format for ${current_number}.`);
    }
  },
  validate_amount_input(number_format) {
    if (number_format.match(/^\d+(?:(?:,|\.)\d\d?)?$/) !== null) {
      return true;
    } else {
     return false;
    }
  },
  format_title(title){
    title = title.trim();
    if (this.validate_title_input(title)) {
      return title;
    } else {
      this.error.push(`Missing title.`);
    }
  },
  validate_title_input(title){
    if(title !== ""){
      return true;
    }else{
      return false;
    }
  },
  format_type(type){
    type = type.trim().toLowerCase();
    if (this.validate_type_input(type)) {
      return type;
    } else {
      this.error.push(`Invalid type "${type}".`);
    }
  },
  validate_type_input(type){
    if (type.match(/^(?:einnahme|ausgabe)$/) !== null) {
      return true;
    } else {
      return false;
    }
  },
  format_date(date){
    date = date.trim();
    if (this.validate_date_input(date)) {
        return new Date(`${date} 00:00:00`);
      } else {
        this.error.push(`invalid date format for ${date}`);
      }
  },
  validate_date_input(date){
    if (date.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
        return true;
      } else {
        return false;
      }
  },
  sort_inputs() {
    this.inputs.sort((input_a, input_b) => {
      if (input_a.get("date") > input_b.get("date")) {
        return -1;
      } else if (input_a.get("date") < input_b.get("date")) {
        return 1;
      } else {
        return 0;
      }
    });
  },
generate_html_input(input){
  let list_node = document.createElement("li");
  if(input.get("type") === "einnahme"){
    list_node.setAttribute("class", "einnahme");
  }else if(input.get("type") === "ausgabe"){
    list_node.setAttribute("class", "ausgabe");
  };
  list_node.setAttribute("data-timestamp", input.get("timestamp"));

  let date = document.createElement("span");
  date.setAttribute("class", "datum");
  date.textContent = input.get("date").toLocaleString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  list_node.insertAdjacentElement("afterbegin", date);

  let title = document.createElement("span");
  title.setAttribute("class", "titel");
  title.textContent = input.get("title");
  
  date.insertAdjacentElement("afterend", title);

  let amount = document.createElement("span");
  amount.setAttribute("class", "betrag");
  amount.textContent = `${(input.get("amount") / 100).toFixed(2).replace(/\./, ",")} €`; //Achtung: RegEx-Schreibweise
  
  title.insertAdjacentElement("afterend", amount);

  let button = document.createElement("button");
  button.setAttribute("class", "entfernen-button");
  amount.insertAdjacentElement("afterend", button);

  let icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash");
  button.insertAdjacentElement("afterbegin", icon);

  return list_node;
},
show_inputs(){
  document.querySelectorAll(".monatsliste ul").forEach(function(list){
    list.remove()});
  
  let input_list = document.createElement("ul");
 for (let input of this.inputs){
  input_list.insertAdjacentElement("beforeend", this.generate_html_input(input));
 }
  document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", input_list);  
},
  calculate_sum() {
    let new_sum = new Map();
    new_sum.set("totalIncome", 0);
    new_sum.set("totalCosts", 0);
    new_sum.set("sum", 0);
    this.inputs.forEach((input) => {
      switch (input.get("type")) {
        case "einnahme":
          new_sum.set("totalIncome", new_sum.get("totalIncome") + input.get("amount"));
          new_sum.set("sum", new_sum.get("sum") + input.get("amount"));
          break;
        case "ausgabe":
          new_sum.set("totalCosts", new_sum.get("totalCosts") + input.get("amount"));
          new_sum.set("sum", new_sum.get("sum") - input.get("amount"));
          break;
        default:
          console.log(`Eingabe ${input.get("type")} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`);
      }
    });
    this.balance = new_sum;
  },
  generate_html_sum(){
    let sum = document.createElement("aside");
    sum.setAttribute("id", "gesamtbilanz");

    let title = document.createElement("h1");
    title.textContent = "Gesamtbilanz";
    sum.insertAdjacentElement("afterbegin", title);

    let income_row = document.createElement("div");
    income_row.setAttribute("class", "gesamtbilanz-zeile einnahmen");
    let income_title = document.createElement("span");
    income_title.textContent = "Einnahmen:";
    income_row.insertAdjacentElement("afterbegin", income_title);
    let income_amount = document.createElement("span");
    income_amount.textContent = `${(this.balance.get("totalIncome") / 100).toFixed(2).replace(/\./, ",")} €`;
    income_row.insertAdjacentElement("beforeend", income_amount);
    sum.insertAdjacentElement("beforeend", income_row);

    let cost_row = document.createElement("div");
    cost_row.setAttribute("class", "gesamtbilanz-zeile ausgaben");
    let cost_title = document.createElement("span");
    cost_title.textContent = "Ausgaben:";
    cost_row.insertAdjacentElement("afterbegin", cost_title);
    let cost_amount = document.createElement("span");
    cost_amount.textContent = `${(this.balance.get("totalCosts") / 100).toFixed(2).replace(/\./, ",")} €`;
    cost_row.insertAdjacentElement("beforeend", cost_amount);
    sum.insertAdjacentElement("beforeend", cost_row);

    let sum_row = document.createElement("div");
    sum_row.setAttribute("class", "gesamtbilanz-zeile bilanz");
    let sum_title = document.createElement("span");
    sum_title.textContent = "Bilanz:";
    sum_row.insertAdjacentElement("afterbegin", sum_title);
    let sum_amount = document.createElement("span");
    if(this.balance.get("sum") >= 0){
      sum_amount.setAttribute("class", "positiv");
      sum_amount.textContent = `${(this.balance.get("sum") / 100).toFixed(2).replace(/\./, ",")} €`;
    }else if(this.balance.get("sum") < 0){
      sum_amount.setAttribute("class", "negativ");
      sum_amount.textContent = `-${(this.balance.get("sum") / 100).toFixed(2).replace(/\./, ",")} €`;
    };
    sum_row.insertAdjacentElement("beforeend", sum_amount);
    sum.insertAdjacentElement("beforeend", sum_row);
    
    return sum;
  },
  show_sum(){
    document.querySelectorAll("#gesamtbilanz").forEach(function(balance){
      balance.remove();
    });
    document.querySelector("body").insertAdjacentElement("beforeend", this.generate_html_sum());
  },
  add_input() {
    let more_inputs = true;
    while (more_inputs) {
      this.save_input();
      if(this.error.length === 0){
        this.sort_inputs();
        this.show_inputs();
        this.calculate_sum();
        this.show_sum();
      } else{
        this.error = [];
      };
      more_inputs = confirm("Weiteren Eintrag hinzufügen?");
    }
  },
};

accounting.add_input();
