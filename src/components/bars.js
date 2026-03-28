

function Bars(props) {
    const {data, xScale, yScale, height} = props;

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
            {/* {task:
                    1. remove this comments and put your code here
                    2. pay attention to the height of the bars, it should be height-yScale(d.start)} */}
            </g>
    } else {
        return <g></g>
    }
}

export default Bars