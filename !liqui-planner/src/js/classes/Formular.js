"use strict";

class Formular {
  constructor() {
    this._html = this._generate_html();
  }
  _get_formular_data(e) {
    return {
      title: e.target.elements.titel.value,
      amount: e.target.elements.betrag.value,
      income: e.target.elements.einnahme.checked,
      date: e.target.elements.datum.valueAsDate,
    };
  }
  _processing_data(formular_data) {
    return {
      title: formular_data.title.trim(),
      type: formular_data.income === false ? "ausgabe" : "einnahme",
      amount: parseFloat(formular_data.amount) * 100,
      date: formular_data.date,
    };
  }
  _validate_data(formular_data) {
    let error = [];
    if (formular_data.title === "") {
      error.push("title");
    } else if (formular_data.date === null) {
      error.push("date");
    } else if (isNaN(formular_data.amount)) {
      error.push("amount");
    }
    return error;
  }
  _refresh_date() {
    let date_input = document.querySelector("#datum");
    if (date_input !== null) {
      date_input.valueAsDate = new Date();
    }
  }
  _send_add_event(input_formular) {
    input_formular.querySelector("#eingabeformular").addEventListener("submit", (e) => {
      e.preventDefault();
      let formular_data = this._processing_data(this._get_formular_data(e));
      let formular_error = this._validate_data(formular_data);

      if (formular_error.length === 0) {
        Balance_book.add_input(formular_data);
        let input_formular_container = document.querySelector("#eingabeformular-container");
        if (input_formular_container !== null) {
          document.querySelector("#eingabeformular-container").insertAdjacentElement("afterbegin", this._html);
        }
        e.target.reset();
        this._refresh_date();
      } else {
        let error = new Error("Folgende Felder wurden nicht korrekt ausgeführt", formular_error);
        error.show();
      }
    });
  }
  _generate_html() {
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
            
          />
        </div>
      </div>
     
      <div class="eingabeformular-zeile">
        <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
      </div>
        `;
    this._send_add_event(input_formular);
    return input_formular;
  }
  show() {
    let navigation_list = document.querySelector("body");
    if (navigation_list !== null) {
      navigation_list.insertAdjacentElement("afterbegin", this._generate_html());
      this._refresh_date();
    }
  }
}
