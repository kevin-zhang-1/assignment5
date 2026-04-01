import React from "react";
import Points from "./points";
import XAxis from "./xAxis";
import YAxis from "./yAxis";

const ScatterPlot = ({
    offsetX,
    offsetY,
    data,
    xScale,
    yScale,
    height,
    width,
    selectedStation,
    setSelectedStation,
    setTooltipX,
    setTooltipY,
    setTooltipData
}) => {
    return (
        <g className="scatter-plot" transform={`translate(${offsetX}, ${offsetY})`}>
            {/* Scatter points */}
            <Points
                data={data}
                xScale={xScale}
                yScale={yScale}
                height={height}
                width={width}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
                setTooltipX={setTooltipX}
                setTooltipY={setTooltipY}
                setTooltipData={setTooltipData}
            />

            {/* Axes */}
            <YAxis
                yScale={yScale}
                height={height}
                axisLabel="Trip Duration End (s)"
            />
            <XAxis
                xScale={xScale}
                height={height}
                width={width}
                axisLabel="Trip Duration Start (s)"
            />
        </g>
    );
};

export default ScatterPlot;