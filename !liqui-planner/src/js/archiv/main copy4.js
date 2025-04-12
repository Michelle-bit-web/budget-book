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
    inputs: [],
    save_input(){
        this.inputs.push(
            {
                title: prompt("Titel:", "z.B. Einkauf"),
                type: prompt("Typ (Einnahme o. Ausgabe):"),
                amount: parseInt(prompt("Betrag (in Cent):", "z.B. 10.42 € = 1042 Ct")),
                date: prompt("Datum:", "jjjj-mm-tt"),
            }
        );
    },
    sort_inputs(){
        let sorted_inputs = this.inputs.sort((input_a,input_b) => {
            if(input_a.date > input_b.date){
                return -1;
            } else if(input_a.date < input_b.date){
                return 1;
            } else {
                return 0;
            }
        });
        this.inputs = sorted_inputs;
    },
    give_all_inputs(){
        console.clear();
        this.inputs.forEach((input) => {
            console.log(
                `Titel: ${input.title}\n`
                +`Typ: ${input.type}\n`
                +`Betrag (in Ct): ${input.amount} Cent\n`
                +`Datum (jjjj-mm-tt): ${input.date}\n`);
        })
       
    },
    calculate_sum (){
        let new_sum ={
            totalIncome: 0,
            totalCosts: 0,
            sum: 0,
        };
        this.inputs.forEach((input) => {
            switch (input.type){
                case "Einnahme":
                    new_sum.totalIncome += input.amount;
                    new_sum.sum += input.amount;
                    break;
                case "Ausgabe":
                    new_sum.totalCosts += input.amount;
                    new_sum.sum -= input.amount;
                    break;
                default:
                    console.log(`Eingabe ${input.type} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`);
            }
        });
        this.balance = new_sum; 
    },
    give_sum (){
        console.log(
            `Einnahmen: ${this.balance.totalIncome} ct \n`
            +`Ausgaben: ${this.balance.totalCosts} ct\n`
            +`Bilanz: ${ this.balance.sum} ct \n`
            +`Bilanz ist positiv: ${ this.balance.sum >= 0} \n`
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


