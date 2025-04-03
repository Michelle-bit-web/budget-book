"use strict";
const haushaltsbuch = {
    neuer_eintrag: {
        title: null,
        type: null,
        amount: null,
        date: null,
    },
    gesamtbilanz: {
        totalIncome: 0,
        totalCosts: 0,
        sum: 0,
    },
}
//Variablen deklarieren & initialisieren
let totalIncome = 0, //Es muss initialisiert werden, weil sonst undefinied & Rechnung mit undefinied = NaN
totalCosts = 0,
sum = 0,
title,
type,
amount = 0,
date;
//Eingabedaten einholen
//Durch template-Strings kann man noch Text zu den eingaben ergänzen (consolen-Ausgabe nun verständlicher)
const save_input = function(){
   title = prompt("Titel:", "z.B. Einkauf");
   type = prompt("Typ (Einnahme o. Ausgabe):");
   amount = parseInt(prompt("Betrag (in Cent):", "z.B. 10.42 € = 1042 Ct"));
   date = prompt("Datum:", "jjjj-mm-tt");
}

const give_input = function(title, type, amount, date){
    console.log(
        `Titel: ${title}
         Typ: ${type}
         Betrag (in Ct): ${amount} Cent
         Datum (jjjj-mm-tt): ${date}`
    );
};

//else if Prüfung: Einnahme o. Ausgabe; zu totalIncome o. totalsCost ergänzen & addieren bzw. subtrahieren 
//Wir geben die Beträge in der Console als String aus
//Werte wurden also konkateniert und nicht berechnet --> Im prompt ist die Eingabe ein String
//Da unsere Variablen undefinied waren, sind Rechnungen damit NaN
const input_calculated_with_sum = function(type, amount){
    if(type === "Einnahme"){
        totalIncome = totalIncome + amount;
        sum = sum + amount;
    } else if(type === "Ausgabe"){
        totalCosts = totalCosts + amount;
        sum = sum - amount;
    } else{
        console.log(`Eingabe ${type} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`)
    }
}

//Gesamtbilanz

const give_sum = function(totalIncome, totalCosts, sum){
    
    console.log(
        `Einnahmen: ${totalIncome} ct
         Ausgaben: ${totalCosts} ct
         Bilanz: ${sum} ct
         Bilanz ist positiv: ${sum >= 0}`
    );
}

const add_input = function(){
    save_input();
    give_input(title, type, amount, date);
    input_calculated_with_sum(type, amount)
    give_sum(totalIncome, totalCosts, sum);
};

//Kann die Eingabe auf diese Weise mehrfach wiederholen
add_input();
add_input();
add_input();


