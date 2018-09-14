import React, { Component } from 'react';
import styled from 'react-emotion';

const Span = styled('span')`
  color: ${props => props.color};
  :hover {
    opacity: 0.4;
    cursor: pointer;
  }
`;

function Marker(props) {
  return (
    <Span color={props.color} onClick={props.onClick}>
        <svg height="6" width="20" style={{marginRight: 4}}>
            <line x1="0" y1="0" x2="20" y2="0"
                  style={{stroke: props.color, strokeWidth: 5}}
            />
        </svg>
        <strong>{props.text}</strong>
    </Span>
  );
}

const toggleColors = (toggle) => {
  const on = '#537ba2'; // '#6699cc';
  const off = '#727272';
  return toggle ? on : off;
};

class ChartButtons extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      showMarketCap: false,
      showBtc: true,
      showGold: true,
    };
  }
  
  handleChange(e) {
    debugger;
  }
  
  render() {

    const {showMarketCap, showBtc, showGold} = this.state;
    return (
      <div style={{display: 'flex',
                   justifyContent: 'space-around',
                   marginLeft: '20vw',
                   marginRight: '20vw'}}>
          <Marker key="showMarketCap" color={toggleColors(showMarketCap)}
                  text="Market Cap" onClick={this.handleChange} />
          <Marker key="showBTC" color={toggleColors(showBtc)}
                  text="Price (BTC)" onClick={this.handleChange} />
          <Marker key="showGold" color={toggleColors(showGold)}
                  text="Price (Gold)" onClick={this.handleChange}  />
      </div>
    );

  }
}

export default ChartButtons;
