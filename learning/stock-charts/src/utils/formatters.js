
export const commarize = (num) => {
  // Alter numbers larger than 1k
  if (num >= 1e3) {
    var units = ["k", "M", "Billion", "Trillion"];
    
    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    let unit = Math.floor(((num).toFixed(0).length - 1) / 3) * 3;
    // Calculate the remainder
    const formattedNum = ( num / (Number('1e'+unit))).toFixed(1);
    var unitname = units[Math.floor(unit / 3) - 1]
    
    // output number remainder + unitname
    return formattedNum + ' ' + unitname;
  }
  
  // return formatted original number
  return num.toFixed(2);
};

export const formatNum = (symbol, num) => {
  let numFormatted = num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  if (symbol.measure) {
    numFormatted += symbol.measure;
  }
  // this magic incantation adds commas in the thousands place
  return numFormatted
};
