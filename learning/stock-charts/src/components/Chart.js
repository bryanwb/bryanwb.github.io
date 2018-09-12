import React from 'react';
import PropTypes from 'prop-types';
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import {Chart, ChartCanvas} from 'react-stockcharts/es';
import { XAxis, YAxis } from "react-stockcharts/es/lib/axes"
import { LineSeries } from 'react-stockcharts/es/lib/series';
import { discontinuousTimeScaleProvider } from "react-stockcharts/es/lib/scale";
import { last } from "react-stockcharts/es/lib/utils";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/es/lib/coordinates";
import { OHLCTooltip } from "react-stockcharts/es/lib/tooltip";


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

    return (
      <ChartCanvas ratio={1} width={this.props.width} height={this.props.height}
                   margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                   type={'svg'}
                   pointsPerPxThreshold={1}
                   seriesName="MSFT"
                   data={data}
                   xAccessor={xAccessor}
                   displayXAccessor={displayXAccessor}
                   xScale={xScale}
                   xExtents={xExtents}>

          <Chart id={1}
                 yExtents={d => [d.close]}>
              <XAxis axisAt="bottom" orient="bottom"/>
              <YAxis
                axisAt="right"
                orient="right"
                ticks={5}
              />
              <MouseCoordinateX
	      at="bottom"
	      orient="bottom"
	      displayFormat={timeFormat("%Y-%m-%d")} />
	      <MouseCoordinateY
	      at="right"
	      orient="right"
	      displayFormat={format(".2f")} />              
              <LineSeries
                yAccessor={d => d.close}
                stroke="#ff7f0e"
              />
              <OHLCTooltip forChart={1} origin={[-40, 0]} />
          </Chart>
          <CrossHairCursor />
      </ChartCanvas>
      

      
    );

  }
  
}

export default HotAirChart;
