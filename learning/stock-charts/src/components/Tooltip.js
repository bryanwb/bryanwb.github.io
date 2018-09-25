import React from 'react';


function commarize(num) {
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
}
const formatNum = (symbol, num) => {
  let numFormatted = num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  if (symbol.measure) {
    numFormatted += symbol.measure;
  }
  // this magic incantation adds commas in the thousands place
  return numFormatted
};

const formatDatum = (symbol, datum) => {
  return (
    <div>
        <div>
            <span style={{color: symbol.color}}>●</span> {symbol.name}
        </div>
        <div>
            &emsp;Price (USD): {formatNum(symbol, datum[symbol.name].close)}
        </div>
        <div>
            &emsp;Market Cap (USD): {commarize(datum[symbol.name].cap)}
        </div>
    </div>
  );
};

class Tooltip extends React.Component {

  render() {
    const {
      datum,
      symbols,
    } = this.props;
    
    return (
      datum &&
      <div>
          <div>{datum.date.toDateString()}</div>
          {symbols.map((s) => formatDatum(s, datum))}
      </div>
    );

  }

}

export default Tooltip;
