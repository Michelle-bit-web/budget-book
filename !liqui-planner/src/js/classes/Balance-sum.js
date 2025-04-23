export default class Balance{
    constructor(){
        this._totalIncome = 0;
        this._totalCosts = 0;
        this._sum = 0;
        this._html = this._generate_html_sum();
    }
    _calculate_sum(inputs) {
        this._totalIncome = 0;
        this._totalCosts = 0;
        this._sum = 0;
        inputs.forEach((input) => {
          switch (input.type()) {
            case "einnahme":
                this._totalIncome += input.amount();
                this._sum += input.amount();
              break;
            case "ausgabe":
                this._totalCosts += input.amount();
                this._sum -= input.amount();
              break;
            default:
              console.log(`Eingabe ${input.type()} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`);
          }
        });
        this._html = this._generate_html_sum();
        this.show();
      }
      _generate_html_sum() {
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
        income_amount.textContent = `${(this._totalIncome / 100).toFixed(2).replace(/\./, ",")} €`;
        income_row.insertAdjacentElement("beforeend", income_amount);
        sum.insertAdjacentElement("beforeend", income_row);
    
        let cost_row = document.createElement("div");
        cost_row.setAttribute("class", "gesamtbilanz-zeile ausgaben");
        let cost_title = document.createElement("span");
        cost_title.textContent = "Ausgaben:";
        cost_row.insertAdjacentElement("afterbegin", cost_title);
        let cost_amount = document.createElement("span");
        cost_amount.textContent = `${(this._totalCosts / 100).toFixed(2).replace(/\./, ",")} €`;
        cost_row.insertAdjacentElement("beforeend", cost_amount);
        sum.insertAdjacentElement("beforeend", cost_row);
    
        let sum_row = document.createElement("div");
        sum_row.setAttribute("class", "gesamtbilanz-zeile bilanz");
        let sum_title = document.createElement("span");
        sum_title.textContent = "Bilanz:";
        sum_row.insertAdjacentElement("afterbegin", sum_title);
        let sum_amount = document.createElement("span");
        this._sum >= 0 ? sum_amount.setAttribute("class", "positiv") : sum_amount.setAttribute("class", "negativ");
        sum_amount.textContent = `${(this._sum / 100).toFixed(2).replace(/\./, ",")} €`;
        sum_row.insertAdjacentElement("beforeend", sum_amount);
        sum.insertAdjacentElement("beforeend", sum_row);
    
        return sum;
      }
      /**
       * Diese private Methode entfernt eine bereits bestehende Gesamtbilanz, wenn vorhanden.
       */
      _remove(){
       let sum = document.querySelector("#gesamtbilanz");
       if(sum !== null){
        sum.remove();
       }
      }
      /**
       * Diese Methode zeigt die generierte Gesamtbilanz an der richtigen Stelle in der UI an.
       */
      show() {
        this._remove();
        document.querySelector("body").insertAdjacentElement("beforeend", this._html);
      }
}