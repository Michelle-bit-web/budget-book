/**
 * Das Modul "Eingabeformular" ist für das Eingabeformular der Anwendung zuständig.
 * @module classes/Eingabeformular
 * 
 */

import Errorbox from "./Errorbox.js";
import liqui_planner from "../liqui-planner.js";

/**
 * Die Klasse "Eingabeformular" stelle alle Eigenschaften und Methoden
 * des Eingabeformulars (inkl. HTML und Events) zur Verfügung.
 */
export default class Formular{

  /**
   * Der constructor generiert bei Instanziierung der Klasse "Eingabeformular" das
   * HTML des Eingabeformulars.
   * @prop {Element} _html - das HTML des Eingabeformulars
   */
  constructor() {
    this._html = this._generate_html();
  }

  /**
   * Diese private Methode extrahiert die im Eingabeformular
   * eingegebeben Daten aus dem Submit-Event des Eingabeformulars.
   * @param {Event} sumbit_event - das Submit-Event des Eingabeformulars
   * @returns {Object} - einfaches Objekt mit den Rohdaten des Eingabeformulars
   */
  _get_formular_data(sumbit_event) {
    return {
      title: sumbit_event.target.elements.titel.value,
      amount: sumbit_event.target.elements.betrag.value,
      income: sumbit_event.target.elements.einnahme.checked,
      date: sumbit_event.target.elements.datum.valueAsDate,
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
      error.push("Titel");
    } else if (formular_data.date === null) {
      error.push("Datum");
    } else if (isNaN(formular_data.amount)) {
      error.push("Betrag");
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
        liqui_planner.add_input(formular_data);
        e.target.reset();
        this._refresh_date();
      } else {
        let error = new Errorbox("Folgende Felder wurden nicht korrekt ausgeführt", formular_error);
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
            min="0.01"
          />
          <label for="datum">Datum</label>
          <input
            type="date"
            id="datum"
            name="datum"
            form="eingabeformular"
            size="10"
            title="Datum des Eintrags"
            
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
    let navigation_list = document.querySelector("#navigationsleiste");
    if (navigation_list !== null) {
      navigation_list.insertAdjacentElement("afterend", this._html);
      this._refresh_date();
    }
  }
}
