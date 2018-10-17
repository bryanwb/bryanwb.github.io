const alert = console.log;
let reg = /(\b\d\d[:-]\d\d\b)/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(reg) ); 
