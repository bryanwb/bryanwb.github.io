import React, { Component } from 'react';
import styled from 'react-emotion';

const Span = styled('span')`
  color: ${props => props.color};
  margin-left: 0.4em;
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

const getToggleColor = (toggle) => {
  const on = '#6465c6';
  const off = '#727272';
  return toggle ? on : off;
};

class ChartButtons extends Component {
  render() {
    const show = this.props.show;
    const onToggle = this.props.onToggle;
    return (
      <div>
          <Marker key="showMarketCap" color={getToggleColor(show.marketCap)}
                  text="Market Cap" onClick={(e) => onToggle('marketCap', e)} />
          <Marker key="showBTC" color={getToggleColor(show.btc)}
                  text="Price (BTC)" onClick={(e) => onToggle('btc', e)} />
          <Marker key="showGold" color={getToggleColor(show.gold)}
                  text="Price (Gold)" onClick={(e) => onToggle('gold', e)}  />
      </div>
    );

  }
}

export default ChartButtons;
