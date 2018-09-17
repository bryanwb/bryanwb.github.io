import React from 'react';
import styled from 'react-emotion';

const Button = styled('button')`
  margin-left: 0.1em;
  margin-right: 0.1em;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  /* remove dotted outline around selected button */
  outline: none !important;
  ::-moz-focus-inner {
    border: 0;
  }
  background-color: ${props => props.bgColor};
  font-weight: ${props => props.fontWeight};
`;

class ZoomButtons extends React.Component {

  showIfSelected(range, current) {
    const unselectedBG = '#f7f7f7';
    const selectedBG = '#e6ebf5';
    let bgColor = unselectedBG;
    let fontWeight = 'normal';
    
    if (range === current) {
      bgColor = selectedBG;
      fontWeight = 'bold';
    }

    return [bgColor, fontWeight];
  }
    
    render() {
      return (
        <div style={{marginRight: "1em"}}>
            <span style={{marginRight: "0.2em"}}>
                Zoom
            </span>
            {this.props.ranges.map((r) => {
               const [bgColor, fontWeight] = this.showIfSelected(r, this.props.current);
               return <Button key={r} backgroundColor={bgColor} fontWeight={fontWeight} onClick={this.props.onClick}>{r}</Button>
            })}
        </div>
      );
  }
}

export default ZoomButtons;

/* <svg>
    <g style={{cursor: 'pointer'}} transform="translate(116,0)">
    <rect fill="#f7f7f7" x="0" y="0" width="32" height="22" rx="2" ry="2">
    </rect>
    <text x="9" y="14" style={{fontWeight: 'normal', color: '#333333',
    fill: '#333333'}} >
    1d
    </text>
    </g>
    </svg> */
