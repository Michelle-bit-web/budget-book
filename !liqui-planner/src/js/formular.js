"use strict";

const formular = {
  get_formular_data(e){
    return {
      title: e.target.elements.titel.value,
      amount: e.target.elements.betrag.value,
      income: e.target.elements.einnahme.checked,
      costs: e.target.elements.ausgabe.checked,
      date: e.target.elements.datum.valueAsDate
    };
  },
  processing_data(formular_data){
    let type;
    if(formular_data.costs === true){
      type = "ausgabe";
    } else if(formular_data.income === true){
      type = "einnahme";
    };
    return {
      title: formular_data.title.trim(),
      type: type,
      amount: parseFloat(formular_data.amount) * 100,
      date: formular_data.date
    }
  },
  validate_data(formular_data){
    let error = [];
    if(formular_data.title === ""){
      error.push("title");
    } else if(formular_data.type === undefined || formular_data.type.match(/^(?:einnahme|ausgabe)$/) === null){
      error.push("type");
    } else if(formular_data.date === null){
      error.push("date");
    } else if(isNaN(formular_data.amount)){
      error.push("amount");
    }
    return error;
  },
  send_add_event(input_formular) {
        input_formular.querySelector("#eingabeformular").addEventListener("submit", (e) => {
          e.preventDefault();
          let formular_data = this.processing_data(this.get_formular_data(e));
          let formular_error = this.validate_data(formular_data);
       });
  },
  generate_html() {
     let input_formular = document.createElement("section");
     input_formular.setAttribute("id", "eingabeformular-container");
     input_formular.innerHTML = `<form id="eingabeformular" action="#" method="get"></form>
     
      <div class="eingabeformular-zeile">
        <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
      </div>
     
      <div class="eingabeformular-zeile">
        <div class="titel-typ-eingabe-gruppe">
          <label for="titel">Titel</label>
          <input type="text"
            id="titel"
            form="eingabeformular"
            name="titel"
            placeholder="z.B. Einkaufen"
            size="10"
            title="Titel des Eintrags"
            required
          />
          <input
            type="radio"
            id="einnahme"
            name="typ"
            value="einnahme"
            form="eingabeformular"
            title="Typ des Eintrags"
          />
          <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
          <input
            type="radio"
            id="ausgabe"
            name="typ"
            value="ausgabe"
            form="eingabeformular"
            title="Typ des Eintrags"
            checked
          />
          <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
        </div>
      </div>
    
      <div class="eingabeformular-zeile">
        <div class="betrag-datum-eingabe-gruppe">
          <label for="betrag">Betrag</label>
          <input
            type="number"
            id="betrag"
            name="betrag"
            form="eingabeformular"
            placeholder="z.B. 10,42"
            size="10"
            step="0.01"
            title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)"
            required
          />
          <label for="datum">Datum</label>
          <input
            type="date"
            id="datum"
            name="datum"
            form="eingabeformular"
            placeholder="jjjj-mm-tt"
            size="10"
            title="Datum des Eintrags (Format: jjjj-mm-tt)"
            required
          />
        </div>
      </div>
     
      <div class="eingabeformular-zeile">
        <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
      </div>
        `;
     this.send_add_event(input_formular);
        return input_formular;
   },
  show() {
     document.querySelector("#navigationsleiste").insertAdjacentElement("afterend", this.generate_html());
   },
};
