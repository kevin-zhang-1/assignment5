import React from "react";
import Bars from "./bars";
import XAxis from "./xAxis";
import YAxis from "./yAxis";

const BarChart = ({
    offsetX = 0,
    offsetY = 0,
    data,
    xScale,
    yScale,
    height,
    width,
    selectedStation,
    setSelectedStation
}) => {
    return (
        <g className="bar-chart-container" transform={`translate(${offsetX}, ${offsetY})`}>

            {/* Render all the bars */}
            <Bars
                data={data}
                xScale={xScale}
                yScale={yScale}
                height={height}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
            />

            {/* Y-axis with label */}
            <YAxis
                yScale={yScale}
                height={height}
                axisLabel="Number of Trips"
            />

            {/* X-axis with label */}
            <XAxis
                xScale={xScale}
                height={height}
                width={width}
                axisLabel="Station"
            />

        </g>
    );
};

export default BarChart;