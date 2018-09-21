import React, { Component } from 'react';
import styled from 'react-emotion';

const Span = styled('span')`
  color: ${props => props.color};
  margin-left: 0.8em;
  :hover {
    opacity: 0.4;
    cursor: pointer;
  }
`;

function Marker(props) {
  return (
    <Span color={props.color}
          onClick={props.onClick}
          onMouseOver={props.onMouseOver}
          onMouseOut={props.onMouseOut}
    >
        <svg height="6" width="20" style={{marginRight: 4}}>
            <line x1="0" y1="0" x2="20" y2="0"
                  style={{stroke: props.color, strokeWidth: 8}}
            />
        </svg>
        <strong>{props.text}</strong>
    </Span>
  );
}

const getToggleColor = (symbols, name) => {
  const foundSymbol = symbols.filter(s => s.name === name)[0];
  if (foundSymbol !== undefined) {
    return foundSymbol.color;
  } else {
    return '#727272';
  }
};

class ChartButtons extends Component {
  render() {
    const onToggle = this.props.onToggle;
    const show = this.props.show;
    const symbols = this.props.symbols;
    return (
      <div>
          <Marker key="showMarketCap" color={show.marketCap ? '#6465c6' : '#727272'}
                  text="Market Cap" onClick={(e) => onToggle('marketCap', e)} />
          <Marker key="showBTC"
                  symbol='BTC'
                  color={getToggleColor(symbols, 'BTC')}
                  text="Price (BTC)"
                  onClick={(e) => onToggle('btc', e)}
                  onMouseOver={() => this.props.onMouseOver('BTC')}
                  onMouseOut={this.props.onMouseOut}
          />
          <Marker key="showGold" symbol='GOLD' color={getToggleColor(symbols, 'GOLD')}
                  text="Price (Gold) USD / kg" onClick={(e) => onToggle('gold', e)}
                  onMouseOver={() => this.props.onMouseOver('GOLD')}
                  onMouseOut={this.props.onMouseOut}
          />
      </div>
    );

  }
}

export default ChartButtons;
