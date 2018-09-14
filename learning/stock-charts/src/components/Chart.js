import React from 'react';
import PropTypes from 'prop-types';
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import {Chart, ChartCanvas} from 'react-stockcharts/es';
import { XAxis, YAxis } from "react-stockcharts/es/lib/axes"
import { LineSeries } from 'react-stockcharts/es/lib/series';
import { discontinuousTimeScaleProvider } from "react-stockcharts/es/lib/scale";
import { Label } from "react-stockcharts/lib/annotation";
import { last } from "react-stockcharts/es/lib/utils";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/es/lib/coordinates";
import { HoverTooltip } from "react-stockcharts/es/lib/tooltip";


const formatNum = (symbol, num) => {
  let numFormatted = '$ ' + num.toFixed().toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
  if (symbol.measure) {
    numFormatted += symbol.measure;
  }
  // this magic incantation adds commas in the thousands place
  return numFormatted
};

// remove the hours:minutes:seconds
const formatDate = (date) => {
  return date.toUTCString().split(/\ \d\d:\d\d:\d\d/)[0];
};

const tooltipContent = (symbols) => {
  return (d) => {
    const {currentItem, xAccessor} = d;
    const yValues = symbols.map(s => {
      return {label: s.name + '\n', value: formatNum(s, currentItem[s.name].close), stroke: '#000000'};
    });
    return {
      x: formatDate(xAccessor(currentItem)),
      y: yValues,
    };
  };
};

class HotAirChart extends React.Component {
  render() {
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(this.props.data);

    const dayCount = data.length > this.props.dayCount ? this.props.dayCount: data.length;
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - dayCount])
    ];

    const symbols = this.props.data.symbols;
    const calculateYExtents = (d) => {
      let extents = [];
      symbols.forEach(s => {
        let name = s.name;
         extents.push(d[name].close);
         d[name].high && extents.push(d[name].high);
         d[name].low && extents.push(d[name].low);
       });
      return extents;
    };
    const margin = { left: 70, right: 70, top: 20, bottom: 30};
    
    return (
      <ChartCanvas ratio={1} width={this.props.width} height={this.props.height}
                   margin={margin}
                   type={'svg'}
                   pointsPerPxThreshold={1}
                   seriesName="GoldAndBTC"
                   data={data}
                   xAccessor={xAccessor}
                   displayXAccessor={displayXAccessor}
                   xScale={xScale}
                   xExtents={xExtents}>

          <Chart id={1}
                 yExtents={calculateYExtents}>
              <XAxis
                axisAt="bottom"
                orient="bottom"
                innerTickSize={-1 * (this.props.height - margin.top - margin.bottom)}
                tickStrokeDasharray='Solid'
                tickStrokeOpacity={0.2}
                tickStrokeWidth={0.5}
              />

              <YAxis
                axisAt="right"
                orient="right"
                ticks={5}
                innerTickSize={-1 * (this.props.width - margin.left - margin.right)}
                tickStrokeDasharray='Solid'
                tickStrokeOpacity={0.2}
                tickStrokeWidth={0.5}
              />
              <MouseCoordinateX
	        at="bottom"
	        orient="bottom"
	        displayFormat={timeFormat("%Y-%m-%d")} />
	      <MouseCoordinateY
	        at="right"
	        orient="right"
	        displayFormat={format(".2f")} />
              {
                symbols.map(s => {
                  return <LineSeries
                           key={s.name}
                           yAccessor={d => d[s.name].close}
                           stroke={s.color}
                           strokeWidth={2}
                  />
                })
              }
              <HoverTooltip 
                tooltipContent={tooltipContent(symbols)}
                fontSize={15}
              />
          </Chart>
          <CrossHairCursor />
      </ChartCanvas>
      

      
    );

  }
  
}

export default HotAirChart;
