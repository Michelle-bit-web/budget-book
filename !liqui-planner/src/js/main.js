"use strict";
const accounting = {
    balance: new Map(),
    inputs: [],
    save_input(){
        let new_input = new Map();
        new_input.set("title",prompt("Titel:", "z.B. Einkauf"));
        new_input.set("type",prompt("Typ (Einnahme o. Ausgabe):"));
        new_input.set("amount",parseInt(prompt("Betrag (in Cent):", "z.B. 10.42 € = 1042 Ct")));
        new_input.set("date",prompt("Datum:", "jjjj-mm-tt"));
        this.inputs.push(new_input);
    },
    sort_inputs(){
        this.inputs.sort((input_a,input_b) => {
            if(input_a.get("date") > input_b.get("date")){
                return -1;
            } else if(input_a.get("date") < input_b.get("date")){
                return 1;
            } else {
                return 0;
            }
        });
    },
    give_all_inputs(){
        console.clear();
        this.inputs.forEach((input) => {
            console.log(
                `Titel: ${input.get("title")}\n`
                +`Typ: ${input.get("type")}\n`
                +`Betrag (in Ct): ${input.get("amount")} Cent\n`
                +`Datum (jjjj-mm-tt): ${input.get("date")}\n`);
        })
    },
    calculate_sum (){
        let new_sum = new Map();
        new_sum.set("totalIncome", 0);
        new_sum.set("totalCosts", 0);
        new_sum.set("sum", 0);
        this.inputs.forEach((input) => {
            switch (input.get("type")){
                case "Einnahme":
                    new_sum.set("totalIncome", new_sum.get("totalIncome") + input.get("amount"));
                    new_sum.set("sum", new_sum.get("sum") + input.get("amount"));
                    break;
                case "Ausgabe":
                    new_sum.set("totalCosts", new_sum.get("totalCosts") + input.get("amount"));
                    new_sum.set("sum", new_sum.get("sum") - input.get("amount"));
                    break;
                default:
                    console.log(`Eingabe ${input.get("type")} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`);
            }
        });
        this.balance = new_sum; 
    },
    give_sum (){
        console.log(
            `Einnahmen: ${this.balance.get("totalIncome")} ct \n`
            +`Ausgaben: ${this.balance.get("totalCosts")} ct\n`
            +`Bilanz: ${ this.balance.get("sum")} ct \n`
            +`Bilanz ist positiv: ${ this.balance.get("sum") >= 0} \n`
        );
    },
    add_input(){
        let more_inputs = true;
        while (more_inputs){
            this.save_input();
            this.sort_inputs();
            this.give_all_inputs(); 
            this.calculate_sum();
            this.give_sum();
            more_inputs = confirm("Weiteren Eintrag hinzufügen?");
        } 
    }
}

accounting.add_input();


