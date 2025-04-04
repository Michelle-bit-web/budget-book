"use strict";
const accounting = {
    new_input: {
        title: null,
        type: null,
        amount: null,
        date: null,
    },
    balance: {
        totalIncome: 0,
        totalCosts: 0,
        sum: 0,
    },
    save_input(){
        this.new_input.title = prompt("Titel:", "z.B. Einkauf");
        this.new_input.type = prompt("Typ (Einnahme o. Ausgabe):");
        this.new_input.amount = parseInt(prompt("Betrag (in Cent):", "z.B. 10.42 € = 1042 Ct"));
        this.new_input.date = prompt("Datum:", "jjjj-mm-tt");
    },
    give_input(){
        console.log(
            `Titel: ${this.new_input.title}
             Typ: ${this.new_input.type}
             Betrag (in Ct): ${this.new_input.amount} Cent
             Datum (jjjj-mm-tt): ${this.new_input.date}`
        );
    },
    input_calculated_with_sum (){
        switch (this.new_input.type){
            case "Einnahme":
                this.balance.totalIncome += this.new_input.amount;
                this.balance.sum += this.new_input.amount;
                break;
            case "Ausgabe":
                this.balance.totalCosts += this.new_input.amount;
                this.balance.sum -= this.new_input.amount;
                break;
            default:
                console.log(`Eingabe ${this.new_input.type} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`);
        }
        // if(this.new_input.type === "Einnahme"){
        //     this.balance.totalIncome += this.new_input.amount;
        //     this.balance.sum += this.new_input.amount;
        // } else if(this.new_input.type === "Ausgabe"){
        //     this.balance.totalCosts += this.new_input.amount;
        //     this.balance.sum -= this.new_input.amount;
        // } else{
        //     console.log(`Eingabe ${this.new_input.type} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`)
        // }
    },
    give_sum (){
        console.log(
            `Einnahmen: ${this.balance.totalIncome} ct
             Ausgaben: ${this.balance.totalCosts} ct
             Bilanz: ${ this.balance.sum} ct
             Bilanz ist positiv: ${ this.balance.sum >= 0}`
        );
    },
    add_input(){
        this.save_input();
        this.give_input();
        this.input_calculated_with_sum();
        this.give_sum();
    }
}

//Kann die Eingabe auf diese Weise mehrfach wiederholen
accounting.add_input();
accounting.add_input();
accounting.add_input();


