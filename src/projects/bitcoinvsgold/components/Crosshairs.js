import React from 'react';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';

class Crosshairs extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {datum: props.datum};
  }

  render() {
    const {
      margin,
      width,
      height,
      coords,
      show,
    } = this.props;
    
    const showCrosshairs = show && coords;

    return (
      showCrosshairs &&
      <React.Fragment>
          <Line
            key="crosshairs-horizontal"
            from={new Point({x: 0, y: coords.y - margin.top})}
            to={new Point({x: width - margin.left - margin.right,
                           y: coords.y - margin.top})}
            strokeDasharray={[4]}
          />              
          <Line
            key="crosshairs-vertical"
            from={new Point({x: coords.x - margin.left, y: 0})}
            to={new Point({x: coords.x - margin.left,
                           y: height - margin.top - margin.bottom})}
            strokeDasharray={[4]}
          />
      </React.Fragment>
    );


  }
  
}

export default Crosshairs;
