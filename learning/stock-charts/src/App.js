import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import './App.css';
import Chart from './components/Chart';

const ytdDayCount = () => {
  const today = new Date(Date.now());
  const oneDay = (60.0 * 60.0 * 24.0);
  const janFirst = new Date(`${today.getUTCFullYear()}-01-01`);
  // divide by 1000 to remove milliseconds
  const secsSinceJanFirst = (today.valueOf() - janFirst.valueOf()) / 1000;
  return Math.floor(secsSinceJanFirst / oneDay);

};

class App extends Component {
  render() {
    const width = 1200;
    const height = 800;
    return (
      <div className="App" style={{margin: 'auto', marginTop: "2vh", width: width, height: height}}>
          <Chart width={width} height={height} data={this.props.data} dayCount={ytdDayCount()} />
      </div>
    );
  }
}

export default App;
