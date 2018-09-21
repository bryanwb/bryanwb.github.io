import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import './App.css';
import BitcoinLogo from './images/Bitcoin_logo.svg';
import GoldBar from './images/gold-bar.png';
import DATA from './data/GOLD-BTC.json';
import Chart from './components/Chart';
import { scaleOrdinal } from '@vx/scale';
import { LegendOrdinal } from '@vx/legend';
import ChartLegend from './components/ChartLegend';
import ZoomButtons from './components/ZoomButtons';

// returns an offset from the end of the data
const rangeToOffset = (range) => {
  const today = new Date(Date.now());
  const oneDay = (60.0 * 60.0 * 24.0);
  let start;
  switch (range) {
    case 'YTD':
      const janFirst = new Date(`${today.getUTCFullYear()}-01-01`);
      // divide by 1000 to remove milliseconds
      const secsSinceJanFirst = (today.valueOf() - janFirst.valueOf()) / 1000;
      start = -Math.floor(secsSinceJanFirst / oneDay);
      break;
    case '7d':
      start = -7;
      break;      
    case '1m':
      start = -31;
      break;
    case '3m':
      start = -93;
      break;
    case '1y':
      start = -365;
      break;
    case 'ALL':
      start = -Infinity;
      break;
  }

  return start;

};

const ChartHeadline = (props) => {
  return (
    <div style={{width: "100%", textAlign: "center", position: 'relative'}}>
        <h1>Comparing <img src={BitcoinLogo} style={{height: "1em"}} /> and <img src={GoldBar} style={{height: "1em"}} />Gold</h1>
    </div>
  );
};

const loadSeries = (showGold, showBtc) => {
  let symbols = [];
  DATA.forEach(d => {
    d.date = new Date(d.date);
  });

  showGold && symbols.push({name: 'GOLD', color: '#CFB53B', measure: '/kg'});
  showBtc && symbols.push({name: 'BTC', color: "#ff7f0e"});
  
  return [DATA, symbols];
};

const sliceByRange = (range, data) => {
  let startOffset;
  if (range.start === -Infinity) {
    startOffset = -data.length;
  } else if (range.start > -2) {
    startOffset = -2;
  } else {
    startOffset = range.start;
  }

  let endOffset;
  if (range.end > 0 || range.end < range.start) {
    endOffset = 0;
  } else {
    endOffset = range.end;
  }
  
  const dataSegment = data.slice(data.length + startOffset, data.length + endOffset);

  return dataSegment;
};

class App extends Component {
  constructor(props) {
    super(props);
    const start = rangeToOffset('YTD');
    this.state = {
      show: {
        marketCap: false,
        btc: true,
        gold: true,
      },
      highlightedLine: null,
      range: {name: 'YTD', start: start, end: 0},
    };
    this.ranges = ['7d', '1m', '3m', '1y', 'YTD', 'ALL'];
  }

  onToggle = (key, e) => {
    let copy = Object.assign({}, this.state);
    copy.show[key] = !copy.show[key];
    this.setState(copy);
  };

  onChangeZoom = (e) => {
    const rangeName = e.target.textContent;
    const start = rangeToOffset(rangeName);
    this.setState(Object.assign(this.state,
                                {range: {name: rangeName, start: start, end: 0}}));
  };

  onZoomScroll = (e) => {
    e.preventDefault();
    // if scrolling up, zoom in, otherwise, zoom out
    const zoomIn = e.deltaY > 0;
    if (zoomIn) {
      this.onShift(10, -10);
    } else {
      this.onShift(-10, 10);
    }
  };

  onShift = (extentCountLeft, extentCountRight = null) => {
    extentCountRight = extentCountRight ? extentCountRight : extentCountLeft;
    const {range: name, start: start, end: end} = this.state.range;
    const newStart = start + extentCountLeft;
    let newEnd = end + extentCountRight;

    const newRange = {name: name, start: newStart, end: newEnd};
    
    this.setState(Object.assign(this.state, {range: newRange}));
  };

  onMouseOverLegend = (symbol) => {
    this.setState(Object.assign(this.state, {highlightedLine: symbol}));
  };

  onMouseOutLegend = () => {
    this.setState(Object.assign(this.state, {highlightedLine: null}));
  };
  
  render() {
    const width = 1200;
    const height = 700;
    const showMarketCap = this.state.show.marketCap;
    const margin = {left: 70, right: 70, top: 20, bottom: 30};
    const range = this.state.range;
    const [DATA, symbols] = loadSeries(this.state.show.gold, this.state.show.btc);
    const data = sliceByRange(range, DATA);
    
    return (
      <div className="App" style={{margin: 'auto', marginTop: "2vh", width: width, height: height}}>
          <ChartHeadline />
          <Chart
            data={data}
            symbols={symbols}
            width={width}
            height={height}
            shiftCb={this.onShift}
            showMarketCap={showMarketCap}
            highlightedLine={this.state.highlightedLine}
            margin={margin}
            onScroll={this.onZoomScroll}
          />
          <div style={{display: 'flex', marginLeft: margin.left}}>
              <ZoomButtons
                onClick={this.onChangeZoom}
                ranges={this.ranges}
                current={this.state.range.name}
              />
              <ChartLegend
                symbols={symbols}
                onToggle={this.onToggle}
                show={this.state.show}
                onMouseOver={this.onMouseOverLegend}
                onMouseOut={this.onMouseOutLegend}
              />
          </div>
      </div>
    )
    /* return (
     *   <div className="App" style={{margin: 'auto', marginTop: "2vh", width: width, height: height}}>
     *       <ChartHeadline />
     *       <div style={{writingMode: 'vertical-lr', height: "100%", textAlign: "center", float: "right"}}>Price (USD)</div>
     *       <Chart
     *         data={data}
     *         width={width}
     *         height={height}
     *         dayCount={calculateDayCount(range, data.length)}
     *         showMarketCap={showMarketCap}
     *         margin={margin}
     *       />
     *       <div style={{display: 'flex', marginLeft: margin.left}}>
     *           <ZoomButtons
     *             onClick={this.onChangeZoom}
     *             ranges={this.ranges}
     *             current={this.state.range}
     *           />
     *           <ChartButtons onToggle={this.onToggle} show={this.state.show} />
     *       </div>
     *   </div>
     * ); */
  }
}

export default App;
