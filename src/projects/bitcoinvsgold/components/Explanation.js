import React from 'react';
import styled, {css} from 'react-emotion';

const Table = styled('ul')`
  list-style-type: none;
  margin-top: 5vh;
  margin-left: 5vw;
`;

let liOpenStyle = css`
   div {
     width: 90%;
     display: inline-block;
     padding-left: 0.5em;
     border-left: black solid 1px;
   }
   
   div > p {
     display: inline;
   }

`;

let liClosedStyle = css`
     max-height: 1.4em;
     overflow: hidden;
     div {
       width: 90%;
       display: inline-block;
       color: rgba(0, 0, 0, 0.2);
     }

     div > p {
       display: inline;
     }

     div > span {
       color: rgba(0, 0, 0, 1);
     }

     div a {
       opacity: 0.2;
     }
     :hover {
        color: rgba(0, 0, 0, 1);
        background-color: lightgrey;
     }
`;

let Ellipsis = styled('span')`
      vertical-align: top;
      display: ${props => props.hide ? 'none' : 'inline'};
      color: rgba(0, 0, 0, 0.4);
`;


class Li extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expand: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({expand: !this.state.expand});
  }
  
  render() {
    
    return (
      <li className={this.state.expand ? liOpenStyle : liClosedStyle}>
          <Arrow toggle={this.toggle} expand={this.state.expand} />
          <div>
              <span><strong>{this.props.title}</strong></span>&nbsp;
              <p>{this.props.children}</p>
          </div>
          <Ellipsis hide={this.state.expand}> . . . </Ellipsis>
      </li>
    );
  }

}


class Arrow extends React.Component {
  
  render() {
    const {expand, toggle} = this.props;
    let arrowStyle = css`
       cursor: pointer;
       vertical-align: top;
       transition: transform 0.2s ease 0s;
       transform: ${expand ? 'rotate(90deg)' : 'rotate(0deg)'};
       width: 1.4em;
       height: 1.4em;
       padding: 4px;
    `;

    return (
      <svg viewBox="0 0 14 14" onClick={toggle}
           fill="none" stroke="currentColor" strokeWidth="1.5"
           strokeLinecap="round" strokeLinejoin="round"
           width="20" height="20"
           className={arrowStyle}>
          <path d="M5 12l5-5-5-5"></path>
      </svg>
    );
  }
}
    

const Explanation = (props) => {
  return (
    <Table>
        <Li title="Why?" >
            Some, like <a href="https://twitter.com/saifedean">Saifedean Ammous</a>, believe that Bitcoin will in time replace the U.S. dollar as the world's reserve currency. This chart aims to track Bitcoin's ascent by comparing Bitcoin's current price and total market capitalization with the asset that was the global standard prior to the dollar. Please note that this graph shows the cost for a kilogram of Gold, not the more traditional measure the <a href="https://www.investopedia.com/terms/t/troyounce.asp">troy ounce</a> because it makes for a better visual comparison. Comparing the price of kilo of gold to a single Bitcoin makes for a nice chart but a more accurate comparison is by market capitalization. I may later change this graph to reflect that later. This chart is updated daily with the expectation that at some point in the future, Bitcoin will overtake gold.<br /><br />

            To calculate the total market capitalization of gold I multiplied the total amount of gold in the world that has been mined by the price per kilogram. I estimate the total amount of gold in the world (above ground) to be 202,172 metric tonnes. This is not a terribly scientific number and I would love to hear from others what the precise figure is.

            This graph covers the first date for which I could find Bitcoin price history (July 17, 2010) up until now.
        </Li>
        <Li title="How?">
            I created this chart using the amazing <a href="https://github.com/hshoff/vx">VX</a> D3 library along with <a href="https://reactjs.org">React</a>, <a href="https://emotion.sh/">Emotion</a>, and of course Emacs. I use Google Cloud Functions to update the ticker data nightly. The biggest pain point of this entire process was finding and normalizing the historical price data for gold and Bitcoin.<br /><br />
    This is my first non-toy React application and I would love your feedback! The source for this chart can be found in the <a href="https://github.com/bryanwb/bryanwb.github.io/tree/develop/src/projects/bitcoinvsgold">Hot Air Github repository</a>. You can contact me via Twitter <a href="https://twitter.com/bryanwb">@bryanwb</a> or simply e-mail me at <a href="mailto:bryan.berry@gmail.com">bryan.berry@gmail.com</a> .
        </Li>
    </Table>
  );
};

export default Explanation;
