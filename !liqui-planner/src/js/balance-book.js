"use strict";

const accounting = {
  balance: new Map(),
  inputs: [],
  add_input(formular_data) {
    let new_input = new Map();
    new_input.set("title", formular_data.title);
    new_input.set("amount", formular_data.amount);
    new_input.set("type", formular_data.type);
    new_input.set("date", formular_data.date);
    new_input.set("timestamp", Date.now());
    this.inputs.push(new_input);
    this.sort_inputs();
    this.show_inputs();
    this.calculate_sum();
    this.show_sum();
  },
  remove_input(timestamp){
    let start_index;
    for (let i = 0; i < this.inputs.length; i++) {
      if(this.inputs[i].get("timestamp") === parseInt(timestamp)){
        start_index = i;
        break;
      };
    }
    this.inputs.splice(start_index, 1);
    this.show_inputs();
    this.calculate_sum();
    this.show_sum();
  },
  sort_inputs() {
    this.inputs.sort((input_a, input_b) => {
      return input_a.get("date") > input_b.get("date") ? -1 : input_a.get("date") < input_b.get("date") ? 1 : 0;
    });
  },
  generate_html_input(input) {
    let list_node = document.createElement("li");
    input.get("type") === "einnahme" ? list_node.setAttribute("class", "einnahme") : list_node.setAttribute("class", "ausgabe");

    list_node.setAttribute("data-timestamp", input.get("timestamp"));

    let date = document.createElement("span");
    date.setAttribute("class", "datum");
    date.textContent = input.get("date").toLocaleString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
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

    this.add_event_recycle_input(list_node);

    return list_node;
  },
  add_event_recycle_input(list_node){
    list_node.querySelector(".entfernen-button").addEventListener("click", e => {
      let timestamp = e.target.parentElement.getAttribute("data-timestamp");
      this.remove_input(timestamp);
    });
  },
  show_inputs() {
    document.querySelectorAll(".monatsliste ul").forEach((list) => list.remove());
    let input_list = document.createElement("ul");
    this.inputs.forEach((input) => input_list.insertAdjacentElement("beforeend", this.generate_html_input(input)));
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
  generate_html_sum() {
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
    this.balance.get("sum") >= 0 ? sum_amount.setAttribute("class", "positiv") : sum_amount.setAttribute("class", "negativ");
    sum_amount.textContent = `${(this.balance.get("sum") / 100).toFixed(2).replace(/\./, ",")} €`;
    sum_row.insertAdjacentElement("beforeend", sum_amount);
    sum.insertAdjacentElement("beforeend", sum_row);

    return sum;
  },
  show_sum() {
    document.querySelectorAll("#gesamtbilanz").forEach((balance) => balance.remove());
    document.querySelector("body").insertAdjacentElement("beforeend", this.generate_html_sum());
  },
};
