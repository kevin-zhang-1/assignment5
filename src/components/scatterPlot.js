
function ScatterPlot(props){
    const { offsetX, offsetY, data, xScale, yScale, height, width } = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return <g>
           {/* <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width} />
           <YAxis yScale={yScale} height={height} axisLable={"Trip duration end in"}/>
           <XAxis xScale={xScale} height={height} width={width} axisLable={"Trip duration start from"}/> */}
        </g>
}

export default ScatterPlot