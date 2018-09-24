import React from 'react';
import { Line } from '@vx/shape';
import { Point } from '@vx/point';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';

class CrosshairsWithTooltip extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {datum: props.datum};
  }

  /* componentWillMount = () => {
   *   this.handleChange = debounce(() => {
   *     
   *   });
   * }; */
  
  render() {
    const {
      margin,
      width,
      height,
      datum,
      symbols,
    } = this.props;

    return (
      this.props.show && this.props.datum &&
      <React.Fragment>
          <Line
            key="crosshairs-horizontal"
            from={new Point({x: 0, y: datum.coords.y - margin.top})}
            to={new Point({x: width - margin.left - margin.right,
                           y: datum.coords.y - margin.top})}
            strokeDasharray={[4]}
          />              
          <Line
            key="crosshairs-vertical"
            from={new Point({x: datum.coords.x - margin.left, y: 0})}
            to={new Point({x: datum.coords.x - margin.left,
                           y: height - margin.top - margin.bottom})}
            strokeDasharray={[4]}
          />
      </React.Fragment>
    );


  }
  
}

export default CrosshairsWithTooltip;
