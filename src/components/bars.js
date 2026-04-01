import React from "react";

const Bars = ({
    data,
    xScale,
    yScale,
    height,
    selectedStation,
    setSelectedStation
}) => {
    if (!data) return <g />;

    const getFillColor = (station) => (station === selectedStation ? "red" : "steelblue");

    return (
        <g className="bar-chart">
            {data.map((d, i) => {
                const barHeight = height - yScale(+d.start);

                return (
                    <rect
                        key={i}
                        x={xScale(d.station)}
                        y={yScale(+d.start)}
                        width={xScale.bandwidth()}
                        height={barHeight}
                        fill={getFillColor(d.station)}
                        opacity={selectedStation && d.station !== selectedStation ? 0.6 : 1} // subtle highlight
                        onMouseEnter={() => setSelectedStation(d.station)}
                        onMouseOut={() => setSelectedStation(null)}
                        style={{ cursor: "pointer" }}
                    />
                );
            })}
        </g>
    );
};

export default Bars;