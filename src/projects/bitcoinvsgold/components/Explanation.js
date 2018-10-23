import React from 'react';
import styled from 'react-emotion';

const Table = styled('ul')`
  list-style-type: none;

  li {
    width: 100%;
  }
`;


class Arrow extends React.Component {
  constructor() {
    this.state = {
      transition: 'transform 0.2s ease 0s', width: '0.85rem',
      height: '0.85rem', padding: '4px', transform: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if(this.state.transform) {
      this.setState(Object.assign(this.state, {transform: 'rotate(90deg)'}));
    } else {
      this.setState(Object.assign(this.state, {transform: null}));
    }
  }
  
  render() {
    return <div></div>;
    
    let style = this.state;
    return (
      <svg viewBox="0 0 14 14" onclick={this.toggle}
           fill="none" stroke="currentColor" stroke-width="1.5"
           stroke-linecap="round" stroke-linejoin="round"
           width="16" height="16"
           style={style}>
          <path d="M5 12l5-5-5-5"></path>
      </svg>
    );
  }
}
    

const Explanation = (props) => {
  return (
    <Table>
        <li><Arrow />Why?</li>
    </Table>
  );
};

export default Explanation;
