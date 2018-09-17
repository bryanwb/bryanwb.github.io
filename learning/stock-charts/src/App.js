import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import './App.css';
import BitcoinLogo from './images/Bitcoin_logo.svg';
import DATA from './data/GOLD-BTC.json';
import Chart from './components/Chart';
import ChartButtons from './components/ChartButtons';
import ZoomButtons from './components/ZoomButtons';

const calculateDayCount = (range, max) => {
  const today = new Date(Date.now());
  const oneDay = (60.0 * 60.0 * 24.0);
  let count;
  switch (range) {
    case 'YTD':
      const janFirst = new Date(`${today.getUTCFullYear()}-01-01`);
      // divide by 1000 to remove milliseconds
      const secsSinceJanFirst = (today.valueOf() - janFirst.valueOf()) / 1000;
      count = Math.floor(secsSinceJanFirst / oneDay);
      break;
    case '7d':
      count = 7;
      break;      
    case '1m':
      count = 31;
      break;
    case '3m':
      count = 93;
      break;
    case '1y':
      count = 365;
      break;
    case 'ALL':
      count = max;
      break;
  }

  return count;

};

const ChartHeadline = (props) => {
  return (
    <div style={{width: "100%", textAlign: "center", position: 'relative'}}>
        <h1>Comparing <img src={BitcoinLogo} style={{height: "1em"}} /> and Gold</h1>
    </div>
  );
};
/* const parseDataPoint = (d) => {
 *   let d1 = {}
 *   d1.date = new Date(+d.date);
 *   d1.open = +d.open;
 *   d1.high = +d.high;
 *   d1.low = +d.low;
 *   d1.close = +d.close;
 *   d1.volume = +d.volume;
 *   
 *   return d1;
 *     
 * };
 *  */

const loadSeries = (showGold, showBtc) => {
  DATA.forEach(d => {
    d.date = new Date(d.date);
  });
  DATA['symbols'] = [];
  showGold && DATA['symbols'].push({name: 'GOLD', color: '#CFB53B', measure: '/kg'});
  showBtc && DATA['symbols'].push({name: 'BTC', color: "#ff7f0e"});
  return DATA;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: {
        marketCap: false,
        btc: true,
        gold: true,
      },
      range: 'YTD',
    };
    this.ranges = ['7d', '1m', '3m', '1y', 'YTD', 'ALL'];
    this.onChangeZoom = this.onChangeZoom.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(key, e) {
    let copy = Object.assign({}, this.state);
    copy.show[key] = !copy.show[key];
    this.setState(copy);
  }

  onChangeZoom(e) {
    let copy = Object.assign({}, this.state);
    copy.range = e.target.textContent;
    this.setState(copy);
  }
  
  render() {
    const width = 1200;
    const height = 700;
    const data = loadSeries(this.state.show.gold, this.state.show.btc);
    const showMarketCap = this.state.show.marketCap;
    const margin = {left: 70, right: 70, top: 20, bottom: 30};
    const range = this.state.range;
    return (
      <div className="App" style={{margin: 'auto', marginTop: "2vh", width: width, height: height}}>
          <ChartHeadline />
          <div style={{writingMode: 'vertical-lr', height: "100%", textAlign: "center", float: "right"}}>Price (USD)</div>
          <Chart
            data={data}
            width={width}
            height={height}
            dayCount={calculateDayCount(range, data.length)}
            showMarketCap={showMarketCap}
            margin={margin}
          />
          <div style={{display: 'flex', marginLeft: margin.left}}>
              <ZoomButtons
                onClick={this.onChangeZoom}
                ranges={this.ranges}
                current={this.state.range}
              />
              <ChartButtons onToggle={this.onToggle} show={this.state.show} />
          </div>
      </div>
    );
  }
}

export default App;
