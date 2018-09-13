import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import './App.css';
import DATA from './data/GOLD-BTC.json';
import Chart from './components/Chart';

const ytdDayCount = () => {
  const today = new Date(Date.now());
  const oneDay = (60.0 * 60.0 * 24.0);
  const janFirst = new Date(`${today.getUTCFullYear()}-01-01`);
  // divide by 1000 to remove milliseconds
  const secsSinceJanFirst = (today.valueOf() - janFirst.valueOf()) / 1000;
  return Math.floor(secsSinceJanFirst / oneDay);

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

const loadSeries = () => {
  DATA.forEach(d => {
    d.date = new Date(d.date);
  });
  DATA['symbols'] = [{name: 'GOLD',
                      color: '#CFB53B',
                      measure: '/kg'},
                     {name: 'BTC', color: "#ff7f0e"}];
  return DATA;
};

class App extends Component {
  render() {
    const width = 1200;
    const height = 800;
    const data = loadSeries();
    return (
      <div className="App" style={{margin: 'auto', marginTop: "2vh", width: width, height: height}}>
          <Chart
            data={data}
            width={width}
            height={height}
            dayCount={ytdDayCount()} />
      </div>
    );
  }
}

export default App;
