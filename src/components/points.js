import React from "react";

const Points = ({
    data,
    xScale,
    yScale,
    selectedStation,
    setSelectedStation,
    setTooltipX,
    setTooltipY,
    setTooltipData
}) => {
    if (!data) return null;

    // Handle hover effect
    const handleMouseEnter = (event, d) => {
        setSelectedStation(d.station);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
        setTooltipData(d);
    };

    const handleMouseLeave = () => {
        setSelectedStation(null);
        setTooltipData(null);
    };

    return (
        <g className="scatter-points">

            {/* Optional highlight overlay for the selected station */}
            {selectedStation && (
                <rect
                    x={0}
                    y={0}
                    width={xScale.range()[1]}
                    height={yScale.range()[0]}
                    fill="#fff3b0"
                    opacity={0.15}
                    pointerEvents="none"
                />
            )}

            {/* Render scatter points */}
            {data.map((d, idx) => {
                const isSelected = d.station === selectedStation;
                return (
                    <circle
                        key={idx}
                        className={`scatter-point ${isSelected ? "selected" : ""}`}
                        cx={xScale(d.tripdurationS)}
                        cy={yScale(d.tripdurationE)}
                        r={isSelected ? 12 : 6}          // larger radius when selected
                        fill={isSelected ? "#e63946" : "#457b9d"} // different color palette
                        stroke={isSelected ? "#1d3557" : "none"}
                        strokeWidth={isSelected ? 1.5 : 0}
                        onMouseEnter={(event) => handleMouseEnter(event, d)}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                    />
                );
            })}

        </g>
    );
};

export default Points;