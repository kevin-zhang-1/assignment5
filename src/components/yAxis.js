import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function YAxis(props){
    const { yScale, height, axisLable } = props;
    const ref = useRef();

    if(yScale){

        useEffect(() => {
            if(typeof(yScale.domain()[0]) === "number"){
                // linear scale (scatter)
                d3.select(ref.current)
                  .call(d3.axisLeft(yScale));
            } else {
                // band scale (bar chart)
                d3.select(ref.current)
                  .call(d3.axisLeft(yScale));
            }
        }, [yScale]);

        return (
            <g>
                <g ref={ref} />
                <text
                    transform={`rotate(-90)`}
                    x={-height / 2}
                    y={15}
                    textAnchor="top"
                    style={{ fontSize: "15px" }}
                >
                    {axisLable}
                </text>
            </g>
        );

    } else {
        return <g></g>
    }
}

export default YAxis