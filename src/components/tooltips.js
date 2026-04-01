import React from "react";

const Tooltip = ({ d, x, y }) => {
    if (!d) return null;

    const tooltipStyle = {
        position: "absolute",
        left: x + 12,
        top: y - 10,
        maxWidth: "180px",
        padding: "8px 12px",
        backgroundColor: "#f0f8ff",
        color: "#333",
        border: "1px solid #8ac6d1",
        borderRadius: "6px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
        fontFamily: "Arial, sans-serif",
        fontSize: "13px",
        pointerEvents: "none",
        lineHeight: "1.4",
        zIndex: 10
    };

    return (
        <div style={tooltipStyle}>
            <div style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}>
                {d.station}
            </div>
            <div style={{ fontStyle: "italic", marginBottom: "4px" }}>Trip Durations</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Start:</span>
                <span>{d.tripdurationS}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>End:</span>
                <span>{d.tripdurationE}</span>
            </div>
        </div>
    );
};

export default Tooltip;