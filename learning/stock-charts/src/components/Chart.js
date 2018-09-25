import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { AxisRight, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { extent, max, scan } from 'd3-array';
import { localPoint } from '@vx/event';
import styled from 'react-emotion';
import Crosshairs from './Crosshairs';
import Tooltip from './Tooltip';
import { Object } from 'core-js';
import debounce from 'lodash/debounce';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';

const Rect = styled('rect')`
  cursor: crosshair;
  /* pointer-events: all; */
  visibility: hidden;
  :active {
    cursor: grab;
  }
`;


class HotAirChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      datum: null,
      crosshairsCoords: null,
      showCrosshairs: false,
    };
    this.crosshairsLock = false;
  }

  componentWillMount = () => {
    this.unlockCrosshairs = debounce(() => this.crosshairsLock = false, 10);
  };
  
  handleMouseOver = (xToDataAccessor, e) => {
    if (!this.state.isDragging) {
      // cancel an early unlock
      this.unlockCrosshairs.cancel();
      
      let coords = localPoint(e.target.ownerSVGElement, e);

      const datum = xToDataAccessor(coords.x);

      this.crosshairsLock = true;
      this.setState((state) => ({
        isDragging: state.isDragging,
        datum: datum,
        crosshairsCoords: coords,
        showCrosshairs: true,
      }));

      this.props.showTooltip({
        tooltipLeft: coords.x,
        tooltipTop: coords.y,
        tooltipData: datum,
      });
      
      // unlock crosshairs after a delay
      this.unlockCrosshairs();
    }
  };

  handleMouseOut = (hideTooltip) => {
    if (!this.crosshairsLock) {
      
      this.setState((state) => ({
        isDragging: state.isDragging,
        datum: state.datum,
        showCrosshairs: false,
      }));
      hideTooltip();
    }
  };
  
  handleDragStart = (e) => {
    e.preventDefault();
    this.setState({isDragging: true});
  };
  
  handleDrag = (shiftCb, spacing, e) => {
    if (this.state.isDragging) {
      e.preventDefault();
      // we want to go the opposite way of the actual movement
      const sign = -Math.sign(e.movementX);
      const extentsShifted = Math.ceil(Math.abs(e.movementX) / Math.floor(spacing));
      extentsShifted > 0 && shiftCb(sign * extentsShifted);
    }
  };
  
  handleDragEnd = (e) => {
    e.preventDefault();
    if (this.state.isDragging) {
      this.setState({isDragging: false});
    }
  };


  render() {

    const {
      width,
      height,
      margin,
      data,
      shift,
      symbols,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      tooltipOpen,
      hideTooltip,
    } = this.props;
    
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => new Date(d.date);
    
    const maxYScale = (d) => Math.max(...symbols.map(s => d[s.name].close));
    
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, maxYScale)],
    });

    // maps a value on the X axis to the corresponding datum
    const xToDataAccessor = (xVal) => {
      const date = xScale.invert(xVal - margin.left);
      date.setUTCHours(0);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);
      const index = data.findIndex((d) => d.date.valueOf() >= date.valueOf());
      if (index === -1) {
        console.log(`Could not find matching data point for ${date}`);
        return null;
      } else {
        return data[index];
      }
    };
    
    const xSpacing = xScale(data[1].date) - xScale(data[0].date);
    const shiftCb = this.props.shiftCb;
    const doDrag = this.handleDrag.bind(this, shiftCb, xSpacing);
    const highlightedLine = this.props.highlightedLine;

    const linePath = (symbol, data) => {
      const y = (d) => d[symbol.name].close;
      const strokeWidth = highlightedLine === symbol.name ? 6 : 2
      return (
        <LinePath
          key={symbol.name}
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={symbol.color}
          strokeWidth={strokeWidth}
          onMouseOver={() => e => this.handleMouseOver(xToDataAccessor, e)}
          onMouseOut={() => () => this.handleMouseOut(hideTooltip)}
          style={{pointerEvents: 'all'}}
        />
      );
    };

    return (
      <React.Fragment>
          <svg width={width} height={height}>
              <Group top={margin.top} left={margin.left} style={{cursor: 'crosshair'}}>
                  <Rect
                    width={width}
                    height={height}
                    onMouseMove={(e) => doDrag(e)}
                    onMouseUp={this.handleDragEnd}
                    onMouseDown={this.handleDragStart}
                    onWheel={this.props.onScroll}>
                  </Rect>
                  {symbols.map(s => linePath(s, data))}
                  {<Crosshairs
                     margin={margin}
                     width={width}
                     height={height}
                     show={this.state.showCrosshairs}
                     coords={this.state.crosshairsCoords}
                     datum={this.state.datum}
                  />}
                  <Grid
                    xScale={xScale}
                    yScale={yScale}
                    width={width - margin.left - margin.right}
                    height={height - margin.top - margin.bottom}
                  />
                  <AxisBottom
                    scale={xScale}
                    top={yMax}
                    stroke='#1b1a1e'
                    tickTextFill="#1b1a1e"
                  />
                  <AxisRight
                    scale={yScale}
                    top={0}
                    left={width - margin.left - margin.right}
                    label='Close Price ($)'
                    labelOffset={50}
                    labelProps={{fontSize: 15}}
                    stroke="#1b1a1e"
                    tickTextFill="#1b1a1e"
                  />
              </Group>
          </svg>
          {tooltipOpen && 
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
              <Tooltip symbols={symbols} datum={tooltipData} />
          </TooltipWithBounds>
          }
      </React.Fragment>
    );
  }
}

HotAirChart.propTypes = {
  data: PropTypes.array.isRequired,
  symbols: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  shiftCb: PropTypes.func,
  showMarketCap: PropTypes.bool,
  margin: PropTypes.object,
  highlightedLine: PropTypes.string,
  onScroll: PropTypes.func,
};

const HotAirChartWithTooltip = withTooltip(HotAirChart);

export default HotAirChartWithTooltip;
