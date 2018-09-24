import React from 'react';
import PropTypes from 'prop-types';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { AxisRight, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { extent, max } from 'd3-array';
import { localPoint } from '@vx/event';
import styled from 'react-emotion';
import CrosshairsWithTooltip from './CrosshairsWithTooltip';
import { Object } from 'core-js';
import debounce from 'lodash/debounce';

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
      showCrosshairs: false,
    };
    this.crosshairsLock = false;
  }

  componentWillMount = () => {
    this.unlockCrosshairs = debounce(() => this.crosshairsLock = false, 10);
  };
  
  handleMouseOver = (e) => {
    if (!this.state.isDragging) {
      let coords = localPoint(e.target.ownerSVGElement, e);
      this.crosshairsLock = true;
      this.setState((state) => ({
        isDragging: state.isDragging,
        datum: {data: null, coords: coords},
        showCrosshairs: true,
      }));
      // will trigger after a delay
      this.unlockCrosshairs();
    }
  };

  handleMouseOut = () => {
    if (!this.crosshairsLock) {
      this.setState((state) => ({
        isDragging: state.isDragging,
        datum: state.datum,
        showCrosshairs: false,
      }));
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
    
    const width = this.props.width;
    const height = this.props.height;
    const margin = this.props.margin;
    const dayCount = this.props.dayCount;
    const data = this.props.data;
    this.shift = this.props.shift;
    
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => new Date(d.date);
    const symbols = this.props.symbols;
    
    const maxYScale = (d) => Math.max(...symbols.map(s => d[s.name].close));
    
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, maxYScale)],
    });

    const xSpacing = xScale(data[1].date) - xScale(data[0].date);
    const shiftCb = this.props.shiftCb;
    const doDrag = this.handleDrag.bind(this, shiftCb, xSpacing);
    const highlightedLine = this.props.highlightedLine;

    const linePath = (symbol, data) => {
      const y = (d) => d[symbol.name].close;
      const strokeWidth = highlightedLine === symbol.name ? 6 : 2
      return (
        <React.Fragment key={symbol.name}>
            <LinePath
              key={symbol.name}
              data={data}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke={symbol.color}
              strokeWidth={strokeWidth}
            />
            <LinePath
              key={'hidden' + symbol.name}
              data={data}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke={symbol.color}
              strokeWidth={strokeWidth + 40}
              onMouseOver={() => this.handleMouseOver}
              onMouseOut={() => this.handleMouseOut}
              style={{pointerEvents: 'all', visibility: 'hidden'}}
            />
        </React.Fragment>
      );
    };

    return (
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
              {<CrosshairsWithTooltip
                 margin={margin}
                 width={width}
                 height={height}
                 show={this.state.showCrosshairs}
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
    

    /* import { timeFormat } from "d3-time-format";
     * import { format } from "d3-format";
     * import {Chart, ChartCanvas} from 'react-stockcharts/es';
     * import { XAxis, YAxis } from "react-stockcharts/es/lib/axes"
     * import { LineSeries } from 'react-stockcharts/es/lib/series';
     * import { discontinuousTimeScaleProvider } from "react-stockcharts/es/lib/scale";
     * import { last } from "react-stockcharts/es/lib/utils";
     * import {
     *   CrossHairCursor,
     *   MouseCoordinateX,
     *   MouseCoordinateY,
     * } from "react-stockcharts/es/lib/coordinates";
     * import { HoverTooltip } from "react-stockcharts/es/lib/tooltip";
     * 
     * 
     * const formatNum = (symbol, num) => {
     *   let numFormatted = '$ ' + num.toFixed().toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
     *   if (symbol.measure) {
     *     numFormatted += symbol.measure;
     *   }
     *   // this magic incantation adds commas in the thousands place
     *   return numFormatted
     * };
     * 
     * // remove the hours:minutes:seconds
     * const formatDate = (date) => {
     *   return date.toUTCString().split(/\ \d\d:\d\d:\d\d/)[0];
     * };
     * 
     * const tooltipContent = (symbols) => {
     *   return (d) => {
     *     const {currentItem, xAccessor} = d;
     *     const yValues = symbols.map(s => {
     *       let items = [
     *         {
     *           label: s.name + ' ',
     *           value: formatNum(s, currentItem[s.name].close),
     *           stroke: '#000000'
     *         },
     *       ];
     *       if (currentItem[s.name].cap) {
     *         items.push(
     *           {label: 'Market Cap',
     *            value: '$ ' + format('.0s')(currentItem[s.name].cap),
     *            stroke: '#000000'}
     *         );
     *       }
     *       return items;
     *     }).reduce((accum, arr) => accum.concat(arr), []);
     *     return {
     *       x: formatDate(xAccessor(currentItem)),
     *       y: yValues,
     *     };
     *   };
     * };
     * 
     * class HotAirChart extends React.Component {
     *   render() {
     *     const showMarketCap = this.props.showMarketCap;
     *     const xScaleProvider = discontinuousTimeScaleProvider
     *       .inputDateAccessor(d => d.date);
     *     const {
     *       data,
     *       xScale,
     *       xAccessor,
     *       displayXAccessor,
     *     } = xScaleProvider(this.props.data);
     * 
     *     const xExtents = [
     *       xAccessor(data[data.length - this.props.dayCount]),
     *       xAccessor(last(data)),
     *     ];
     * 
     *     const symbols = this.props.data.symbols;
     *     const calculateYExtentsPrice = (d) => {
     *       let extents = [];
     *       symbols.forEach(s => {
     *         let name = s.name;
     *          extents.push(d[name].close);
     *          d[name].high && extents.push(d[name].high);
     *          d[name].low && extents.push(d[name].low);
     *        });
     *       return extents;
     *     };
     * 
     *     const calculateYExtentsMarketCap = (d) => {
     *       let extents = [];
     *       symbols.forEach(s => {
     *         let name = s.name;
     *         d[name].cap && extents.push(d[name].cap);
     *       });
     *       return extents;
     *     };
     * 
     *     const margin = this.props.margin;
     *     
     *     return (
     *       <ChartCanvas ratio={1} width={this.props.width} height={this.props.height}
     *                    margin={margin}
     *                    type={'svg'}
     *                    pointsPerPxThreshold={1}
     *                    seriesName="GoldAndBTC"
     *                    data={data}
     *                    xAccessor={xAccessor}
     *                    displayXAccessor={displayXAccessor}
     *                    xScale={xScale}
     *                    xExtents={xExtents}>
     * 
     *           <Chart id={1}
     *                  yExtents={calculateYExtentsPrice}>
     *               <XAxis
     *                 axisAt="bottom"
     *                 orient="bottom"
     *                 innerTickSize={-1 * (this.props.height - margin.top - margin.bottom)}
     *                 tickStrokeDasharray='Solid'
     *                 tickStrokeOpacity={0.2}
     *                 tickStrokeWidth={0.5}
     *               />
     *               <YAxis
     *                 axisAt="right"
     *                 orient="right"
     *                 ticks={5}
     *                 innerTickSize={-1 * (this.props.width - margin.left - margin.right)}
     *                 tickStrokeDasharray='Solid'
     *                 tickStrokeOpacity={0.2}
     *                 tickStrokeWidth={0.5}
     *               />
     *               <MouseCoordinateX
     * 	        at="bottom"
     * 	        orient="bottom"
     * 	        displayFormat={timeFormat("%Y-%m-%d")} />
     * 	      <MouseCoordinateY
     * 	        at="right"
     * 	        orient="right"
     * 	        displayFormat={format(".2f")} />
     *               {
     *                 symbols.map(s => {
     *                   return <LineSeries
     *                            key={s.name}
     *                            yAccessor={d => d[s.name].close}
     *                            stroke={s.color}
     *                            strokeWidth={2}
     *                   />
     *                 })
     *               }
     *               <HoverTooltip 
     *                 tooltipContent={tooltipContent(symbols)}
     *                 fontSize={15}
     *               />
     *           </Chart>
     *           {showMarketCap && 
     *           <Chart id={2}
     *                  yExtents={calculateYExtentsMarketCap}>
     *               <YAxis
     *                 axisAt="left"
     *                 orient="left"
     *                 ticks={5}
     *                 tickFormat={format(".0s")}
     *                 innerTickSize={-1 * this.props.width}
     *                 tickStrokeDasharray='Solid'
     *                 tickStrokeOpacity={0.2}
     *                 tickStrokeWidth={0.5}
     *               />
     *           </Chart>}
     *           <CrossHairCursor />
     *       </ChartCanvas>
     *       
     * 
     *       
     *     );
     * 
     *   }
     *   
     * } */

    export default HotAirChart;
