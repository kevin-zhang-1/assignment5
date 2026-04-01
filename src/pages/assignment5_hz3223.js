import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container } from 'react-bootstrap';
import ScatterPlot from '../components/scatterPlot';
import BarChart from '../components/barChart';
import Tooltip from '../components/tooltips';

const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv';

// Custom hook to load CSV data
function useData(csvPath) {
    const [data, setData] = useState(null);

    useEffect(() => {
        d3.csv(csvPath).then(rawData => {
            const parsed = rawData.map(d => ({
                ...d,
                tripdurationS: +d.tripdurationS,
                tripdurationE: +d.tripdurationE
            }));
            setData(parsed);
        });
    }, [csvPath]);

    return data;
}

const Charts = () => {
    const [monthIndex, setMonthIndex] = useState(3); // April by default (0-based)
    const [selectedStation, setSelectedStation] = useState(null);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const dataAll = useData(csvUrl);
    if (!dataAll) return <pre>Loading...</pre>;

    const WIDTH = 600;
    const HEIGHT = 400;
    const MARGIN = { top: 20, right: 20, bottom: 70, left: 35 };
    const innerWidth = WIDTH - MARGIN.left - MARGIN.right;
    const innerHeightScatter = HEIGHT - MARGIN.top - MARGIN.bottom;
    const innerHeightBar = innerHeightScatter - 120;

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Filter data for the selected month
    const monthData = dataAll.filter(d => d.month === MONTHS[monthIndex]);

    // === Scatter plot scales ===
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice();

    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

    // === Bar chart data & scales ===
    const barData = Array.from(
        d3.rollups(
            monthData,
            v => d3.sum(v, d => +d.start),
            d => d.station
        ),
        ([station, start]) => ({ station, start })
    );

    const xScaleBar = d3.scaleBand()
        .domain(barData.map(d => d.station))
        .range([0, innerWidth])
        .padding(0.2);

    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(barData, d => d.start)])
        .range([innerHeightBar, 0])
        .nice();

    // Handlers
    const handleMonthChange = (e) => setMonthIndex(+e.target.value);

    const handleTooltip = (event, d) => {
        setTooltipData(d);
        setTooltipPos({ x: event.pageX, y: event.pageY });
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col lg={3} md={4}>
                    <input
                        type="range"
                        min="0"
                        max="11"
                        value={monthIndex}
                        onChange={handleMonthChange}
                        className="w-100"
                    />
                    <input
                        type="text"
                        readOnly
                        value={MONTHS[monthIndex]}
                        className="form-control mt-2 text-center"
                    />
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot
                            offsetX={MARGIN.left}
                            offsetY={MARGIN.top}
                            data={monthData}
                            xScale={xScaleScatter}
                            yScale={yScaleScatter}
                            height={innerHeightScatter}
                            width={innerWidth}
                            selectedStation={selectedStation}
                            setSelectedStation={setSelectedStation}
                            setTooltipX={pos => setTooltipPos(prev => ({ ...prev, x: pos }))}
                            setTooltipY={pos => setTooltipPos(prev => ({ ...prev, y: pos }))}
                            setTooltipData={setTooltipData}
                        />
                    </svg>
                </Col>

                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <BarChart
                            offsetX={MARGIN.left}
                            offsetY={MARGIN.top}
                            data={barData}
                            xScale={xScaleBar}
                            yScale={yScaleBar}
                            height={innerHeightBar}
                            width={innerWidth}
                            selectedStation={selectedStation}
                            setSelectedStation={setSelectedStation}
                        />
                    </svg>
                </Col>
            </Row>

            {tooltipData && (
                <Tooltip
                    x={tooltipPos.x}
                    y={tooltipPos.y}
                    d={tooltipData}
                />
            )}
        </Container>
    );
};

export default Charts;