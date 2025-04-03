"use strict";

//Variablen deklarieren & initialisieren
let totalIncome = 0; //Es muss initialisiert werden, weil sonst undefinied & Rechnung mit undefinied = NaN
let totalCosts = 0; 
let sum = 0;

//Eingabedaten einholen
//Durch template-Strings kann man noch Text zu den eingaben ergänzen (consolen-Ausgabe nun verständlicher)
let title = prompt("Titel:", "z.B. Einkauf");
let type = prompt("Typ (Einnahme o. Ausgabe):");
let amount = parseInt(prompt("Betrag (in Cent):", "z.B. 10.42 € = 1042 Ct"));
let date = prompt("Datum:", "jjjj-mm-tt");

console.log(`Titel: ${title}
    Typ: ${type}
    Betrag (in Ct): ${amount} Cent
    Datum (jjjj-mm-tt): ${date}`
);

//else if Prüfung: Einnahme o. Ausgabe; zu totalIncome o. totalsCost ergänzen & addieren bzw. subtrahieren 
//Wir geben die Beträge in der Console als String aus
//Werte wurden also konkateniert und nicht berechnet --> Im prompt ist die Eingabe ein String
//Da unsere Variablen undefinied waren, sind Rechnungen damit NaN
if(type === "Einnahme"){
    totalIncome = totalIncome + amount;
    sum = sum + amount;
} else if(type === "Ausgabe"){
    totalCosts = totalCosts + amount;
    sum = sum - amount;
} else{
    console.log(`Eingabe ${type} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`)
}

//2. Eintrag
let title_2 = prompt("Titel:", "z.B. Einkauf");
let type_2 = prompt("Typ (Einnahme o. Ausgabe):");
let amount_2 = parseInt(prompt("Betrag (in Cent):", "z.B. 10.42 € = 1042 Ct"));
let date_2 = prompt("Datum:", "jjjj-mm-tt");

console.log(`Titel: ${title_2}
    Typ: ${type_2}
    Betrag (in Ct): ${amount_2} Cent
    Datum (jjjj-mm-tt): ${date_2}`
);

if(type_2 === "Einnahme"){
    totalIncome = totalIncome + amount_2;
    sum = sum + amount_2
} else if(type_2 === "Ausgabe"){
    totalCosts = totalCosts + amount_2;
    sum = sum - amount_2;
} else{
    console.log(`Eingabe ${type_2} kann nicht zugeordnet werden. Bitte nutze Einnahme oder Ausgabe`)
}


//Gesamtbilanz
let check_sum = sum >=0;
console.log(`Einnahmen: ${totalIncome} ct
    Ausgaben: ${totalCosts} ct
    Bilanz: ${sum} ct
    Bilanz ist positiv: ${check_sum}`
);


