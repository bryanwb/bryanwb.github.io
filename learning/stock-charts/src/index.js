import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'whatwg-fetch';
import registerServiceWorker from './registerServiceWorker';
import BTC from './data/BTC.json';
import { rejects } from 'assert';

const loadPage = () => {
  let data = BTC.map(d => {
      let d1 = {}
      d1.date = new Date(+d.date);
      d1.open = +d.open;
      d1.high = +d.high;
      d1.low = +d.low;
      d1.close = +d.close;
      d1.volume = +d.volume;
      
      return d1;
      
  });

  ReactDOM.render(
    <App data={data} />,
    document.getElementById('root')
  );

};


loadPage();

registerServiceWorker();
