import React from 'react';
import styled from 'react-emotion';
import { commarize, formatNum } from '../utils/formatters';
import { goldKgWorldwide } from '../utils/constants';
import BitcoinSmallLogo from '../images/Bitcoin_small_logo.svg';
import GoldBar from '../images/gold-bar.png';


const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  background: rgba(239, 239, 239, 0.4);
  top: 0;
  left: 0;
  z-index: 6;
  pointer-events: all;
  cursor: pointer;
`;

const Box = styled('div')`
  position: relative;
  width: 400;
  opacity: 1.0;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(50,50,93,.1),0 5px 15px rgba(0,0,0,.07);
  background: rgba(255, 255, 255, 1.0);
  cursor: default;
`;

const H1 = styled('h1')`
  font-size: 100px;
   margin: 0;
`;

const Reload = () => {
  return (
    <span style={{background: '#fff', marginLeft: '-20px', bottom: '30px', position: 'absolute', justifyContent: 'center', height: '40px', width: '40px', border: '1px solid #ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', left: '50%'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#333333" d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 0 1-2.8-.7l-1.46 1.46A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </span>
  );

};

class Overlay extends React.Component {
  render() {
    const mostRecent = this.props.datum;
    let message;
    const goldMarketCap = mostRecent.GOLD.close * goldKgWorldwide;
    const bitcoinCap = <p>Bitcoin is $ {commarize(mostRecent.BTC.cap)}</p>
    const goldCap = <p>Gold is $ {commarize(goldMarketCap)}</p>;
    
    if (mostRecent.BTC.cap > goldMarketCap) {
      message = <H1>YES</H1>
    } else {
      if (mostRecent.BTC.cap * 50 < goldMarketCap) {
        message = <div><H1>NO</H1><p style={{marginTop: 0, marginBottom: '30px'}}>And there is a long way to go</p></div>;
      } else {
        message = <div><H1>NO</H1><p style={{marginTop: 0, marginBottom: '30px'}}>But getting closer!</p></div>;
      }
    }
    
    return (
      <Container onClick={this.props.toggleOverlay}>
          <Box>
              <p style={{padding: "0 1em"}}>Is Bitcoin worth more than Gold yet?</p>
              {message}
              <ul style={{display: 'flex', listStyleType: 'none', margin: 0, padding: 0, alignItems: 'center', justifyContent: 'center'}}>
                  <li style={{paddingTop: '10px', width: '50%', borderTop: '1px solid #ddd', borderRight: '1px solid rgb(221, 221, 221)'}}>
                      <img src={BitcoinSmallLogo} style={{height: "1em"}} />  $ {commarize(mostRecent.BTC.cap)}
                      <p style={{fontSize: '0.7em', margin: 0}}>Market Cap</p>
                  </li>
                  <li style={{paddingTop: '10px', width: '50%', borderTop: '1px solid #ddd'}}>
                      <img src={GoldBar} style={{height: "1.1em"}} /> $ {commarize(goldMarketCap)}
                      <p style={{fontSize: '0.7em', margin: 0}}>Market Cap</p>
                  </li>
              </ul>
              <Reload />
          </Box>
      </Container>
    );

  }
}

export default Overlay;
