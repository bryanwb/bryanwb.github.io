'use strict';

const alert = console.log;

function getLastDayOfMonth(year, month) {
  let d = new Date(Date.UTC(year, month + 1, 1));
  d.setDate(0);
  return d.getDate();
}

alert(getLastDayOfMonth(2012, 0));
alert(getLastDayOfMonth(2012, 1));
alert(getLastDayOfMonth(2012, 2));
alert(getLastDayOfMonth(2018, 9)); 
