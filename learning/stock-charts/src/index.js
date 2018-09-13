import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'whatwg-fetch';
import registerServiceWorker from './registerServiceWorker';
import { rejects } from 'assert';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
