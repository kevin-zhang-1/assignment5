import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const XAxis = ({ xScale, height, width, axisLabel }) => {
    const axisRef = useRef();

    useEffect(() => {
        if (!xScale) return;

        let axis;
        if (typeof xScale.domain()[0] === "number") {
            // Linear scale (scatter plot)
            axis = d3.axisBottom(xScale).ticks(6).tickSizeOuter(0);
        } else {
            // Band scale (bar chart)
            axis = d3.axisBottom(xScale);
        }

        d3.select(axisRef.current)
            .call(axis)
            .selectAll("text")
            .attr("transform", typeof xScale.domain()[0] === "string" ? "rotate(-45)" : "rotate(0)")
            .style("text-anchor", typeof xScale.domain()[0] === "string" ? "end" : "middle")
            .attr("dx", typeof xScale.domain()[0] === "string" ? "-0.6em" : "0")
            .attr("dy", typeof xScale.domain()[0] === "string" ? "0.25em" : "0");
    }, [xScale]);

    return (
        <g className="x-axis">
            <g ref={axisRef} transform={`translate(0, ${height})`} />

            {axisLabel && (
                <text
                    x={width / 2}
                    y={height + 35} // space below the axis
                    textAnchor="middle"
                    fontSize={14}
                    fontWeight="bold"
                    fill="#333"
                >
                    {axisLabel}
                </text>
            )}
        </g>
    );
};

export default XAxis;